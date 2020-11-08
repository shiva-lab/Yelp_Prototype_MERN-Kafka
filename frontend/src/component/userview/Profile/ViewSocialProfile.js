import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Navbar from "../uNavbar";
import axios from 'axios'
import swal from 'sweetalert2';

// import Modal from 'react-modal';
class ViewSocialProfile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profile: [],
    };
  }
  componentDidMount() {
    const self = this;
    // const user_id = cookie.load("cookie1");
    const user_id = localStorage.getItem('user_id_profileview');
    const data = { user_id };
    var bearer = localStorage.getItem('token');
console.log('Token :', bearer)
    fetch("/uviewprofile", {
      method: "POST",
      headers: {
        'Authorization': bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        self.setState({ profile: response });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  FollowUserHandler(_id,fname,lname,city,Emailid,headline) {
    return function () {
      const user_id = localStorage.getItem('user_id');
      console.log(_id,user_id,);
      const newdata = {_id, user_id,fname,lname,city,Emailid,headline};
      console.log(newdata);
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios.post('/followuserprofile',newdata)
      .then(response => {
        console.log("inside success")
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
            console.log("success", response)
            //alert("Success Following User")
            swal.fire({
              title: 'Success!',
              text: 'Successfully Followed User',
              icon: 'success'
            })
            //window.location.reload();
        }
    })
    .catch(err => {
        console.log("In error");
        console.log(err);
        alert("Failed","Update failed! Please try again", err)
    })
    };
  }


  render() {
    // let redirectVar = null;
    // if (!cookie.load("cookie1")) {
    //   redirectVar = <Redirect to="/" />;
    // }
    return (
      <div>
        {/* {redirectVar} */}
        <div>
          <div>
            <Navbar />
            <div className="container">
              {this.state.profile.map(userprofile => (
                <div className="main-div-menu">
                  <div className="panel" />
                  <div>
                    <h1 className="heading-menu">User Profile</h1>
                    <div className="container" />
                    <table>
                      <thead>
                        <tr>
                          <th className="profilepagefont">First Name</th>
                          <td className="profiletdfont">
                            <b>
                              {userprofile.fname}
                              {' '}
                            </b>
                          </td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Last Name</th>
                          <td className="profiletdfont">
                            <b>
                              {userprofile.lname}
                              {' '}
                            </b>
                          </td>
                        </tr>

                        <tr>
                          <th className="profilepagefont"> Profile Image</th>
                          <td>
                            <img
                              src={userprofile.path}
                              width={200}
                              height={200}
                              mode="fit"
                            />
                          </td>
                        </tr>

                        <tr>
                          <th className="profilepagefont">Email ID</th>
                          <td className="profiletdfont">{userprofile.Emailid}</td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">City</th>
                          <td className="profiletdfont">
                            {userprofile.city}
                            {' '}
                          </td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Zipcode</th>
                          <td className="profiletdfont">{userprofile.zipcode}</td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Description</th>
                          <td className="profiletdfont">
                            {userprofile.bio}
                            {' '}
                          </td>
                        </tr>

                        <tr>
                          <th className="profilepagefont">Username</th>
                          <td className="profiletdfont">
                            {userprofile.user_name}
                            {' '}
                          </td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Nick Name</th>
                          <td className="profiletdfont">
                            {userprofile.nick_name}
                            {' '}
                          </td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Favorites</th>
                          <td className="profiletdfont">
                            {userprofile.favorites}
                            {' '}
                          </td>
                        </tr>

                        <tr>
                          <th className="profilepagefont">Website/MyBlog</th>
                          <td className="profiletdfont">{userprofile.myblog}</td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Contact Number</th>
                          <td className="profiletdfont">
                            {userprofile.mobile}
                            {' '}
                          </td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Yelping Since</th>
                          <td className="profiletdfont">
                            {userprofile.yelpingsince}
                            {' '}
                          </td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Things I love</th>
                          <td className="profiletdfont">
                            {userprofile.things_ilove}
                            {' '}
                          </td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Headline</th>
                          <td className="profiletdfont">
                            {userprofile.headline}
                            {' '}
                          </td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Date of Birth</th>
                          <td className="profiletdfont">
                            {userprofile.dob}
                            {' '}
                          </td>
                        </tr>
                       
                        <tr>
                          <th className="profilepagefont">State</th>
                          <td className="profiletdfont">
                            {userprofile.ustate}
                            {' '}
                          </td>
                          </tr>
                          <tr>
                          <th className="profilepagefont">Follow</th>
                          <td>
                          <Link>
                            <button
                             onClick={this.FollowUserHandler(userprofile._id,userprofile.fname,userprofile.lname,userprofile.city,userprofile.Emailid, userprofile.headline)}
                    
                            >
                              Follow
                            </button>
                          </Link>
                        </td>
                        </tr>
                      </thead>
                      <tbody />
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewSocialProfile;
