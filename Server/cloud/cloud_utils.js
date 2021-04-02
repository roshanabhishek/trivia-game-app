import Game from '../services/Game';
import GameLog from '../services/GameLog';
import User from '../services/User';
import UserLog from '../services/UserLog';
import GameData from '../services/GameData';

const joinOrCreateGame = async (db, params) => {
  const createGame = async (username) => {
    const gameRes = await Game.create(db);
    const gameLog = GameLog.create(db, { username, gameId: gameRes.gameId });
    return Promise.resolve(gameLog);
  }

  const { username } = params;
  const game = await Game.findActiveGame(db);

  if (!game) {
    return createGame(username);
  }
  const gameId = game.gameId;
  const gameLogSize = await GameLog.getGamePlayerSize(db, gameId);

  if (gameLogSize < 10) {
    const gameLog = GameLog.create(db, { username, gameId });
    return Promise.resolve(gameLog);
  }

  return createGame(username);
}

const registerNewUser = (db, params) => {
  const { username } = params;

  return User.findByUsername(db, username)
    .then(user => user || User.create(db, params));
}

const fetchWaitingListPlayers = (db, params) => {
  const { gameId } = params;

  return GameLog.getGamePlayerList(db, gameId);

}

const fetchQuestion = async (db, params) => {
  const { index } = params;
  const data = await GameData.getData(db, index);

  return {
    index: data.index,
    question: data.question,
    options: data.options,
    totalQuestion: 15,
  }
}

const updateAnswer = (db, params) => {
  return UserLog.create(db, params);
}

const fetchPlayerResult = async (db, params) => {
  const { gameId, username } = params;

  const data = await UserLog.getUserLogs(db, username, gameId);
  const gameDataList = await GameData.getAllGameData(db);
  return data.map(each => {
    const foundData = _.find(gameDataList, gameData => gameData.index === each.index);
    const expectedAnswer = foundData.answer;
    const actualAnswer = foundData.options[each.index - 1];
    return {
      question: foundData.question,
      expectedAnswer,
      actualAnswer,
      score: expectedAnswer === actualAnswer ? 10 : 0
    };
  });
}

const fetchLeaderboard = async (db, params) => {
  const { gameId } = params;

  const data = await UserLog.getAllUsersLogs(db, gameId);
  const gameDataList = await GameData.getAllGameData(db);
  const groupGameDataByIndex = _.groupBy(gameDataList, 'index');
  const groupByUsers = _.groupBy(data, 'username');
  const result = _.map(groupByUsers, (username, list) => {
    const correctAnswer = _.sumBy(list, each => each.answer === groupGameDataByIndex[each.index].answer);
    const unAnswered = _.sumBy(list, each => each.answer === '');
    const incorrectAnswer = 15 - correctAnswer - unAnswered;
    const totalTimeTaken = _.sumBy(list, 'timeTaken');
    return {
      username,
      correctAnswer,
      unAnswered,
      incorrectAnswer,
      score: correctAnswer * 10,
      totalTimeTaken,
    }
  });
  return result;
}

module.exports = {
  joinOrCreateGame,
  registerNewUser,
  fetchWaitingListPlayers,
  fetchQuestion,
  updateAnswer,
  fetchPlayerResult,
  fetchLeaderboard,
};