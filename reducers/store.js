import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  Auth: authReducer,
});

const store = createStore(rootReducer);

export default store;