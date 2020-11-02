import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { restLogin } from "../../../redux/action/loginaction";
import Footer from "../../Footer";
import Header from "../../Header";
import swal from 'sweetalert2';


class RestaurantLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      Emailid: "",
      restpass: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/rhome");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/rhome");
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
      restpass: this.state.restpass,
    };

    this.props.restLogin(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log("Rendering again");
    let redirectVar = null;
    let errorMsg = null;

    if (cookie.load("restaurant_id")) {
      redirectVar = <Redirect to="/rhome" />;
      localStorage.setItem("email", this.state.Emailid);
      console.log("Saving email to localstorage");
      var restaurant_id = cookie.load("restaurant_id");
      console.log(restaurant_id);
      localStorage.setItem("restaurant_id", restaurant_id);
    } else {
      errorMsg = <p> Try again! </p>;
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
                      <br /> <br /> <br /> <br />
                      <br />
                      <br />
                      <br />
                      <div class="panel">
                        <h1 class="heading">Restaurant Login</h1>
                        <br />
                      </div>
                      <form onSubmit={this.onSubmit}>
                        <input
                          type="text"
                          id="Emailid"
                          name="Emailid"
                          required
                          placeholder="Email Address"
                          value={this.state.Emailid}
                          onChange={this.onChange}
                        />
                        <br />
                        <br />
                        <input
                          type="password"
                          id="restpass"
                          placeholder="Password"
                          name="restpass"
                          required
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                        <br />
                        <br></br>
                        <button class="btn btn-primary">Login</button>
                        <p className="text-center">
                          New to Yelp?{" "}
                          <Link to="/RestaurantRegister">Sign Up</Link>
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
    );
  }
}

RestaurantLogin.propTypes = {
  RestaurantLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.login.user,
});

export default connect(mapStateToProps, { restLogin })(RestaurantLogin);
