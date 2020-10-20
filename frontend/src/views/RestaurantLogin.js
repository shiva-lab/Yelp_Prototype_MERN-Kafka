import React, { Component } from 'react';
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restLogin } from '../redux/action/loginaction'
//import { Navbar } from "react-bootstrap";
import Footer from '../component/Footer';

import Header from '../component/Header';


class RestaurantLogin extends React.Component {

  //call the constructor method
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      emailid: "",
      restpass: "",
      message: "",
      authFlag: false
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    //this.submitCustomerLogin = this.submitCustomerLogin.bind(this);
    this.submitRestLogin = this.submitRestLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    console.log("Inside email change handler");
    this.setState({
      emailid: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      restpass: e.target.value
    });
  };
  handleValidation() {
    let formIsValid = true;

    //Email
    if (!this.state.emailid) {
      formIsValid = false;
      alert("Email is a Required field");
      console.log("Email cannot be empty");
    }

    //Password
    if (!this.state.restpass) {
      formIsValid = false;
      alert("Password is a Required field");
      console.log("Password cannot be empty");
    }

    return formIsValid;
  }
  //submit Login handler to send a request to the node backend

  async submitRestLogin(event) {
    console.log("Inside submit login");
    //prevent page from refresh
    event.preventDefault();
    if (this.handleValidation()) {
      console.log(" Restaurant Login Form submitted");
      const data = {
        emailid: this.state.emailid,
        restpass: this.state.restpass
      };

      //set the with credentials to true
      // axios.defaults.withCredentials = true;
      // //make a post request with the user data
      // axios
      //   .post("/restaurantlogin", data)
      //   .then(response => {
      //     console.log("Status Code : ", response.status);
      //     if (response.status === 200) {
      //       console.log("shiva inside login")
      //       this.setState({
      //         authFlag: true
      //       });
      //     }
      //   })
      //   .catch(error => {
      //     this.setState({
      //       ...this.state,
      //       message: "!!!!Incorrect username or password!!!!"
      //     });
      //     console.log("Error is:", error);
      //     // alert("Authentication Failed! Please try again");
      //   });
      await this.props.restLogin(data);
      console.log(this.props);

    }
  }
  render() {
    console.log("Rendering again");
    let redirectVar = null;
    let errorMsg = null;

    if (cookie.load('restaurant_id')) {
      redirectVar = <Redirect to="/rhome" />
      localStorage.setItem('email', this.state.emailid);
      console.log("Saving email to localstorage");
      //Fetching Restaurant ID Value from Cookie and setting the local storage
      var restaurnt_id = (cookie.load('restaurant_id'))
      console.log(restaurnt_id)
      localStorage.setItem('restaurant_id', restaurnt_id);
    } else {
      errorMsg = <p> Hey Stranger! We don't recognize that login. Spell check your info and try again! </p>
    }


    return (
      <div>
        {redirectVar}
        <div>
          <div class="body">
            <Header />

              <div class="row">
                <div class="column">
                  <div class="container">
                    <div class="login-form">

                    <div class="main-div-ru">
                      <br /><br /><br /><br /> <br /><br /><br /><br />
                      <div class="panel">
                        <h1 class="heading" >Restaurant Login</h1>
                        <br />
                      </div>
                      <form>
                        <input type="text" id="emailid" name="emailid" placeholder="Email" onChange={this.emailChangeHandler} required /><br /><br />
                        <input type="password" id="restpass" placeholder="Password" name="restpass" onChange={this.passwordChangeHandler} required /><br />
                        <br></br>
                        <button onClick={this.submitRestLogin} class="btn btn-primary">Login</button>
                        <p className="text-center">New to Yelp? <Link to="/RestaurantRegister">Sign Up</Link>
                        </p>
                      </form>

                    </div>

                    <div class="signup signup-image"></div>

                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    )
  }
}

RestaurantLogin.propTypes = {
  RestaurantLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return ({
    user: state.login.user
  })
};

export default connect(mapStateToProps, { restLogin })(RestaurantLogin);