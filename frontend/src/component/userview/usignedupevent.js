import React, { Component } from "react";
import cookie from "react-cookies";
import { Card } from "react-bootstrap";
import { Redirect } from 'react-router';
import Navbar from "./uNavbar";

// import Modal from 'react-modal';
class usignedupevent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      eventdata: [],
    };
  }

  componentDidMount() {
    const self = this;
    const user_id = cookie.load("cookie1");
    const data = { user_id };
    fetch("/viewusersignedupevent", {
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
        self.setState({ eventdata: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  render() {
    let redirectVar = null;

    if (!cookie.load("cookie1")) {
      redirectVar = <Redirect to="/UserLogin" />;
    }
    return (
      <div>
        {redirectVar}
        <div>
          <div>
            <Navbar />
            <div>
              <h1 className="heading-menu">Events</h1>
            </div>
            <div className="container">
              <div className="main-div-menu">
                <div className="panel" />
                <div className="container">
                  {this.state.eventdata.map(newevent => (
                    <div className="cardclass">
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          height="180"
                          width="180"
                          src={newevent.path}
                        />
                        <Card.Body>
                          <Card.Title>
                            {newevent.eventname}
                          </Card.Title>
                          <h3>Details</h3>
                          <Card.Text>{newevent.eventdescription}</Card.Text>
                          <h3>Event Type</h3>
                          <Card.Text>{newevent.eventtype}</Card.Text>
                          <h3>Date</h3>
                          <Card.Text>{newevent.eventdate}</Card.Text>
                          <h3>Time</h3>
                          <Card.Text>{newevent.time}</Card.Text>
                          <h3>City</h3>
                          <Card.Text>{newevent.city}</Card.Text>
                          <h3>Hashtag</h3>
                          <Card.Text>{newevent.hashtag}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default usignedupevent;
