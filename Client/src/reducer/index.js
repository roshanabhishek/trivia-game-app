
import { combineReducers } from 'redux';

import {
    authReducer,
    gameReducer,
} from './reducer';

export default combineReducers({
    auth: authReducer,
    game: gameReducer,
});
