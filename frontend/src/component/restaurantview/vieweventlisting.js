import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Navbar from "./rNavbar";

// import Modal from 'react-modal';
class vieweventlisting extends React.Component {
  constructor(props) {
    super();
    this.state = {
      eventview: [],
    };
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    fetch("/vieweventlisting", {
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
        self.setState({ eventview: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  handleClickevent(_id) {
    return function () {
      console.log(_id);
      localStorage.setItem("event_id_eventsignup",_id);
      console.log("redirecting");
      return <Redirect to="/vieweventsignup" />;
    };
  }


  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1 className="heading-menu"> Event List</h1>
          <div className="panel panel-default p50 uth-panel">
            <table className="table table-hover">
              <thead>
                <tr className="tbl-header">
                  <th>Event Name</th>
                  <th>Event Image</th>
                  <th>Event Description</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Address</th>
                  <th>Signup Details</th>
                  
                </tr>
              </thead>
              <tbody>
                {this.state.eventview.map(event => (
                  <tr>
                    <td>
                      {event.eventname}
                      {' '}
                    </td>
                    <td>
                    <td>
                                <img
                                  src={event.path}
                                  width={150}
                                  height={120}
                                  mode="fit"
                                />
                              </td>
                    </td>
                    <td>
                      {event.eventdescription}
                      {' '}
                    </td>
                    <td>
                      {event.date}
                      {' '}
                    </td>
                    <td>
                      {event.time}
                      {' '}
                    </td>
                    <td>
                      {event.address}
                      {' '}
                    </td>

                    <Link to="/vieweventsignup">
                      <td>
                        <button onClick={this.handleClickevent(event._id)}>
                          Signup Details
                        </button>
                      </td>
                    </Link>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default vieweventlisting;
