import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE ,REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE} from "./ActionTypes";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.email === email && userData.password === password) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: userData,
          });
          return; 
        }
      }else{
        dispatch({
          type: LOGIN_FAILURE,
          payload: "Invalid email or password",
        });
      }     
    } catch (error) {
      console.error("Login failed:", error.message);
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
};


export const signup = (formData) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const response = { data: formData }; 

      localStorage.setItem("userData", JSON.stringify(response.data));

      dispatch({
        type: REGISTER_SUCCESS,
      });
    } catch (error) {
      console.error("Error while signing up the user:", error);
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.message,
      });
    }
  };
};
