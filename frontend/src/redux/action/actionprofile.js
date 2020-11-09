import axios from "axios";
import { GET_PROFILE, UPDATE_PROFILE,UPDATE_USER_PROFILE } from "./type";
import swal from 'sweetalert2';



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

export const updateRestProfile = (restdata,config) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post('/restaurantupdate', restdata,config)
    .then((response) => {
      console.log("response is ", response);
      //alert('Profile updated ');
      swal.fire({
        title: 'Success!',
        text: 'Profile Updated',
        icon: 'Success'
      })

      dispatch({

        type: UPDATE_PROFILE,
        payload: response.data.data
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


export const updateUserProfile = userdata => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.post("/uupdateprofile", userdata)
    .then((response) => {
      console.log("response is ", response);
      alert('Profile updated ');
      dispatch({

        type: UPDATE_USER_PROFILE,
        payload: response.data.data
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: UPDATE_USER_PROFILE,
          payload: error.response.data
        });
      }
    });
};

