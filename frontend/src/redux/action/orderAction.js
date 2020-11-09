  // export const viewMenu = (data) => (dispatch) => {
    import axios from "axios";
    import {SET_LOADED_ORDER_STATE} from "./type";
    import swal from 'sweetalert2';

    export const placeOrder = userdata => (dispatch) => {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios.post("/createorder", userdata)
        .then((response) => {
          console.log("response is ", response);
          alert("Order Placed Successfully");
        console.log(response);
          dispatch({
    
            type: SET_LOADED_ORDER_STATE,
            payload: response.data.data
          });
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            return dispatch({
              type: SET_LOADED_ORDER_STATE,
              payload: error.response.data
            });
          }
        });
    };

    export const changeStatus = userdata => async (dispatch) => {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      await axios.post("/neworderstatuschange", userdata)
        .then(async (response) => {
          console.log("Order status change Successfully", response.data);
            dispatch({
              type: SET_ORDER_STATUS,
              payload: response.data.data
            });
           
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            return dispatch({
              type: SET_ORDER_STATUS,
              payload: error.response.data.data
            });
          }
        });
    };숀
          //   console.log("View menu called from action");
          //   // axios.defaults.withCredentials = true;
          //   axios.post("/viewmenu", data)
          //     .then((response) => {
          //       console.log("From view menu")
          //       console.log("response is ", response);
                
          //       dispatch({
          
          //         type: VIEW_MENU,
          //         payload: response.data,

          //       });
          //     })
          //     .catch((error) => {
          //       if (error.response && error.response.data) {
          //         return dispatch({
          //           type: VIEW_MENU,
          //           payload: error.response.data
          //         });
          //       }
          //     });
          // };
          