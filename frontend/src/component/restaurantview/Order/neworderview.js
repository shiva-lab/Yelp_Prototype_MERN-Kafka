import React, { Component } from "react";
import axios from "axios";
import Navbar from "../rNavbar";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { paginate, pages } from "../../../helperFunctions/paginate";
import Moment from 'react-moment';
import 'moment-timezone';

// import Modal from 'react-modal';
class NewOrderView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      order: [],
      filter: "",
      updatestatus: "",
      filteredOrder: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    //this.handleUpdate=this.handleUpdate(this)
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post("/rvieworder", data).then((response) => {
      if (response.status === 200) {
        console.log("Printing response", response);
        console.log("Printing Event", response.data);
        this.setState({
          order: response.data,
          filteredOrder: paginate(response.data, 1, 10),
          pages: pages(response.data, 10),
        });
        console.log(pages);
      } else {
        console.log("error");
      }
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { filter: this.state.filter, restaurant_id };
    console.log("Data: ", data);
    const temp = this;
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.post("/filterorderrestsearch", data)
      .then((response) => {
        console.log("Filtered Data: ", response.data);
        temp.setState({ order: response.data });
      })
      .catch((err) => {
        console.log("caught it! - ERROR", err);
      });
  };

  handleUpdate(_id) {
    return function () {
      console.log(_id);
      var updatestatus = localStorage.getItem("orderupdatestatus");
      const newdata = { _id, updatestatus };
      console.log("New Data: ",newdata);
      //axios.defaults.withCredentials = true;
      // make a post request with the user data
      //axios.defaults.headers.common["authorization"] = localStorage.getItem('token');
      //axios.post("/neworderstatuschange",newdata)
      fetch("/neworderstatuschange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      })
      .then((res) => res.json());
      {
        alert("Order Status Changed");
      }
      // window.location.reload();
    };
  }

  handleClick(user_id, user_name) {
    return function () {
      console.log(user_id);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("user_name", user_name);
      return <Redirect to="/uviewprofilerest" />;
    };
  }

//Adding Pagination 
  paginatinon = (e) => {
    this.setState({
      filteredMenu: paginate(this.state.menu, e, 10),
    });
  };

 

  render() {
    localStorage.setItem("orderupdatestatus", this.state.updatestatus);

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

    let order = this.state.filteredOrder.map((order) => {
      return (
        <tr>
          <td><Moment>{order.ts}</Moment></td>
          <td>{order._id}</td>
          <Link to="/uviewprofilerest" onClick={this.handleClick(order.user_id,order.user_name)} >
             
            <td>{order.user_name} </td>{" "}
          </Link>

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
            <button className="btn btn-primary" onClick={this.handleUpdate(order._id)}>
              Change Status
            </button>
          </td>
        </tr>
      );
    });

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
                  <form onSubmit={this.submit}>&nbsp;
                  &nbsp;&nbsp;&nbsp;<select
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
                    </select> &nbsp;
                    <input
                      class="button-basic"
                      type="submit"
                      value="Submit"
                    ></input>
                  </form>
                  <br />
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
                            
                          </tr>
                        </thead>
                        <tbody>
                          {order}
                          <ul className="pagination">{links}</ul>
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
