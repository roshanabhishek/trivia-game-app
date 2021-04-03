
import { assign } from 'lodash';

const getInitialAuthState = function () {
  return {
    loggingIn: false,
    authenticated: false,
    loggingOut: false,
    username: '',
  };
};

export function authReducer(state = getInitialAuthState(), action) {
  switch (action.type) {
    case 'LOGGING_IN':
      return assign({}, state, { loggingIn: true });
    case 'LOGGED_IN':
      return assign({}, state, {
        loggingIn: false,
        authenticated: true,
        username: action.params.username,
      });
    case 'clear':
      return { ...getInitialAuthState() };
    default:
      return state;
  }
}

const getInitialGameState = function () {
  return {
    gameState: 'not_started',
    players: [],
    questionData: {},
    playersResult: [],
    leaderboard: [],
    index: 0,
    gameStarted: 0,
  };
};

export function gameReducer(state = getInitialGameState(), action) {
  switch (action.type) {
    case 'JOINED_GAME':
      return assign({}, state, {
        gameState: 'waiting',
        gameId: action.params.gameId,
        gameStarted: action.params.gameStarted,
      });
    case 'LEFT_GAME':
      return assign({}, state, {
        gameState: 'not_started',
        gameId: '',
      });
    case 'FETCHED_WAITING_LIST_PLAYERS':
      return assign({}, state, {
        players: action.params.players,
      });
    case 'STARTED_GAME':
      return assign({}, state, {
        gameState: 'started',
      });
    case 'FETCHED_QUESTION':
      return assign({}, state, {
        questionData: action.params.questionData,
        index: action.params.index,
      });
    case 'UPDATED_ANSWER':
      return assign({}, state, {
      });
    case 'FETCHED_PLAYER_RESULT':
      return assign({}, state, {
        playersResult: action.params.playersResult,
      });
    case 'FETCHED_LEADERBOARD':
      return assign({}, state, {
        leaderboard: action.params.leaderboard,
      });
    case 'FINISHED_GAME':
      return assign({}, state, {
        gameState: 'complete',
      });
    case 'clear':
      return { ...getInitialGameState() };
    default:
      return state;
  }
}

