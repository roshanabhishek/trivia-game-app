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

const fetchPlayerResult = (db, params) => {
  const { gameId, username } = params;

  return UserLog.getUserLogs(db, username, gameId);
}

const fetchLeaderboard = (db, params) => {
  const { gameId } = params;

  return UserLog.getAllUsersLogs(db, gameId);

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