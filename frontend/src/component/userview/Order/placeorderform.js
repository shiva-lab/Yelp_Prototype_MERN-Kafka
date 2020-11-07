import React, { Component } from "react";
import cookie from "react-cookies";
import axios from "axios";

class PlaceOrderForm extends React.Component {
  state = {
   
    deliverymode: "",
    contactnumber: "",
    email: "",
  };
  
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

// handleValidation() {
//   let formIsValid = true;

 
//   //value
//   if (!this.state.this.state.value) {
//     formIsValid = false;
//     alert("Delivery moce is a Required field");
//     console.log("Password cannot be empty");
//   }
// }
  submit = (event) => {
    event.preventDefault();
   // let restaurant_id = localStorage.getItem("restaurant_id_menu");
    let user_id = cookie.load("cookie1");
    //let cartprice = cookie.load("cartprice");
   // console.log("RestaurantID:", restaurant_id);
    console.log("user_id:", user_id);
  //  console.log("cartprice:", cartprice);

    var order_id = localStorage.getItem('order_id')
    const payload = {
      deliverymode: this.state.deliverymode, order_id,
       //  restaurant_id,
         user_id,
    };

    axios({
      url: "/createorder",
      method: "POST",
      data: payload,
    }).then(function (response) {
      alert("Order Placed Successfully")
      console.log(response);
    })
     
      .catch(() => {
        console.log("Internal server error");
      });
  };


  render() {
    return (
      <div class="body">
        <div>
        
          <div class="login-form">
            <form onSubmit={this.submit}>
           
              
              
                <select
                      value={this.state.value}
                      onChange={this.handleChange}
                      id="deliverymode"
                      name="deliverymode"
                      placeholder="deliverymode"
                      >
                      <option>Mode of Delivery</option>
                      <option value="Pickup">Pickup</option>
                      <option value="Delivery">Delivery</option>
                      <br/>
                      </select>
              
              <br />

            
              <div>
                <br />
                <br />

                <button class="btn btn-primary" type="submit" value="submit">
                  <b>Place an Order</b>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default PlaceOrderForm;