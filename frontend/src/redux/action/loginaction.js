
import axios from "axios";
import {
  USER_LOGIN, USER_LOGOUT, RESTAURANT_LOGIN, RESTAURANT_LOGOUT
} from "./type";


export const userLogin = loginData => (dispatch) => {
  // axios.defaults.withCredentials = true;
  console.log("From Login Action", loginData);
  axios.post("/userlogin", loginData,
    {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(loginResponse => dispatch({
      type: USER_LOGIN,
      payload: loginResponse
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        alert("Invalid Crendentials! Please try again");
        return dispatch({
          type: USER_LOGIN,
          payload: error.response.data
        });
      }
    });
};

export const userLogout = () => dispatch => dispatch({ type: USER_LOGOUT });


export const restLogin = loginData => (dispatch) => {
  // axios.defaults.withCredentials = true;
  axios.post("/restaurantlogin", loginData,
    {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(loginResponse => dispatch({
      type: RESTAURANT_LOGIN,
      payload: loginResponse
    }))
    .catch((error) => {
      if (error.response && error.response.data) {
        alert("Invalid Crendentials! Please try again");
        return dispatch({
          type: RESTAURANT_LOGIN,
          payload: error.response.data
        });
      }
    });
};

export const restLogout = () => dispatch => dispatch({ type: RESTAURANT_LOGOUT });
