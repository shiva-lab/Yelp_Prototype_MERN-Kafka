import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios"

import MapContainer from "../../userview/mapContainer";

import Navbar from "../../userview/uNavbar";

class RViewProfile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      resta: [],
    };
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id_allrest");
    const data = { restaurant_id };
    //axios.defaults.withCredentials = true;
    // make a post request with the user data
    //axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    //axios.post("/viewhome",data)
    var bearer = localStorage.getItem('token');
console.log('Token :', bearer)
    fetch("/viewhome", {
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
      .then((data) => {
        self.setState({
          latlng: data.map((d) => ({ latitude: d.lat, longitude: d.lng })),
        });
        self.setState({ resta: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  // handleClick(_id) {
  //   return function () {
  //     console.log(_id);
  //     localStorage.setItem("restaurant_id_allrest",_id);
  //     return <Redirect to="/uviewmenu" />;
  //   };
  // }

  handleReviewClick(_id, user_id) {
    return function () {
      console.log("Restaurant ID:",_id);
      localStorage.setItem("restaurant_id_review",_id);
      console.log("User ID:", user_id);
      localStorage.setItem("user_id_review", user_id);
      return <Redirect to="/addreview" />;
    };
  }

  render() {
    // let redirectVar = null;

    // if (!cookie.load("cookie1")) {
    //   redirectVar = <Redirect to="/" />;
    // }

    return (
      // <div>
      //   {redirectVar}
      //   <div>
      <div>
        <Navbar />
        <div className="body">
          {this.state.resta.map((food) => (
            <div className="row">
            
              <div>
                <div>
                <div>
                <br/>
                <img
                                      src={food.path}
                                      width={400}
                                      height={250}
                                      mode="fit"
                                    />
                                    <img
                                      src={food.path1}
                                      width={400}
                                      height={250}
                                      mode="fit"
                                    />  
                                    <img
                                      src={food.path2}
                                      width={400}
                                      height={250}
                                      mode="fit"
                                    /> 
                                    <img
                                      src={food.path3}
                                      width={400}
                                      height={250}
                                      mode="fit"
                                    /> 
                  </div>
                  <div className="login-form">
                  
                    <div className="main-div-ru">
                      <div>
                        <div>
                          

                          <div>
                            <table>
                              


                              <thead>
                                

                                <tr>
                                  <th className="profilepagefont">
                                  <h1><b><upper>{food.restaurantname}</upper> </b></h1>
                                  </th>
                                </tr>
                                <tr>
                                  <td>
                                  <Link to="/uviewmenu">
                                  <button
                                    className="btn btn-danger"
                                    onClick={()=>{ localStorage.getItem('restaurant_id_allrest');}}
                                  >
                                    View Menu
                                  </button>
                                </Link>
                                </td><td>
                                <Link to="/addreview">
                                  <button
                                    className="btn btn-danger"
                                    onClick={this.handleReviewClick(
                                      food._id,
                                      food.user_id
                                    )}
                                  >
                                    Rate Restaurant
                                  </button>
                                </Link>
                                </td>
                                </tr>

                                <tr>
                                  <th className="profilepagefont">Address</th>
                                  <td className="profiletdfont">
                                    {food.address}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="profilepagefont">City</th>
                                  <td className="profiletdfont">
                                    {food.location}{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="profilepagefont">Zipcode</th>
                                  <td className="profiletdfont">
                                    {food.zipcode}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="profilepagefont">
                                    Description
                                  </th>
                                  <td className="profiletdfont">
                                    {food.rdescription}{" "}
                                  </td>
                                </tr>

                                <tr>
                                  <th className="profilepagefont">Cuisine</th>
                                  <td className="profiletdfont">
                                    {food.cuisine}{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="profilepagefont">
                                    Mode Of delivery
                                  </th>
                                  <td className="profiletdfont">
                                    {food.modeofdelivery}{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="profilepagefont">
                                    Delivery Method{" "}
                                  </th>
                                  <td className="profiletdfont">
                                    {food.delivery_method}{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="profilepagefont">Timings</th>
                                  <td className="profiletdfont">
                                    {food.timings}
                                  </td>
                                </tr>

                                <tr>
                                  <th className="profilepagefont">Website</th>
                                  <td className="profiletdfont">
                                    {food.website}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="profilepagefont">Rating</th>
                                  <td className="profiletdfont">
                                    {food.rating}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="profilepagefont">
                                    Contact Number
                                  </th>
                                  <td className="profiletdfont">
                                    {food.contactinfo}{" "}
                                  </td>
                                </tr>
                                {/* <tr>
                          <th className="profilepagefont">Latitude</th>
                          <td className="profiletdfont">{food.lat} </td>
                        </tr>
                        <tr>
                          <th className="profilepagefont">Longitude</th>
                          <td className="profiletdfont">{food.lng} </td>
                        </tr> */}
                                <tr>
                                  <th className="profilepagefont">
                                    Email Address
                                  </th>
                                  <td className="profiletdfont">
                                    {food.Emailid}{" "}
                                  </td>
                                </tr>
                              </thead>
                              <tbody />
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="signup">
                    <div className="maparea">
                      <MapContainer latlng={this.state.latlng} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      //   </div>
      // </div>
    );
  }
}
export default RViewProfile;
