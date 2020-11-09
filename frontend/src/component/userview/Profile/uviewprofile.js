import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";
import Navbar from "../uNavbar";

// import Modal from 'react-modal';
class UViewProfile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      bio: null,
      headline:null,
      fname: null,
      lname: null,
      dob:null,
      city: null,
      ustate:null,
      country:null,
      nick_name:null,
      emailid:null,
      mobile: null,
      address: null,
      favorites: null,
      myblog:null,
      things_ilove:null,
      find_me_in:null,
      file: null,
      profile: []
  };
  }
  componentDidMount() {
    const self = this;
   // const user_id = cookie.load("cookie1");
   const user_id = localStorage.getItem('user_id');
   axios.get(`/uviewprofile/${user_id}`)
     .then((response) => {
       if (response.status >= 400) {
         throw new Error("Bad response from server");
       }
       console.log(response);
       self.setState({ profile: [response.data.data] });
     })
     .catch((err) => {
       console.log("caught it!", err);
     });
 }


  render() {
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
                            alt="description"
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
                        <Moment format="D MMM YYYY">{userprofile.yelpingsince}</Moment>{" "}
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
export default UViewProfile;
