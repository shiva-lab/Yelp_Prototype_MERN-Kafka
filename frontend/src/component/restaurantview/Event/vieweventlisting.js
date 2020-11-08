import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { paginate, pages } from "../../../helperFunctions/paginate";
import axios from "axios";
import Navbar from "../rNavbar";

class ViewEventListing extends React.Component {
  constructor(props) {
    super();
    this.state = {
      eventview: [],
      filteredEvent: [],
    };
  }

  async componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.post("/vieweventlisting", data).then((response) => {
      if (response.status === 200) {
        console.log("Printing response", response);
        console.log("Printing Event", response.data);
        this.setState({
          eventview: response.data,
          filteredEvent: paginate(response.data, 1, 10),
          pages: pages(response.data, 10),
        });
        console.log(pages);
      } else {
        console.log("error");
      }
    });
  }

  paginatinon = (e) => {
    this.setState({
      filteredEvent: paginate(this.state.eventview, e, 10),
    });
  };

  handleClickevent(_id) {
    return function () {
      console.log(_id);
      localStorage.setItem("event_id_eventsignup", _id);
      console.log("redirecting");
      return <Redirect to="/vieweventsignup" />;
    };
  }

  render() {
    let links = [];
    if (this.state.pages > 0) {
      console.log(this.state.pages);
      for (let i = 1; i <= this.state.pages; i++) {
        links.push(
          <li className="page-item" key={i}>
            <a
              className="page-link"
              onClick={() => {
                this.paginatinon(i);
              }}
            >
              {i}
            </a>
          </li>
        );
      }
    }

    let event = this.state.filteredEvent.map((event) => {
      return (
        <tr>
          <td>{event.eventname} </td>
          <td>
            <td>
              <img src={event.path} width={150} height={120} mode="fit" />
            </td>
          </td>
          <td>{event.eventdescription} </td>
          <td>{event.date} </td>
          <td>{event.time} </td>
          <td>{event.address} </td>

          <Link to="/vieweventsignup">
            <td>
              <button onClick={this.handleClickevent(event._id)}>
                Signup Details
              </button>
            </td>
          </Link>
        </tr>
      );
    });

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
                {event}
                <ul className="pagination">{links}</ul>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewEventListing;
