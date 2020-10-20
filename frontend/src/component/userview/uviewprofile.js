import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";
import Navbar from "./uNavbar";

// import Modal from 'react-modal';
class uviewprofile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profile: [],
    };
  }

  componentDidMount() {
    const self = this;
    // const user_id = cookie.load("cookie1");
    const user_id = localStorage.getItem('user_id');
    const data = { user_id };
    fetch("/uviewprofile", {
      method: "POST",
      headers: {
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
                    <h1 className="heading-menu">Your Profile</h1>
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
                          <td className="profiletdfont">{userprofile.emailid}</td>
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
export default uviewprofile;
