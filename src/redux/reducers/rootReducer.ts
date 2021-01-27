import { combineReducers } from 'redux';
import { boardsReducer } from './boardsReducer/boardsReducer';

export const rootReducer = combineReducers({
  boards: boardsReducer,
});
