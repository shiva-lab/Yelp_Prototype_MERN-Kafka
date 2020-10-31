import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Header from '../../Header';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restaurantRegister } from '../../../redux/action/registeraction'



class RestaurantRegister extends React.Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      restaurantname: "",
      Emailid: "",
      restpass: "",
      location: "",
      authFlag: false
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.restaurantChangeHandler = this.restaurantChangeHandler.bind(this);
    this.submit = this.submit.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
   //location change handler to update state variable with the text entered by the user
   locationChangeHandler = e => {
    this.setState({
      location: e.target.value
    });
  };
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    this.setState({
      Emailid: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      restpass: e.target.value
    });
  };

  //restaurant change handler to update state variable with the text entered by the user
  restaurantChangeHandler = e => {
    this.setState({
      restaurantname: e.target.value
    });
  };
  // //zip code change handler to update state variable with the text entered by the user
  // zipCodeChangeHandler = e => {
  //   this.setState({
  //     zipcode: e.target.value
  //   });
  // };
  // //cuisine change handler to update state variable with the text entered by the user
  // cuisineChangeHandler = e => {
  //   this.setState({
  //     cuisine: e.target.value
  //   });
  // };

  handleValidation() {
    let formIsValid = true;

   
    //Location
    if (!this.state.location) {
      formIsValid = false;
      alert("Location is a Required field");
      console.log("Location cannot be empty");
    } else if (typeof this.state.location !== "undefined") {
      if (!this.state.location.match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        alert("Location cannot contain numbers");
        console.log("Location cannot contain numbers");
      }
    }
    //Password
    if (!this.state.restpass) {
      formIsValid = false;
      alert("Password is a Required field");
      console.log("Password cannot be empty");
    }
    //Email
    if (!this.state.Emailid) {
      formIsValid = false;
      alert("Login ID is a Required field");
      console.log("Login ID cannot be empty");
    }
    //Restaurant
    if (!this.state.restaurantname) {
      formIsValid = false;
      alert("Restaurant name is a Required field");
      console.log("restaurant name cannot be empty");
    }
    // //Zip Code
    // if (!this.state.zipcode) {
    //   formIsValid = false;
    //   alert("Zip Code is a Required field");
    //   console.log("Zip Code cannot be empty");
    // }
    // //Cusisine
    // if (!this.state.cuisine) {
    //   formIsValid = false;
    //   alert("Cuisine is a Required field");
    //   console.log("Cuisine cannot be empty");
    // }
    if (typeof this.state.Emailid !== "undefined") {
      let lastAtPos = this.state.Emailid.lastIndexOf("@");
      let lastDotPos = this.state.Emailid.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.Emailid.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          this.state.Emailid.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        alert("Email ID is invalid");
        console.log("Email ID is not Valid");
      }
    }

    return formIsValid;
  }
    
    
     async submit (event) {
        console.log("inside rest submit")
        //event.preventDefault();
    //prevent page from refresh
    event.preventDefault();
    if (this.handleValidation()) {
      const data = {
        location: this.state.location,
        Emailid: this.state.Emailid,
        restpass: this.state.restpass,
        restaurantname: this.state.restaurantname,
        
      };
       //set the with credentials to true
      // axios.defaults.withCredentials = true;
      //  axios
      //  .post("/restaurantregister", data)
      //  .then(response => {
      //    console.log("Status Code : ", response.status);
      //    if (response.status === 200) {
      //      this.setState({
      //        authFlag: true
      //      });
      //      alert("Restaurant Profile Created");
      //    }
      //  })
      //  .catch(err => {
      //    console.log(err);
      //    alert("Cannot Create profile. Login ID already exists");
      //    this.setState({
      //      authFlag: false
      //    });
      //  });
      await this.props.restaurantRegister(data); 

   }
     
 };
 render() {
  // //console.log('State: ', this.state);
   //var redirectVar1 = null
  //redirectVar1 = <Redirect to= "/Home"/>
  
  return (
    // <div>
    //         {redirectVar1}
    //        <div>
    //       <br/>
    <div class="body">
<Header/>
    <div>
      
      <div class="login-form">
      <div class="main-div-ru">
                  <br/><br/><br/><br/> <br/><br/><br/><br/>
          <div class="panel">
            <h1 class="heading">Sign Up for Yelp</h1>
            <p>Connect with great local Restaurants</p>
            <br/>
          </div>

          <form >
           
            <input style={{borderRadius: '3px'}}
              type="text"
              id="restaurantname"
              name="restaurantname"
              placeholder="Restaurant Name"
              onChange={this.restaurantChangeHandler}
            /><br /><br />
            
            <input style={{borderRadius: '3px'}}
              type="text"
              id="Emailid"
              name="Emailid"
              placeholder="Email Address"
              onChange={this.emailChangeHandler}
            /><br /><br />
            
            <input style={{borderRadius: '3px'}}
              type="password"
              id="restpass"
              name="restpass"
              placeholder="Password"
              onChange={this.passwordChangeHandler} /><br />
           <br/>

            <input style={{borderRadius: '3px'}}
              type="text"
              id="location"
              name="location"
              placeholder="City"
              onChange={this.locationChangeHandler}
            /><br />

            <div>
              <br/><br/>
              <button
                onClick={this.submit}
                class="btn btn-primary"
              >
                <b>Create your account</b>
              </button>
            </div>
            <p className="text-center">
                    Have an account? <Link to="/RestaurantLogin">Sign in</Link>
                  </p>
          </form>
        </div>
        <div class="signup signup-image"></div>
        
      </div>
     
    </div>
    </div>
    
    
  )
}
}
RestaurantRegister.propTypes = {
  restaurantRegister: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

  const mapStateToProps = state => ({
   user: state.register.user
  });

export default connect(mapStateToProps, { restaurantRegister })(RestaurantRegister);