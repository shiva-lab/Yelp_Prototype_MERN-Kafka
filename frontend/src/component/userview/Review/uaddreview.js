import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import Navbar from "../uNavbar";
import StartRating from "./StarRating"

class addreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      rating: "",
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
    let order_id = localStorage.getItem("order_id_review");
    let restaurant_id = localStorage.getItem("restaurant_id_review");
    let user_id = localStorage.getItem("user_id_review");
    let rating = localStorage.getItem("ratingselectedstars");

    const formData = new FormData();
    formData.append('myfile',this.state.file);
    formData.append('review', this.state.review,)
    formData.append('rating', rating)
    formData.append('order_id',order_id)
    formData.append('restaurant_id',restaurant_id)
    formData.append('user_id',user_id)
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    axios.post("/addreview",formData,config)
            .then((response) => {
              if (response.status === 200) {
                alert("Your review is successfully uploaded");
              }
              if (response.status >=400) {
                alert("Can not add review at the moment");
              }
            }).catch((error) => {
              alert("can not upload review,please try again")
        });

  }

  resetUserInputs = () => {
    this.setState({
      review: "",
      rating: "",
    });
  };

  onChange(e) {
    this.setState({file:e.target.files[0]});
}

  render() {
    console.log("State: ", this.state);
    var restaurnt_id = cookie.load("cookie");
    return (
      <div>
        <Navbar/>
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel"></div>

              <div>
                <div>
                  <h1 class="heading">Provide Review</h1>
                  <form onSubmit={this.submit} enctype="multipart/form-data">
                    <textarea
                      style={{ borderRadius: "3px" }}
                      id="review"
                      name="review"
                      cols="30"
                      rows="10"
                      placeholder="Add Your Review"
                      value={this.state.review}
                      onChange={this.handleChange}
                    ></textarea>
                    <br />
                    <br />

                    {/* <select
                      value={this.state.value}
                      onChange={this.handleChange}
                      id="rating"
                      name="rating"
                      placeholder="Rating"
                    >
                      <option>Rating</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select> */}

                    <StartRating/>

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
    );
  }
}
export default addreview;