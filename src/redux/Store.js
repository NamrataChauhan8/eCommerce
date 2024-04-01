import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducer/Reducer'; 

const rootReducer = combineReducers({
  loginSignup: loginReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;