import { postData } from '../network/restApi';

export function authenticate(username) {
  return (dispatch) => {
    dispatch({
      type: 'LOGGING_IN',
    });

    return postData('register', { username })
      .then(() => {
        console.log('username', username);
        dispatch({
          type: 'LOGGED_IN',
          params: {
            username,
          },
        });
      })
  };
}

export function joinGame(username) {
  return (dispatch) => {
    dispatch({
      type: 'JOINING_GAME',
    });

    return postData('joinGame', { username })
      .then((data) => {
        dispatch({
          type: 'JOINED_GAME',
          params: {
            gameId: data.gameId,
            gameStarted: '',
          },
        });
      })
  };
}

export function leaveGame() {
  return (dispatch) => {
    dispatch({
      type: 'LEFT_GAME',
    });
  };
}

export function fetchWaitingListPlayers(gameId) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_WAITING_LIST_PLAYERS',
    });
    return postData('fetchWaitingListPlayers', { gameId })
      .then((players) => {
        dispatch({
          type: 'FETCHED_WAITING_LIST_PLAYERS',
          params: {
            players,
          },
        });
      })
  };
}

export function startGame() {
  return (dispatch) => {
    dispatch({
      type: 'STARTING_GAME',
    });

    dispatch({
      type: 'STARTED_GAME',
    });
  };
}

export function fetchQuestion(index) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_QUESTION',
    });
    return postData('fetchQuestion', { index })
      .then((questionData) => {
        dispatch({
          type: 'FETCHED_QUESTION',
          params: {
            questionData,
            index,
          },
        });
      })
  };
}

export function updateAnswer(params) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATING_ANSWER',
    });
    return postData('updateAnswer', params)
      .then(() => {
        dispatch({
          type: 'UPDATED_ANSWER',
        });
      })
  };
}

export function fetchPlayerResult(params) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_PLAYER_RESULT',
    });
    return postData('fetchPlayerResult', params)
      .then((playersResult) => {
        dispatch({
          type: 'FETCHED_PLAYER_RESULT',
          params: {
            playersResult,
          }
        });
      })
  };
}

export function fetchLeaderboard(gameId) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_LEADERBOARD',
    });
    return postData('fetchLeaderboard', { gameId })
      .then((leaderboard) => {
        dispatch({
          type: 'FETCHED_LEADERBOARD',
          params: {
            leaderboard,
          }
        });
      })
  };
}

export function finshGame() {
  return (dispatch) => {
    dispatch({
      type: 'FINISHING_GAME',
    });

    dispatch({
      type: 'FINISHED_GAME',
    });
  };
}

export function signOut() {
  return (dispatch) => {
    dispatch({
      type: 'clear',
    });
  };
}