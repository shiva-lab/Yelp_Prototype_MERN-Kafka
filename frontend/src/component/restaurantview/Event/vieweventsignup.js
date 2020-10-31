import React, { Component } from "react";
import Navbar from "../rNavbar";
import { Link, Redirect } from 'react-router-dom';

// import Modal from 'react-modal';
class vieweventsignup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      eventview: [],
    };
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const event_id = localStorage.getItem("event_id_eventsignup");
    const data = { restaurant_id, event_id };
    fetch("/vieweventsignup", {
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
        console.log(data[0].eventview)
        self.setState({ eventview: data[0].eventview });
       // self.setState({ eventview: data[0]});
        
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  handleClick(user_id) {
    return function () {
      console.log(user_id);
      localStorage.setItem("user_id", user_id);
      return <Redirect to="/uviewprofilerest" />;
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1 className="heading-menu"> List of users signedup for the event</h1>
          <div className="panel panel-default p50 uth-panel">
            <table className="table table-hover">
              <thead>
                <tr className="tbl-header">
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>User Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.eventview.map(event => (
                  <tr>
                    <td>
                      {event.fname}
                      {' '}
                    </td>
                    <td>
                      {event.lname}
                      {' '}
                    </td>
                    <Link to="/uviewprofilerest" onClick={this.handleClick(event.user_id)}>
                    <td>
                      {event.user_name}
                      {' '}
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
export default vieweventsignup;
