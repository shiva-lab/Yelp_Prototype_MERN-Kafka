import React, { Component } from "react";
import cookie from "react-cookies";
import { Link, Redirect } from 'react-router-dom';

import Navbar from "./uNavbar";

// import Modal from 'react-modal';
class uorderstatuscheck extends React.Component {
  constructor(props) {
    super();
    this.state = {
      order: [],
      filter: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const self = this;
    const order_id = cookie.load('order_id');
    const user_id = cookie.load('cookie1');
    const data = { order_id, user_id };
    fetch("/userorderstatus", {
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
        self.setState({ order: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick(order_id) {
    return function () {
      console.log(order_id);
      localStorage.setItem('order_id_details', order_id);
      return <Redirect to="/uorderdetails" />;
    };
  }

  handleReviewClick(order_id, restaurant_id, user_id) {
    return function () {
      console.log("OrderID:", order_id);
      localStorage.setItem('order_id_review', order_id);
      console.log("Restaurant ID:", restaurant_id);
      localStorage.setItem('restaurant_id_review', restaurant_id);
      console.log("User ID:", user_id);
      localStorage.setItem('user_id_review', user_id);
      return <Redirect to="/addreview" />;
    };
  }



  submit = (event) => {
    event.preventDefault();
    const data = { filter: this.state.filter };
    console.log("Testing");
    console.log(data);
    const temp = this;
    fetch("/filterordersearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      })
      .then(function (data) {
        console.log(data);
        temp.setState({ order: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  };


  render() {
    let redirectVar = null;

    if (!cookie.load("cookie1")) {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <div>
        {redirectVar}
        <div>
          <div>
            <Navbar />
            <div className="container">
              <div className="main-div-menu">
              
                <div className="panel" />
                
                <div>
                  <h1 className="heading-menu">Orders</h1>
                  <form onSubmit={this.submit}>
              <select
                value={this.state.value}
                onChange={this.handleChange}
                id="filter"
                name="filter"
                placeholder="filter"
              >
                <option>Filter</option>
                <option value="new order">New Order</option>
                <option value="In Progress">Preparing</option>
                <option value="Completed">Completed</option>
                <option value="Delivered">Delivered</option>
                <option value="Picked up">Picked Up</option>
              </select>
              <input
                class="btn btn-primary"
                type="submit"
                value="Submit"
              ></input>
            </form>
                  <div className="container">
                    <div>
                      <table className="tables">
                        <thead>
                          <tr className="tbl-header">
                            <th>Date/Time</th>
                            <th>Order ID</th>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Zipcode</th>
                            <th>Delivery Mode</th>
                            <th>Current Status</th>
                            <th>View Details</th>
                            <th>Rate/Review Order</th>

                          </tr>
                        </thead>
                        <tbody>
                          {this.state.order.map(order => (
                            <tr>
                              <td>{order.ts}</td>
                              <td>{order.order_id}</td>
                              <td>
                                {order.fullname}
                                {' '}
                              </td>
                              <td>
                                {order.address}
                                {' '}
                              </td>
                              <td>{order.city}</td>
                              <td>{order.zipcode}</td>
                              <td>{order.deliverymode}</td>
                              <td>{order.status}</td>
                              <td>
                                <Link to="/uorderdetails">
                                  <button
                                    onClick={this.handleClick(order.order_id)}
                                  >
                                    View Details
                                  </button>
                                </Link>
                              </td>
                              <td>
                                <Link to="/addreview">
                                  <button
                                    onClick={this.handleReviewClick(order.order_id, order.restaurant_id, order.user_id)}
                                  >
                                    Rate Order
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default uorderstatuscheck;
