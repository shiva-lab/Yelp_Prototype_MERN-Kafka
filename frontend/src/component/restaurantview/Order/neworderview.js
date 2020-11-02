import React, { Component } from "react";
import axios from "axios";
import Navbar from "../rNavbar";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

// import Modal from 'react-modal';
class NewOrderView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      order: [],
      filter: "",
      updatestatus: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    //this.handleUpdate=this.handleUpdate(this)
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    fetch("/rvieworder", {
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

  
 
  handleUpdate(order_id) {
    return function () {
    console.log(order_id)
    var updatestatus = localStorage.getItem('orderupdatestatus')
    const newdata = {order_id,updatestatus};
    console.log(newdata);
    

      fetch("/neworderstatuschange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      }).then(res => res.json());{
        alert("status changed for order")
      }
    };
  }

  handleClick(user_id) {
    return function () {
      console.log(user_id);
      localStorage.setItem("user_id", user_id);
      return <Redirect to="/uviewprofilerest" />;
    };
  }

  render() {

    localStorage.setItem("orderupdatestatus",this.state.updatestatus)
    
    return (
      <div>
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
                      <option value="New order">New Order</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Completed">Completed</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Picked up">Picked Up</option>
                      <option value="Rejected">Rejected</option>
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
                            <th>Item Name</th>
                            <th>Delivery Mode</th>
                            <th>Current Status</th>
                            
                            <th>Pick Status</th>
                            <th>Change Status</th>
                            <th>View Details</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.order.map((order) => (
                            <tr>
                              <td>{order.ts}</td>
                              <td>{order.order_id}</td>
                              <Link to="/uviewprofilerest" onClick={this.handleClick(order.user_id)}>
                              <td>{order.fullname} </td> </Link>
                              <td>{order.address} </td>
                              <td>{order.city}</td>
                              <td>{order.zipcode}</td>
                              <td>{order.itemname}</td>
                              <td>{order.deliverymode}</td>
                              <td>{order.status}</td>
                              
                              <td>
                                <select
                                  value={this.state.value}
                                  onChange={this.handleChange}
                                  id="updatestatus"
                                  name="updatestatus"
                                  placeholder="updatestatus"
                                >
                                  <option>Update Status</option>

                                  <option value="In Progress">Preparing</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Picked up">Picked Up</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </td>
                              <td>
                              <button
                              onClick={this.handleUpdate(order.order_id)}
                            >
                              Change Status
                            </button>

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
export default NewOrderView;
