import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
  } from "../action/ActionTypes.js";
  
  const initialState = {
    loading: false,
    user: null,
    error: '',
  };
  
  const loginSignupReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
        return {
          ...state,
          loading: true,
          error: '',
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: '',
        };
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: '',
        };
      default:
        return state;
    }
  };
  
  export default loginSignupReducer;