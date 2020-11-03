import React, { Component } from "react";
import Navbar from "../rNavbar";
import { Link, Redirect } from 'react-router-dom';
import { paginate, pages } from '../../../helperFunctions/paginate'
import axios from 'axios';  

// import Modal from 'react-modal';
class ViewEventSignup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      eventview: [],
      filteredUserList: []
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const event_id = localStorage.getItem("event_id_eventsignup");
    const data = { restaurant_id, event_id };
    // make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post("/vieweventsignup", data)
    .then(response => {
      if (response.status === 200) {
        console.log("Printing response",response)
        console.log("Printing Menu",response.data)
          this.setState({
            eventview: response.data,
            filteredUserList : paginate(response.data,1,10),
            pages: pages(response.data, 10)

          })
          console.log(pages);
      } else {
          console.log("error");
      }
  });
  }

  paginatinon = (e) => {
    this.setState({
      filteredUserList: paginate(this.state.eventview,e, 10)
    })
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
export default ViewEventSignup;
