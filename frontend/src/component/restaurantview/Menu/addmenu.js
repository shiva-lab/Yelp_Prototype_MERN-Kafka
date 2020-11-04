import React, { Component } from "react";
import axios from "axios";
import Navbar from "../rNavbar";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import swal from 'sweetalert2';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMenu } from "../../../redux/action/menuAction";
import store from "../../../redux/store";

class AddMenu extends React.Component {
  // Creating State
  constructor(props) {
    super(props);
  this.state = {
    itemname: "",
    price: "",
    itemdescription: "",
    itemcategory: "",
    ingredients: "",
    file:null
  }
  this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
 
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleValidation() {
    let formIsValid = true;
    //
    if (!this.state.itemname) {
      formIsValid = false;
      //alert(" Please enter item name");
      swal.fire({
        title: 'Failed!',
        text: 'Item Name Cannot be Empty',
        icon: 'error'
      })
      console.log("item name cannot be empty");
    }
    //
    if (!this.state.itemcategory) {
      formIsValid = false;
      alert("Item Category Required field");
      console.log("category field cannot be empty");
    }
    //
    if (!this.state.price) {
      formIsValid = false;
      alert("Price field cannot be empty");
      console.log("Price field cannot be empty");
    }
   
    //
    if (!this.state.itemdescription) {
      formIsValid = false;
      alert("Description is a Required field");
      console.log("Description cannot be empty");
    }

    if (!this.state.ingredients) {
      formIsValid = false;
      alert("ingredients is a Required field");
      console.log("ingredients cannot be empty");
    }
  
      return formIsValid;
    }


  submit = (event) => {
    event.preventDefault();
    if (this.handleValidation()) {
    let restaurant_id = localStorage.getItem("restaurant_id");
    var user_name = cookie.load("username")
    console.log("RestaurantID - Update", restaurant_id);
    const formData = new FormData();
    formData.append('myfile',this.state.file);
    formData.append('itemdescription', this.state.itemdescription)
    formData.append('price', this.state.price)
    formData.append('itemname', this.state.itemname)
    formData.append('itemcategory',this.state.itemcategory)
    formData.append('ingredients',this.state.ingredients)
    formData.append('restaurant_id',restaurant_id)
    formData.append('user_name',user_name)
    const config = {
      
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    //this.props.addMenu(formData,config);
    axios.post("/addmenu",formData,config)
    
    .then(response => {
              console.log("Status Code : ", response.status);
              if (response.status === 200) {
                  console.log("shiva inside login")
                  swal.fire({
                    title: 'Success!',
                    text: 'Item Added Successfully',
                    icon: 'success'
                  })
                  //alert('Good Job!','You Clicked the Button!','Success')
              }
          })
          .catch(error => {
              this.setState({
                  ...this.state,
                  message: "!!!!can not add item!!!!"
              });
              //alert("can not add data")
              swal.fire({
                title: 'Failed!',
                text: 'Cannot Add Data',
                icon: 'error'
              })
              console.log("Error is:", error);
              
          });
  };
  }
  
  onChange(e) {
    this.setState({file:e.target.files[0]});
}

  render() {


    console.log("State: ", this.state);
    let redirectVar = null;

    if (!cookie.load("restaurant_id")) {
      redirectVar = <Redirect to="/" />;
    }
    
      
     
    return (

      <div>
      {redirectVar}
      <div>

      <div>
        <Navbar />
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel"></div>

              <div>
                <div>
                  <h1 class="heading">Add a Menu Item</h1>
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

                     <br />
                    <br />
                    <input type="file" name="myfile" onChange= {this.onChange} required/>
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
      </div>
      </div>
    );
  }
}


// AddMenu.propTypes = {
//   addMenu: PropTypes.func.isRequired,
//   menuitem: PropTypes.object.isRequired,
 
// };

// const mapStateToProps = (state) => ({
//   menuitem: state.menu.menuitem,
// });

// export default connect(mapStateToProps, { addMenu })(AddMenu);

export default AddMenu;
