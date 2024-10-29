import { combineReducers } from 'redux';
import { workerReducer } from './workerReducer';

const rootReducer = combineReducers({
  workers: workerReducer,
});

export default rootReducer;
