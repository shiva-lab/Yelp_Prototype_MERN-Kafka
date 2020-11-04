import axios from "axios";
import swal from 'sweetalert2';
import { ADD_MENU,EDIT_MENU,VIEW_MENU } from "./type";


export const addMenu = (formData, config) => (dispatch) => {
    

            console.log("Add menu called from action");
            // axios.defaults.withCredentials = true;
            axios.post("/addmenu",formData,config)
              .then((response) => {
                console.log("response is ", response);
                //alert("Item Successfully added");
                swal.fire({
                  title: 'Success!',
                  text: 'Item Successfully added',
                  icon: 'Success'
                })
                dispatch({
          
                  type: ADD_MENU,
                  payload: response.data
                });
              })
              .catch((error) => {
                if (error.response && error.response.data) {
                  return dispatch({
                    type: ADD_MENU,
                    payload: error.response.data
                  });
                }
              });
          };

    
          export const editMenu =  (formData, config) => (dispatch) => {


            console.log("Edit menu called from action");
            // axios.defaults.withCredentials = true;
            axios.post("/editmenu", formData, config)
              .then((response) => {
                console.log("From Edit Menu Action")
                console.log("response is ", response);
                alert("Item Successfully updated");
                dispatch({
          
                  type: EDIT_MENU,
                  payload: response.data,

                });
              })
              .catch((error) => {
                if (error.response && error.response.data) {
                  return dispatch({
                    type: EDIT_MENU,
                    payload: error.response.data
                  });
                }
              });
          };
          // export const viewMenu = (data) => (dispatch) => {


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
          