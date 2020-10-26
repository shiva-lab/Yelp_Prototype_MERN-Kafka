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
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/allRestaurant");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/allRestaurant");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  //email change handler to update state variable with the text entered by the user
  //password change handler to update state variable with the text entered by the user
  //Email
  //Password
  //submit Login handler to send a request to the node backend
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      Emailid: this.state.Emailid,
      userpass: this.state.userpass,
    };

    this.props.userLogin(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
                      <form onSubmit={this.onSubmit}>
                        <input
                          type="text"
                          style={{ borderRadius: "3px" }}
                          id="Emailid"
                          name="Emailid"
                          placeholder="Email"
                          value={this.state.Emailid}
                          onChange={this.onChange}
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
                          value={this.state.password}
                          onChange={this.onChange}
                          required
                        />
                        <br />
                        <br></br>

                        <button
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
    auth: state.auth,
  user: state.login.user,
  };
};

export default connect(mapStateToProps, { userLogin })(UserLogin);



