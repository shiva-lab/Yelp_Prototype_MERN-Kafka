import React, { Component } from "react";
import cookie from "react-cookies";
import axios from "axios";

class Placeorderform extends React.Component {
  state = {
    fullname: "",
    address: "",
    city: "",
    zipcode: "",
    deliverymode: "",
    contactnumber: "",
    email: "",
  };
  // handleValidation() {
  //   let formIsValid = true;

   
  //   //name
  //   if (!this.state.fullname) {
  //     formIsValid = false;
  //     alert("Name is a Required field");
  //     console.log("name cannot be empty");
  //   } else if (typeof this.state.fullname !== "undefined") {
  //     if (!this.state.fullname.match(/^[a-zA-Z ]+$/)) {
  //       formIsValid = false;
  //       alert("Name cannot have numbers");
  //       console.log("Location cannot contain numbers");
  //     }
  //   }
  //   //address
  //   if (!this.state.address) {
  //     formIsValid = false;
  //     alert("Password is a Required field");
  //     console.log("Password cannot be empty");
  //   }
  //   //Email
  //   if (!this.state.emailid) {
  //     formIsValid = false;
  //     alert("Login ID is a Required field");
  //     console.log("Login ID cannot be empty");
  //   }

  //   //contact number
  //   if (!this.state.contactnumber) {
  //     formIsValid = false;
  //     alert("Restaurant name is a Required field");
  //     console.log("restaurant name cannot be empty");
  //   }else if (typeof this.state.contactnumber !== "undefined") {
  //     if (!this.state.contactnumber.match(/^[0-9]+$/)) {
  //       formIsValid = false;
  //       alert("Contact must have numbers");
  //       console.log("contact must contain numbers");
  //     }
  //   // //Zip Code
  //   if (!this.state.zipcode) {
  //     formIsValid = false;
  //     alert("Zip Code is a Required field");
  //     console.log("Zip Code cannot be empty");
  //   }
    
  //   if (typeof this.state.emailid !== "undefined") {
  //     let lastAtPos = this.state.emailid.lastIndexOf("@");
  //     let lastDotPos = this.state.emailid.lastIndexOf(".");

  //     if (
  //       !(
  //         lastAtPos < lastDotPos &&
  //         lastAtPos > 0 &&
  //         this.state.emailid.indexOf("@@") === -1 &&
  //         lastDotPos > 2 &&
  //         this.state.emailid.length - lastDotPos > 2
  //       )
  //     ) {
  //       formIsValid = false;
  //       alert("Email ID is invalid");
  //       console.log("Email ID is not Valid");
  //     }
  //   }

  //   return formIsValid;
  // }
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();
    let restaurant_id = localStorage.getItem("restaurant_id_menu");
    let user_id = cookie.load("cookie1");
    let cartprice = cookie.load("cartprice");
    let status = "Order Placed";
    console.log("RestaurantID:", restaurant_id);
    console.log("user_id:", user_id);
    console.log("cartprice:", cartprice);

    const payload = {
      fullname: this.state.fullname,
      address: this.state.address,
      city: this.state.city,
      zipcode: this.state.zipcode,
      deliverymode: this.state.deliverymode,
      contactnumber: this.state.contactnumber,
      email: this.state.email,
      restaurant_id,
      user_id,
      cartprice
    };

    axios({
      url: "/createorder",
      method: "POST",
      data: payload,
    }).then(function (response) {
      alert("Order Placed Successfully")
      console.log(response);
    })
      // .then(() => {
      //   console.log("Data has been sent to the server");
      //   //this.resetUserInputs();
      // })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  // resetUserInputs = () => {
  //   this.setState({
  //     fullname: "",
  //     address: "",
  //     city: "",
  //     zipcode: "",
  //     mode: "",
  //     contactnumber: "",
  //     email: "",
  //   });
  // };

  render() {
    return (
      <div class="body">
        <div>
        
          <div class="login-form">
            <form onSubmit={this.submit}>
            <h1>Delivery/Pickup Details</h1>
              <input
                style={{ borderRadius: "3px" }}
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Full Name"
                value={this.state.fullname}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <input
                style={{ borderRadius: "3px" }}
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <input
                style={{ borderRadius: "3px" }}
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={this.state.city}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <input
                style={{ borderRadius: "3px" }}
                type="text"
                id="zipcode"
                name="zipcode"
                placeholder="Zipcode"
                value={this.state.zipcode}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <br />
              
              
                {/* <label>Mode of Delivery</label>
                <br /> <br />
                <input type="radio" value="pickup" name="mode" value={this.state.mode}
                onChange={this.handleChange}/> Pickup
                <input type="radio" value="delivery" name="mode"value={this.state.mode}
                onChange={this.handleChange} /> Delivery */}
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

              <br />
              <input
                style={{ borderRadius: "3px" }}
                type="text"
                id="contactnumber"
                name="contactnumber"
                placeholder="Contact Number"
                value={this.state.contactnumber}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <br />
              <input
                style={{ borderRadius: "3px" }}
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.handleChange}
              />
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
export default Placeorderform;