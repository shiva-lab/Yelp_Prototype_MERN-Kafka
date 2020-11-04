import React, { Component } from "react";
import cookie from "react-cookies";
import { Link, Redirect } from 'react-router-dom';
import { Card } from "react-bootstrap";
import Navbar from "../uNavbar";
//import MapContainer from '../mapContainer';

// import Modal from 'react-modal';
class ViewEventDetails extends React.Component {
  constructor(props) {
    super();
    this.state = {
      eventlist: [],
    };
  }

  componentDidMount() {
    const self = this;
    const event_id = localStorage.getItem("event_id_selected");
    
    const data = {event_id};
    fetch("/vieweventdetails", {
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
        //self.setState({ latlng: data.map(d => ({ latitude: d.lat, longitude: d.lng })) });
        self.setState({ eventlist: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }
  handleClick(_id, restaurant_id) {
    return function () {
      const user_id = cookie.load('cookie1');
      console.log(_id, restaurant_id, user_id);
      const username = cookie.load('username');
      const Emailid=localStorage.getItem('email');
      const newdata = {
        user_id,
        restaurant_id,
        _id,
        username,
        Emailid

      };
      console.log(newdata);
      fetch("/eventsignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      }).then(response => {
        console.log("inside success")
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
            console.log("success", response)
            alert("successfully registered for event")
           // window.location.reload();
            // console.log(response)
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

    // if (!cookie.load("restaurant_id")) {
    //   redirectVar = <Redirect to="/" />;
    // }
    return (

        <div>
        <Navbar />
        <div>
          <h1 className="heading-menu">Events</h1>
        </div>
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div className="container">
              {this.state.eventlist.map(eve => (
                <div className="cardclass">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      height="180"
                      width="180"
                      src={eve.path}
                    />
                    <Card.Body>
                      <Card.Title>
                        {eve.eventname}
                      </Card.Title>
                      <h3>Details</h3>
                      <Card.Text>{eve.eventdescription}</Card.Text>
                      <h3>Event Type</h3>
                      <Card.Text>{eve.eventtype}</Card.Text>
                      <h3>Date</h3>
                      <Card.Text>{eve.date}</Card.Text>
                      <h3>Time</h3>
                      <Card.Text>{eve.time}</Card.Text>
                      <h3>City</h3>
                      <Card.Text>{eve.city}</Card.Text>
                      <h3>Registered User</h3>
                      <Card.Text>{eve.city}</Card.Text>
                      <h3>Hashtag</h3>
                      <Card.Text>{eve.hashtag}</Card.Text>
                      <h3>Sign Up Count</h3>
                      <Card.Text>{eve.signupcount}</Card.Text>
                      <div>

                      <Link to="/viewevent">
                    <button
                      class="ybtn ybtn--primary ybtn--small business-search-form_button"
                      value="submit" 
                    >
                      {" "}
                    Back
                    
                    </button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;
                  <Link> <button
                              onClick={this.handleClick(eve._id, eve.restaurant_id)}
                            >
                              Sign Up
                            </button>
                          </Link>
            
                    </div>
                    </Card.Body>

                  </Card>
                </div>
                
                
              ))}
              
            </div>
          </div>
        </div>
      </div>
   
);


  }
}
export default ViewEventDetails;
