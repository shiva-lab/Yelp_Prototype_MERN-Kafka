import React, { Component } from "react";
import axios from "axios";
import Navbar from "../restaurantview/rNavbar";
import cookie from "react-cookies";

class editmenu extends React.Component{
    state = {
        itemname: "",
        price: "",
        itemdescription: "",
        foodimage: "",
        itemcategory: "",
        ingredients: ""
      };
      handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
      };
    
     submit = (event) => {
        event.preventDefault();
        let restaurant_id = localStorage.getItem("restaurant_id");
        let item_id = localStorage.getItem("item_id_menudetails");
        console.log("RestaurantID - Update", restaurant_id);
    
        const payload = {
          itemname: this.state.itemname,
          itemdescription: this.state.itemdescription,
          price: this.state.price,
          foodimage: this.state.foodimage,
          itemcategory: this.state.itemcategory,
          ingredients: this.state.ingredients,
          restaurant_id,
          item_id
        };
    
        axios({
          url: "/editmenu",
          method: "POST",
          data: payload,
        })
          .then(response => {
            if (response.status === 200) {
            alert("Item Successfully Updated")
            console.log(response);
            }
          })
          .then(() => {
            console.log("Data has been sent to the server");
            this.resetUserInputs();
          })
        
          .catch(() => {
            console.log("Internal server error");
          });
      };
    
      resetUserInputs = () => {
        this.setState({
          itemname: "",
          itemdescription: "",
          price: "",
          foodimage: "",
          itemcategory: "",
          ingredients:"",
        });
      };
    
    render(){
        console.log("State: ", this.state);
        var restaurnt_id = cookie.load("cookie");
        return (
          <div>
            <Navbar />
            <div class="container">
              <div class="login-form">
                <div class="main-div">
                  <div class="panel"></div>
    
                  <div>
                    <div>
                      <h1 class="heading">Update a Menu Item</h1>
                      <form onSubmit={this.submit}>
                        <input
                          style={{ borderRadius: "3px" }}
                          type="text"
                          id="itemname"
                          name="itemname"
                          placeholder="Item Name"
                          value={this.state.itemname}
                          onChange={this.handleChange}
                        />
                        <br />
                        <br />
    
                        <textarea
                          style={{ borderRadius: "3px" }}
                          id="itemdescription"
                          name="itemdescription"
                          cols="30"
                          rows="10"
                          placeholder="Item Description"
                          value={this.state.itemdescription}
                          onChange={this.handleChange}
                        ></textarea>
                        <br />
                        <br />
                        <textarea
                          style={{ borderRadius: "3px" }}
                          id="ingredients"
                          name="ingredients"
                          cols="30"
                          rows="5"
                          placeholder="Main Ingredients"
                          value={this.state.ingredients}
                          onChange={this.handleChange}
                        ></textarea>
                        <br />
                        <br />
                        <input
                          style={{ borderRadius: "3px" }}
                          type="text"
                          id="price"
                          name="price"
                          placeholder="Price in USD"
                          value={this.state.price}
                          onChange={this.handleChange}
                        />
                        <br />
                        <br />
    
                        <input
                          style={{ borderRadius: "3px" }}
                          type="text"
                          id="foodimage"
                          name="foodimage"
                          placeholder="Food Image URL"
                          value={this.state.foodimage}
                          onChange={this.handleChange}
                        />
                        <br />
                        <br />
    
                        <select
                          value={this.state.value}
                          onChange={this.handleChange}
                          id="itemcategory"
                          name="itemcategory"
                          placeholder="Item Category"
                        >
                          <option>Select Item Category</option>
                          <option value="appetizer">Appetizer</option>
                          <option value="salads">Salads</option>
                          <option value="maincourse">Main Course</option>
                          <option value="dessert">Desserts</option>
                          <option value="beverages">Bevereges</option>
                        </select>
    
                        <br />
                        <br />
    
                        <input
                          class="btn btn-primary"
                          type="submit"
                          value="Submit"
                        ></input>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}
export default editmenu