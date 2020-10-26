import axios from "axios";
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode';

import {
  USER_LOGIN, USER_LOGOUT, RESTAURANT_LOGIN, RESTAURANT_LOGOUT,SET_CURRENT_USER 
} from "./type";


// export const userLogin = loginData => (dispatch) => {
//   axios.defaults.withCredentials = true;
//   console.log("From Login Action", loginData);
//   axios.post("/userlogin", loginData,
//     {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     .then(loginResponse => dispatch({
//       type: USER_LOGIN,
//       payload: loginResponse
//     }))
//     .catch((error) => {
//       if (error.response && error.response.data) {
//         alert("Invalid Crendentials! Please try again");
//         return dispatch({
//           type: USER_LOGIN,
//           payload: error.response.data
//         });
//       }
//     });
// };

export const userLogout = () => dispatch => dispatch({ type: USER_LOGOUT });


export const restLogin = loginData => (dispatch) => {
  // axios.defaults.withCredentials = true;
  axios.post("/restaurantlogin", loginData,
    {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    }).catch((error) => {
      if (error.response && error.response.data) {
        alert("Invalid Crendentials! Please try again");
        return dispatch({
          type: RESTAURANT_LOGIN,
          payload: error.response.data
        });
      }
    });
};


export const userLogin = loginData => (dispatch) => {
  // axios.defaults.withCredentials = true;
  axios.post("/userlogin", loginData,
    {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    }).catch((error) => {
      if (error.response && error.response.data) {
        alert("Invalid Crendentials! Please try again");
        return dispatch({
          type: USER_LOGIN,
          payload: error.response.data
        });
      }
    });
};


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const restLogout = () => dispatch => dispatch({ type: RESTAURANT_LOGOUT });