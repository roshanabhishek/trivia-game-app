
import { assign } from 'lodash';

const getInitialAuthState = function () {
  return {
    loggingIn: false,
    authenticated: false,
    loggingOut: false,
  };
};

export function authReducer(state = getInitialAuthState, action) {
  switch (action.type) {
    case 'LOGGING_IN':
      return assign({}, state, { loggingIn: true });
    case 'LOGGED_IN':
      return assign({}, state, {
        loggingIn: false,
        authenticated: true,
      });
    default:
      return state;
  }
}

const getInitialGameState = function () {
  return {
    gameState: 'not_started',
  };
};

export function gameReducer(state = getInitialGameState, action) {
  switch (action.type) {
    case 'JOINED_GAME':
      return assign({}, state, {
        gameState: 'waiting',
      });
    case 'STARTED_GAME':
      return assign({}, state, {
        gameState: 'started',
      });
    case 'FINISHED_GAME':
      return assign({}, state, {
        gameState: 'complete',
      });
    default:
      return state;
  }
}

