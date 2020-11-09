import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import Navbar from "../../restaurantview/rNavbar";
import Moment from "react-moment";
import "moment-timezone";

class UViewProfileRest extends React.Component {
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
    axios.get(`/uviewprofile/${user_id}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        console.log(response.data)
        self.setState({ profile: [response.data.data] });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  handleClick() {
    return function () {
      var data = {
        chats: [],
        user1: {
          id: localStorage.getItem("restaurant_id"),
          name: localStorage.getItem("email"),
        },
        user2: {
          id: localStorage.getItem("user_id"),
          name: localStorage.getItem("user_name"),
        },
      };
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios.post("/createMessage", data)
          .then(response => {
              console.log("Message Created");
              window.location = '/rMessages';
          }
          ).catch(ex => {
              alert(ex);
          });
      };
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
                  <button class="ybtn ybtn--primary ybtn--small business-search-form_button" onClick={this.handleClick()}>Message</button>
                </div>
                <div>
                  <h1 className="heading-menu"> Profile</h1>
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
export default UViewProfileRest;
