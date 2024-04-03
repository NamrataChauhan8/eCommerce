import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginSignupReducer from './reducer/Reducer'; 

const rootReducer = combineReducers({
  loginSignup: loginSignupReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;