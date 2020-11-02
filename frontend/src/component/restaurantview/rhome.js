import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from "./rNavbar";
import MapContainer from "../userview/mapContainer";

// import Modal from 'react-modal';
class RHome extends React.Component {
  constructor(props) {
    super();
    this.state = {
      resta: [],
    };
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    fetch("/viewhome", {
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
      .then((data) => {
        console.log(data);
        self.setState({
          latlng: data.map((d) => ({ latitude: d.lat, longitude: d.lng })),
        });
        self.setState({ resta: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  render() {
    let redirectVar = null;

    if (!cookie.load("restaurant_id")) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        <div>
          <div className="body">
            <Navbar />

            {this.state.resta.map((food) => (
              <div className="row">
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
                  
                    <div className="login-form">
                      <div className="main-div-ru">
                        <div>
                          <div>
                            <br />
                            <br />
                            <br />

                            <div>
                              <table>
                                <thead>
                                  <tr>
                                    <th className="profilepagefont">
                                      Restaurant Name
                                    </th>
                                    <td className="profiletdfont">
                                      <b>{food.restaurantname} </b>
                                    </td>
                                  </tr>

                                  {/* <tr>
                                    <th className="profilepagefont">
                                      Restaurant Image
                                    </th>
                                    <td>
                                      <img
                                        src={food.path}
                                        width={200}
                                        height={200}
                                        mode="fit"
                                      />
                                    </td>{" "}
                                    <br />
                                  </tr> */}

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
                                    <th className="profilepagefont">
                                      Contact Number
                                    </th>
                                    <td className="profiletdfont">
                                      {food.contactinfo}{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="profilepagefont">
                                      Latitude
                                    </th>
                                    <td className="profiletdfont">
                                      {food.lat}{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="profilepagefont">
                                      Longitude
                                    </th>
                                    <td className="profiletdfont">
                                      {food.lng}{" "}
                                    </td>
                                  </tr>

                                  <tr>
                                    <th className="profilepagefont">Rating</th>
                                    <td className="profiletdfont">
                                      {food.rating}
                                    </td>
                                  </tr>
                                  <tr />

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
      </div>
    );
  }
}
export default RHome;
