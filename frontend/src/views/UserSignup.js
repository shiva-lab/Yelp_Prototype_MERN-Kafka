import React, {Component} from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userRegister } from '../redux/action/registeraction'
import store from '../redux/store'
import { Provider } from 'react-redux';
import Header from '../component/Header';
import cookie from "react-cookies";
import { Redirect } from "react-router";

class UserSignup extends React.Component{
//call the constructor method
constructor(props) {
  //Call the constrictor of Super class i.e The Component
  super(props);
  //maintain the state required for this component
  this.state = {
    user_name: '',
    emailid: '',
    userpass: '',
    zipcode: ''
    //authFlag: false
  };
  //this.state = {};


  //Bind the handlers to this class
   this.emailChangeHandler = this.emailChangeHandler.bind(this);
  this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
   this.userChangeHandler = this.userChangeHandler.bind(this);
   this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
  //this.onChange=this.onChange.bind(this);
  this.submit = this.submit.bind(this);
}
//Call the Will Mount to set the auth Flag to false
// componentWillMount() {
//   this.setState({
//     authFlag: false
//   });
// }

//email change handler to update state variable with the text entered by the user
emailChangeHandler = e => {
  this.setState({
    emailid: e.target.value
  });
};
//password change handler to update state variable with the text entered by the user
passwordChangeHandler = e => {
  this.setState({
    userpass: e.target.value
  });
};

//restaurant change handler to update state variable with the text entered by the user
userChangeHandler = e => {
  this.setState({
    user_name: e.target.value
  });
};

zipcodeChangeHandler = e => {
  this.setState({
    zipcode: e.target.value
  });
};


handleValidation() {
  let formIsValid = true;

 
  //Password
  if (!this.state.userpass) {
    formIsValid = false;
    alert("Password is a Required field");
    console.log("Password cannot be empty");
  }
  //Email
  if (!this.state.emailid) {
    formIsValid = false;
    alert("Login ID is a Required field");
    console.log("Login ID cannot be empty");
  }
  //zipcode
  if (!this.state.zipcode) {
    formIsValid = false;
    alert("Zipcode Required field");
    console.log("Zipcode cannot be empty");
  }
  // else if (typeof this.state.zipcode !== "undefined") {
  //   if (!this.state.location.match(/^[0-9]+$/)) {
  //     formIsValid = false;
  //     alert("zipcode can have only numbers");
  //     console.log("zipcode can have only nos.");
  //   }
  // }
  //User
  if (!this.state.user_name) {
    formIsValid = false;
    alert("User name is a Required field");
    console.log("user name cannot be empty");
  }
  if (typeof this.state.emailid !== "undefined") {
      let lastAtPos = this.state.emailid.lastIndexOf("@");
      let lastDotPos = this.state.emailid.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.emailid.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          this.state.emailid.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        alert("Email ID is invalid");
        console.log("Email ID is not Valid");
      }
    }

    return formIsValid;
  }
    

    // state = {
    //     user_name: '',
    //     emailid:'',
    //     userpass:''
    // };

    // handleChange = ({ target }) => {
    //     const { name, value } = target;
    //     this.setState({ [name]: value });
    //   };
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
    
      submit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
    
        const payloaddata = {
          user_name: this.state.user_name,
          emailid: this.state.emailid,
          userpass: this.state.userpass,
          zipcode: this.state.zipcode

       // }

    // axios({
    //    url: '/usersignup',
    //    method: 'POST',
    //   data: payload
    //  })
    //     .then(() => {
    //       console.log('Data has been sent to the server');
    //        this.resetUserInputs();
    //     })
    //     .catch(() => {
    //       console.log('Internal server error');
    //     });;

      } 
      this.props.userRegister(payloaddata);    
     };
    }
        // resetUserInputs = () => {
        //   this.setState({
        //     user_name: '',
        //     emailid: '',
        //     userpass: '',
        //     zipcode:''

        //   });
        // };

       
    render(){
    

        return(
          <Provider store={store}>
        <div class="body">
<Header/>
               
<div class="row">
            <div class="column">
              <div class="container">
                <div class="login-form">
                 
                  <div class="main-div-ru">
                  <br/><br/><br/><br/> <br/><br/><br/><br/>
                    <div class="panel">
                <h1 class="heading" >User SignUp</h1>
                <br/>
              </div>
                <form >
                    
                    <input style={{borderRadius: '3px'}}
                    type="text" 
                    id="user_name" 
                    name="user_name"  placeholder="Username"
                    
                    onChange = {this.userChangeHandler}
                    /><br /><br />
                   
                    <input  style={{borderRadius: '3px'}}
                        type="text" 
                        id="emailid" 
                        name="emailid" placeholder="email ID"
                        
                        onChange = {this.emailChangeHandler}
                        /><br /><br />
                    
                    <input style={{borderRadius: '3px'}}
                        type="password" 
                        id="userpass" 
                        name="userpass" placeholder="Password"
                       
                        onChange = {this.passwordChangeHandler} /><br />
                   <br />
                   <input style={{borderRadius: '3px'}}
                        type="number" 
                        id="zipcode" 
                        name="zipcode" placeholder="Zipcode"
                        
                        onChange = {this.zipcodeChangeHandler} /><br />
                   <br />
                   
                   
                   <button onClick={this.submit} class="btn btn-primary">SignUp</button>
                   
                   <p className="text-center">
                    Have an account? <Link to="/UserLogin">Sign in</Link>
                  </p>

                </form>
                </div>
                <div class="signup signup-image"></div>
                </div>
</div>
            
            </div>
            </div>
            </div>
            {/* </div>
            </div> */}
            </Provider> 
        )
}
}
UserSignup.propTypes = {
  userRegister: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

  const mapStateToProps = state => ({
   user: state.register.user
  });

export default connect(mapStateToProps, { userRegister })(UserSignup);