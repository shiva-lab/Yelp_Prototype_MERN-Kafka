import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import Navbar from "../uNavbar";
import { paginate, pages } from "../../../helperFunctions/paginate";
import swal from "sweetalert2";
import Moment from "react-moment";
import "moment-timezone";

class ViewEvent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      eventdata: [],
      filteredEvent: [],
      searcheve: "",
    };
    this.searcheveHandler = this.searcheveHandler.bind(this);
  }
  searcheveHandler = (e) => {
    console.log("Inside search event change handler");
    this.setState({
      searcheve: e.target.value,
    });
  };

  viewdetailsHandler(_id) {
    return function () {
      console.log("event ID:", _id);
      localStorage.setItem("event_id_selected", _id);
      return <Redirect to="/vieweventdetails" />;
    };
  }
  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.get("/viewevent", data).then((response) => {
      if (response.status === 200) {
        console.log("Printing response", response);
        console.log("Printing Event List", response.data);
        this.setState({
          eventdata: response.data,
          filteredEvent: paginate(response.data, 1, 10),
          pages: pages(response.data, 10),
        });
        console.log(pages);
      } else {
        console.log("error");
      }
    });
  }

  handleClick(_id, restaurant_id) {
    return function () {
      const user_id = cookie.load("cookie1");
      console.log(_id, restaurant_id, user_id);
      const username = cookie.load("username");
      const Emailid = localStorage.getItem("email");
      const newdata = {
        user_id,
        restaurant_id,
        _id,
        username,
        Emailid,
      };
      console.log(newdata);
      var bearer = localStorage.getItem("token");
      console.log("Token :", bearer);
      fetch("/eventsignup", {
        method: "POST",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      })
        .then((response) => {
          console.log("inside success");
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("success", response);

            swal.fire({
              title: "Success!",
              text: "Successfully registered for Event",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          console.log("In error");
          console.log(err);
          alert("Failed", "Update failed! Please try again", err);
        });
    };
  }
  paginatinon = (e) => {
    this.setState({
      filteredEvent: paginate(this.state.eventdata, e, 10),
    });
  };

  sortDescending = () => {
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.get("/viewevent", data).then((response) => {
      if (response.status === 200) {
        console.log("Printing response", response);
        console.log("Printing Event List", response.data);
        this.setState({
          eventdata: response.data,
          filteredEvent: paginate(response.data, 1, 10),
          pages: pages(response.data, 10),
        });
        console.log(pages);
      } else {
        console.log("error");
      }
    });
  };

  sortAscending = () => {
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.get("/vieweventasc", data).then((response) => {
      if (response.status === 200) {
        console.log("Printing response", response);
        console.log("Printing Event List", response.data);
        this.setState({
          eventdata: response.data,
          filteredEvent: paginate(response.data, 1, 10),
          pages: pages(response.data, 10),
        });
        console.log(pages);
      } else {
        console.log("error");
      }
    });
  };

  render() {
    localStorage.setItem("searcheve", this.state.searcheve);
    let redirectVar = null;
    if (!cookie.load("cookie1")) {
      redirectVar = <Redirect to="/" />;
    }

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

          <td>{event.eventdescription} </td>
          <td>
            <Moment format="D MMM YYYY">{event.date}</Moment>{" "}
          </td>
          <td>{event.time} </td>
          <td>{event.address}</td>
          <td>
            <Link>
              <button
                onClick={this.handleClick(event._id, event.restaurant_id)}
              >
                Sign Up
              </button>
            </Link>
          </td>

          <td>
            <Link to="/vieweventdetails">
              <button onClick={this.viewdetailsHandler(event._id)}>
                View Details
              </button>
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <div>
        {redirectVar}
        <div>
          <div>
            <Navbar />

            <div className="container">
              <h1 className="heading-menu"> Events</h1>
              <br />
              <br />
              <label>
                <div>
                  <span class="pseudo-input_field-holder">
                    <input
                      autocomplete="off"
                      id="dropperText_Mast"
                      maxlength="80"
                      name="search"
                      placeholder="Event Name"
                      onChange={this.searcheveHandler}
                    />
                    <input type="hidden" name="ns" value="1" />
                  </span>
                  <Link to="/searchevent">
                    <button
                      class="ybtn ybtn--primary ybtn--small business-search-form_button"
                      value="submit"
                    >
                      {" "}
                      Search
                      <span class="main-search_action-icon-wrap js-search-icon-wrap">
                        <span
                          aria-hidden="true"
                          styles="width: 24px; height: 24px;"
                        ></span>
                      </span>
                    </button>
                  </Link>
                </div>
              </label>
              <button onClick={this.sortDescending}>Decending</button>
              <button onClick={this.sortAscending}> Ascending</button>
              <br />
              <br />

              <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                  <thead>
                    <tr className="tbl-header">
                      <th>Event Name</th>

                      <th>Event Description</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Address</th>
                      <th>Sign Up</th>
                      <th>View Details</th>
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
        </div>
      </div>
    );
  }
}
export default ViewEvent;
