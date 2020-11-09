import React, { Component } from "react";
import axios from "axios";
import Navbar from "../uNavbar";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUserProfile } from "../../../redux/action/actionprofile";
import store from "../../../redux/store";

import { Provider } from "react-redux";
class uupdateprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: null,
      headline: null,
      fname: null,
      lname: null,
      dob: null,
      city: null,
      ustate: null,
      country: null,
      nick_name: null,
      emailid: null,
      mobile: null,
      address: null,
      favorites: null,
      myblog: null,
      things_ilove: null,
      find_me_in: null,
      file: null,
      profile: [],
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  componentDidMount() {
    const self = this;
    const user_id = cookie.load("cookie1");
    //const user_id = localStorage.getItem('user_id');
    const data = { user_id };

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.get(`/uviewprofile/${user_id}`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      console.log(response);
      this.setState({ profile: [response.data.data] });
    })
    .catch((err) => {
      console.log("caught it!", err);
    });
}
  submit = (event) => {
    event.preventDefault();
    let user_id = cookie.load("cookie1");
    console.log("userId:", user_id);

    const formData = new FormData();
    formData.append("myfile", this.state.file);
    formData.append("bio", this.state.bio);
    formData.append("headline", this.state.headline);
    formData.append("fname", this.state.fname);
    formData.append("lname", this.state.lname);
    formData.append("dob", this.state.dob);
    formData.append("city", this.state.city);
    formData.append("ustate", this.state.ustate);
    formData.append("country", this.state.country);
    formData.append("nick_name", this.state.nick_name);
    formData.append("mobile", this.state.mobile);
    formData.append("emailid", this.state.emailid);
    formData.append("address", this.state.address);
    formData.append("favorites", this.state.favorites);
    formData.append("myblog", this.state.myblog);
    formData.append("things_ilove", this.state.things_ilove);
    formData.append("find_me_in", this.state.find_me_in);

    formData.append("user_id", user_id);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    this.props.updateUserProfile(formData);
  };

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    console.log("State: ", this.state);

    let redirectVar = null;

    if (!cookie.load("cookie1")) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        <div>
          <Provider store={store}>
            <div>
              <Navbar />

              <div class="container">
                {this.state.profile.map((userprofile) => (
                  <div class="login-form">
                    <div class="main-div">
                      <div class="panel"></div>
                      <div>
                        <h1 class="heading">User Profile Update</h1>
                        <form onSubmit={this.submit}>
                          <br />
                          <lable>Bio</lable>
                          <br />
                          <textarea
                            style={{ borderRadius: "3px" }}
                            id="bio"
                            name="bio"
                            cols="30"
                            rows="10"
                            placeholder={userprofile.bio}
                            value={this.state.description}
                            onChange={this.handleChange}
                          ></textarea>
                          <br />
                          <br />
                          <lable>Headline</lable>
                          <br />
                          <input
                            type="text"
                            style={{ borderRadius: "3px" }}
                            id="headline"
                            name="headline"
                            placeholder={userprofile.headline}
                            value={this.state.headline}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>First Name</lable>
                          <br />
                          <input
                            type="text"
                            style={{ borderRadius: "3px" }}
                            id="fname"
                            name="fname"
                            placeholder={userprofile.fname}
                            value={this.state.fname}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>Last Name</lable>
                          <br />
                          <input
                            type="text"
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="lname"
                            name="lname"
                            placeholder={userprofile.lname}
                            value={this.state.lname}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>Date of Birth</lable>
                          <br />
                          <input
                            type="date"
                            style={{ borderRadius: "3px" }}
                            id="dob"
                            name="dob"
                            placeholder={userprofile.dob}
                            value={this.state.dob}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>City</lable> <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="city"
                            name="city"
                            placeholder={userprofile.city}
                            value={this.state.city}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>State </lable> <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="ustate"
                            name="ustate"
                            placeholder={userprofile.ustate}
                            value={this.state.ustate}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>Country</lable>
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="country"
                            name="country"
                            placeholder={userprofile.country}
                            value={this.state.country}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>Nick Name</lable>
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="nick_name"
                            name="nick_name"
                            placeholder={userprofile.nick_name}
                            value={this.state.nick_name}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>Email Address</lable>
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="emailid"
                            name="emailid"
                            placeholder={userprofile.Emailid}
                            value={this.state.emailid}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>Mobile Number</lable>
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="mobile"
                            name="mobile"
                            placeholder={userprofile.mobile}
                            value={this.state.mobile}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>Physical Address</lable>
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="address"
                            name="address"
                            placeholder={userprofile.address}
                            value={this.state.address}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>Favorites</lable>
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="favorites"
                            name="favorites"
                            placeholder={userprofile.favorites}
                            value={this.state.favorites}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>MyBlog/Website</lable>
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="myblog"
                            name="myblog"
                            placeholder={userprofile.myblog}
                            value={this.state.myblog}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>Things I Love</lable>
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="things_ilove"
                            name="things_ilove"
                            placeholder={userprofile.things_ilove}
                            value={this.state.things_ilove}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <lable>Find Me in</lable>
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="find_me_in"
                            name="find_me_in"
                            placeholder={userprofile.find_me_in}
                            value={this.state.find_me_in}
                            onChange={this.handleChange}
                          />
                          <br />
                          <br />
                          <br />
                          <lable>Profile Pic</lable>
                          <br />
                          <input
                            type="file"
                            name="myfile"
                            onChange={this.onChange}
                          />
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
                ))}
              </div>
            </div>
          </Provider>
        </div>
      </div>
    );
  }
}

uupdateprofile.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.profile.user,
});

export default connect(mapStateToProps, { updateUserProfile })(uupdateprofile);
