import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Navbar from "../rNavbar";
import Rcurrentorder from "./rcurrentorder";
import Rcompleteorder from "./rcompleteorder";
import Rfinalstatus from "./rfinalstatus";
import Rorderdone from "./rorderdone";
import Rrejectedorder from "./rrejectedorder";
import axios from "axios";

// import Modal from 'react-modal';
class RViewOrder extends React.Component {
  constructor(props) {
    super();
    this.state = {
      order: [],
    };
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post("/rvieworder",data)
    // fetch("/rvieworder", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data) => {
        self.setState({ order: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  handleAccept(order_id) {
    return function () {
      const newdata = { order_id };
      console.log(newdata);
      axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios.post("/acceptorder",newdata)
      // fetch("/acceptorder", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newdata),
      // })
      .then(res => res.json());
    };
  }

  handleReject(order_id) {
    return function () {
      const newdata = { order_id };
      console.log("Reject", newdata);
      axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios.post("/rejectorder",newdata)

      // fetch("/rejectorder", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newdata),
      // })
      .then(res => res.json());
    };
  }

  handleClick(user_id) {
    return function () {
      console.log(user_id);
      localStorage.setItem("user_id", user_id);
      return <Redirect to="/uviewprofile" />;
    };
  }


  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div>
              <h1 className="heading-menu">Order</h1>
              <div className="container">
                <div>
                  <table className="tables">
                    <thead>
                      <tr className="tbl-header">
                        <th>Order ID</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Zipcode</th>
                        <th>Mode</th>
                        <th>Current Status</th>
                        <th>Accept Order</th>
                        <th>Reject Order</th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.state.order.map(order => (
                        <tr>
                          <td>{order.order_id}</td>
                          <Link to="/uviewprofile" onClick={this.handleClick(order.user_id)}>
                            <td>
                              {order.fullname}
                              {' '}
                            </td>
                          </Link>
                          <td>
                            {order.address}
                            {' '}
                          </td>
                          <td>{order.city}</td>
                          <td>{order.zipcode}</td>
                          <td>{order.deliverymode}</td>
                          <td>{order.status}</td>
                          <td>
                            <button
                              onClick={this.handleAccept(order.order_id)}
                            >
                              Accept Order
                            </button>
                          </td>
                          <td>

                            <button
                              onClick={this.handleReject(order.order_id)}
                            >
                              Reject Order
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Rcurrentorder />
              </div>
              <div>
                <Rcompleteorder />
              </div>
              <div>
                <Rfinalstatus />
              </div>
              <div>
                <Rorderdone />
              </div>
              <div>
                <Rrejectedorder />
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RViewOrder;
