import axios from "axios";
import { USER_REGISTER, RESTAURANT_REGISTER } from "./type";
import swal from 'sweetalert2'


export const userRegister = userData => (dispatch) => {
  console.log("User Registration called from action");
  // axios.defaults.withCredentials = true;
  axios.post('/usersignup', userData)
    .then((response) => {
      
      console.log("response is ", response);
      //alert("Successfully Signed up,Please Sign in");
      swal.fire({
        title: 'Success!',
        text: 'Successfully Signed up, Please Sign in to your account.',
        icon: 'success'
      })
      dispatch({

        type: USER_REGISTER,
        payload: response.data
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: USER_REGISTER,
          payload: error.response.data
        });
      }
    });
};

// export const userRegister = userData => dispatch => {
//     fetch('/usersignup', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//     })
//       .then(res => res.json())
//       .then(userData =>
//         dispatch({
//           type: USER_REGISTER,
//           payload: userData
//         })
//       );
//   };

export const restaurantRegister = restData => (dispatch) => {
  console.log("Restaurant Registration called from action");
  // axios.defaults.withCredentials = true;
  axios
    .post("/restaurantregister", restData)
  //      .then(response => {
    //      console.log("Status Code : ", response.status);
    //      if (response.status === 200) {
    //        this.setState({
    //          authFlag: true
    //        });
    //        alert("Restaurant Profile Created");
    //      }
    //    })
    .then((response) => {
      console.log("response is ", response);
      alert("Successfully Signed up,Please Sign in");
      dispatch({

        type: RESTAURANT_REGISTER,
        payload: response.data
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: RESTAURANT_REGISTER,
          payload: error.response.data
        });
      }
    });
};
// export const restaurantRegiter = (restData) => dispatch => {
//     axios.defaults.withCredentials = true;
//     axios.post("/restaurantregister", restData)
//         .then(response => dispatch({
//             type: RESTAURANT_REGISTER,
//             payload: response.data
//         }))
//         .catch(error => {
//             if (error.response && error.response.data) {
//                 return dispatch({
//                     type: RESTAURANT_REGISTER,
//                     payload: error.response.data
//                 });
//             }
//             return;
//         });
// }
