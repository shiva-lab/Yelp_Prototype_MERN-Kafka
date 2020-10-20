import React, { Component } from "react";
import axios from "axios";
import Navbar from "../userview/uNavbar";
import cookie from "react-cookies";
import {Redirect} from 'react-router';

class uupdateprofile extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    bio: "",
    headline:"",
    fname: "",
    lname: "",
    dob:"",
    city: "",
    ustate:"",
    country:"",
    nick_name:"",
    emailid:"",
    mobile: "",
    address: "",
    favorites: "",
    myblog:"",
    things_ilove:"",
    find_me_in:"",

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
    let user_id = cookie.load('cookie1');
    console.log("userId:",user_id)

    const formData = new FormData();
    formData.append('myfile',this.state.file);
    formData.append('bio',this.state.bio)
    formData.append('headline', this.state.headline)
    formData.append('fname', this.state.fname)
    formData.append('lname',this.state.lname)
    formData.append('dob', this.state.dob)
    formData.append('city',this.state.city)
    formData.append('ustate',this.state.ustate)
    formData.append('country',this.state.country)
    formData.append('nick_name', this.state.nick_name)
    formData.append('mobile',this.state.mobile)
    formData.append('emailid',this.state.emailid)
    formData.append('address', this.state.address)
    formData.append('favorites',this.state.favorites)
    formData.append('myblog',this.state.myblog)
    formData.append('things_ilove',this.state.things_ilove)
    formData.append('find_me_in',this.state.find_me_in)

    formData.append('user_id',user_id)
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };

    axios.post("/uupdateprofile",formData,config)
    .then(response => {
      console.log("inside success")
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
          console.log("success", response)
          alert("User's Profile Updated Successfully !!")
          //window.location.reload();
          // console.log(response)
      }
  })
  .catch(err => {
      console.log("In error");
      console.log(err);
      alert("Update failed! Please try again", err)
  })
  };
  
  onChange(e) {
    this.setState({file:e.target.files[0]});
}

  // resetUserInputs = () => {
  //   this.setState({
  //     bio: "",
  //     fname: "",
  //     lname: "",
  //     mobile: "",
  //     city: "",
  //     address: "",
  //     favorites: "",
  //     profileimage: "",
      
  //     thingsilove:"",
  //     find_me_in:"",
  //     myblog:"",
  //     state:"",
  //     nick_name:"",
  //     headline:"",
  //     emailid:""
  //   });
  // };

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
      <div>
        <Navbar />

        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel"></div>
              <div>
                <h1 class="heading">User Profile Update</h1>
                <form onSubmit={this.submit}>
                  <br />
                  <textarea
                    style={{ borderRadius: "3px" }}
                    id="bio"
                    name="bio"
                    cols="30"
                    rows="10"
                    placeholder="A Brief Bio about your Yourself"
                    value={this.state.description}
                    onChange={this.handleChange}
                  required></textarea>
                  <br />
                  <br />

                  <input
                    type="text"
                    style={{ borderRadius: "3px" }}
                    id="headline"
                    name="headline"
                    placeholder="headline"
                    value={this.state.headline}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />

                  <input
                    type="text"
                    style={{ borderRadius: "3px" }}
                    id="fname"
                    name="fname"
                    placeholder="First Name"
                    value={this.state.fname}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />
                  <input
                    type="text"
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Last Name"
                    value={this.state.lname}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />
                  <lable>Date of Birth</lable>
                  <input
                    type="date"
                    style={{ borderRadius: "3px" }}

                    id="dob"
                    name="dob"
                    placeholder="Date of Birth"
                    value={this.state.dob}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />

                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={this.state.city}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />

                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="ustate"
                    name="ustate"
                    placeholder="State"
                    value={this.state.ustate}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />

                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="country"
                    name="country"
                    placeholder=" Country"
                    value={this.state.country}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />


                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="nick_name"
                    name="nick_name"
                    placeholder="Nick Name"
                    value={this.state.nick_name}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />


                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="emailid"
                    name="emailid"
                    placeholder="emailid"
                    value={this.state.emailid}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br/>

                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="mobile"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={this.state.mobile}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />

                  
                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="address"
                    name="address"
                    placeholder=" Address"
                    value={this.state.address}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />

                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="favorites"
                    name="favorites"
                    placeholder="Favorites"
                    value={this.state.favorites}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />


                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="myblog"
                    name="myblog"
                    placeholder="myblog"
                    value={this.state.myblog}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />


                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="things_ilove"
                    name="things_ilove"
                    placeholder="things_ilove"
                    value={this.state.things_ilove}
                    onChange={this.handleChange}
                  required/>
                  <br />
                  <br />

                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="find_me_in"
                    name="find_me_in"
                    placeholder="find_me_in"
                    value={this.state.find_me_in}
                    onChange={this.handleChange}
                  required/>
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
    );
  }
}
export default uupdateprofile;
