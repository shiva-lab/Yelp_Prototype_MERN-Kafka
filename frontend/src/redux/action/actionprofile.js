import axios from "axios";
import { GET_PROFILE, UPDATE_PROFILE } from "./type";


// export const getRestProfile = (restdata) => dispatch => {
//     fetch('/viewhome', {
//         method: 'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify(restdata)
//     })
//         .then(response => response.data)
//         .then(customer => dispatch({
//             type: GET_PROFILE,
//             payload: customer
//         }))
//         .catch(error => {
//             console.log(error);
//         });
// }

export const updateRestProfile = restdata => (dispatch) => {
  axios.post('/restaurantupdate', restdata)
    .then((response) => {
      console.log("response is ", response);
      alert('Profile updated ');
      dispatch({

        type: UPDATE_PROFILE,
        payload: response.data
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: UPDATE_PROFILE,
          payload: error.response.data
        });
      }
    });
};
