export function authenticate(username) {
  return (dispatch) => {
    dispatch({
      type: 'LOGGING_IN',
    });

    dispatch({
      type: 'LOGGED_IN',
    });
  };
}

export function joinGame() {
  return (dispatch) => {
    dispatch({
      type: 'JOINING_GAME',
    });
    
    dispatch({
      type: 'JOINED_GAME',
    });
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