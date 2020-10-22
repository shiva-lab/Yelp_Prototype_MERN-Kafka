import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLogin } from "../redux/action/loginaction";
import Header from "../component/Header";
import { Link } from 'react-router-dom';

class UserLogin extends React.Component {
  //call the constructor method
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      Emailid: "",
      userpass: "",
      message: "",
      authFlag: false,
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    //this.submitCustomerLogin = this.submitCustomerLogin.bind(this);
    this.submituserLogin = this.submituserLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = (e) => {
    console.log("Inside email change handler");
    this.setState({
      Emailid: e.target.value,
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      userpass: e.target.value,
    });
  };
  handleValidation() {
    let formIsValid = true;

    //Email
    if (!this.state.Emailid) {
      formIsValid = false;
      alert("Email is a Required field");
      console.log("Email cannot be empty");
    }

    //Password
    if (!this.state.userpass) {
      formIsValid = false;
      alert("Password is a Required field");
      console.log("Password cannot be empty");
    }

    return formIsValid;
  }

  async submituserLogin(event) {
    console.log("Inside submit login");
    //prevent page from refresh
    event.preventDefault();
    if (this.handleValidation()) {
      console.log(" user Login Form submitted");
      const data = {
        Emailid: this.state.Emailid,
        userpass: this.state.userpass,
      };

      // //set the with credentials to true
      // axios.defaults.withCredentials = true;
      // //make a post request with the user data
      // axios
      //     .post("/userlogin", data)
      //     .then(response => {
      //         console.log("Status Code : ", response.status);
      //         if (response.status === 200) {
      //             console.log("shiva inside login")
      //             this.setState({
      //                 authFlag: true
      //             });
      //         }
      //     })
      //     .catch(error => {
      //         this.setState({
      //             ...this.state,
      //             message: "!!!!Incorrect username or password!!!!"
      //         });
      //         console.log("Error is:", error);
      //         // alert("Authentication Failed! Please try again");
      //     });
      await this.props.userLogin(data);
      console.log(this.props);
    }
  }
  render() {
    let redirectVar = null;

    if (cookie.load("cookie1")) {
      //redirectVar = <Redirect to="/uviewrestaurant" />;
      var user_id_cookie = cookie.load("cookie1")
      console.log(user_id_cookie)
      localStorage.setItem("user_id", user_id_cookie);
      redirectVar = <Redirect to="/allRestaurant" />;
      
      localStorage.setItem("email", this.state.Emailid);
      console.log("Saving email to localstorage");
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
                      <br />
                      <br />
                      <br />
                      <br /> <br />
                      <br />
                      <br />
                      <br />
                      <div class="panel">
                        <h1 class="heading">User Login</h1>
                        <br />
                      </div>
                      <form>
                        <input
                          type="text"
                          style={{ borderRadius: "3px" }}
                          id="Emailid"
                          name="Emailid"
                          placeholder="Email"
                          onChange={this.emailChangeHandler}
                          required
                        />
                        <br />
                        <br />

                        <input
                          type="password"
                          style={{ borderRadius: "3px" }}
                          id="userpass"
                          name="userpass"
                          placeholder="Password"
                          onChange={this.passwordChangeHandler}
                          required
                        />
                        <br />
                        <br></br>

                        <button
                          onClick={this.submituserLogin}
                          class="btn btn-primary"
                        >
                          Login
                        </button>

                        <p className="text-center">
                    Don't Have an account? <Link to="/UserSignup">Sign up</Link>
                  </p>
                      </form>
                    </div>
                    
                  </div>
                  
                
                <div class="signup signup-image"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UserLogin.propTypes = {
  userLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};

export default connect(mapStateToProps, { userLogin })(UserLogin);
