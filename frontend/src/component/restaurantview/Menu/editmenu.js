import React, { Component } from "react";
import axios from "axios";
import Navbar from "../rNavbar";
import cookie from "react-cookies";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editMenu } from "../../../redux/action/menuAction";
import store from "../../../redux/store";

class EditMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemname: "",
      price: "",
      item_description: "",
      foodimage: "",
      itemcategory: "",
      ingredients: "",
      file: null,
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();
    let restaurant_id = localStorage.getItem("restaurant_id");
    let item_id = localStorage.getItem("item_id_menudetails");
    console.log("RestaurantID - Update", restaurant_id);

    const formData = new FormData();
    formData.append("myfile", this.state.file);
    formData.append("item_description", this.state.item_description);
    formData.append("price", this.state.price);
    formData.append("itemname", this.state.itemname);
    formData.append("itemcategory", this.state.itemcategory);
    formData.append("ingredients", this.state.ingredients);
    formData.append("restaurant_id", restaurant_id);
    formData.append("item_id", item_id);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    this.props.editMenu(formData, config);

    // axios.post("/editmenu",formData,config)

    // .then(response => {
    //     if (response.status === 200) {
    //     alert("Item Successfully Updated")
    //     console.log(response);
    //     }
    //   })
    //   // .then(() => {
    //   //   console.log("Data has been sent to the server");
    //   //   this.resetUserInputs();
    //   // })

    //   .catch(() => {
    //     console.log("Internal server error");

    //   });
  };

  // resetUserInputs = () => {
  //   this.setState({
  //     itemname: "",
  //     itemdescription: "",
  //     price: "",
  //     foodimage: "",
  //     itemcategory: "",
  //     ingredients:"",
  //   });
  // };
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  render() {
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
                      id="item_description"
                      name="item_description"
                      cols="30"
                      rows="10"
                      placeholder="Item Description"
                      value={this.state.item_description}
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
                    <input
                      type="file"
                      name="myfile"
                      onChange={this.onChange}
                      required
                    />
                    <br />
                    <br />

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

EditMenu.propTypes = {
  editMenu: PropTypes.func.isRequired,
  menuitem: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menuitem: state.menu.menuitem,
});

export default connect(mapStateToProps, { editMenu })(EditMenu);
//export default editmenu
