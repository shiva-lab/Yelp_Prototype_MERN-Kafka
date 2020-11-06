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
    //axios.defaults.withCredentials = true;
    // make a post request with the user data
    //axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    
  // axios.post("/rvieworder",data)
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
        
        console.log(data)

        console.log("hhiiiii");
        console.log(data[0].cart[0].itemname)
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
    const restaurant_id = localStorage.getItem('restaurant_id');
    const data = { filter: this.state.filter,restaurant_id };
    console.log("Testing");
    console.log(data);
    const temp = this;
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  
    axios.post("/filterorderrestsearch",data)
    .then((response) => {
      console.log("Filtered Data: ", response.data)
      temp.setState({ order: response.data });
    })
    .catch((err) => {
      console.log("caught it! - ERROR", err);
    });
};

  
 
  handleUpdate(_id) {
    return function () {
    console.log(_id)
    var updatestatus = localStorage.getItem('orderupdatestatus')
    const newdata = {_id,updatestatus};
    console.log(newdata);
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    
//axios.post("/neworderstatuschange",newdata)
fetch("/neworderstatuschange", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newdata),
})
      .then(res => res.json());{
        alert("status changed for order")
      }
     // window.location.reload();
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
                      <option value="new order">New Order</option>
                      <option value="Preparing">Preparing</option>
                      {/* <option value="Completed">Completed</option> */}
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
                            <th>UserName</th>
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
                              <td>{order._id}</td>
                              <Link to="/uviewprofilerest" onClick={this.handleClick(order.user_id)}>
                              <td>{order.user_name} </td> </Link>
                      
                              <td>{order.cart[0].itemname}</td>
                              <td>{order.deliverymode}</td>
                              <td>{order.orderstatus}</td>
                              
                              <td>
                                <select
                                  value={this.state.value}
                                  onChange={this.handleChange}
                                  id="updatestatus"
                                  name="updatestatus"
                                  placeholder="updatestatus"
                                >
                                  <option>Update Status</option>
                                  <option value="Accepted">Accepted</option>
                                  <option value="In Progress">Preparing</option>
                                  <option value="On the way">On the way </option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Pickup ready">Pick Up Reday</option>
                                  <option value="Picked up">Picked Up</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </td>
                             
                              <td>
                              <button
                              onClick={this.handleUpdate(order._id)}
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
