import Axios from "axios";
import React, { Component } from "react";
import cookie from "react-cookies";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "../uNavbar";
import Moment from "react-moment";
import "moment-timezone";
import { paginate, pages } from "../../../helperFunctions/paginate";

class UOrderStatusCheck extends React.Component {
  constructor(props) {
    super();
    this.state = {
      order: [],
      filter: "",
      filteredOrder: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const self = this;
    const order_id = cookie.load("order_id");
    const user_id = cookie.load("cookie1");
    const data = { order_id, user_id };
    axios.post("/userorderstatus", data).then((response) => {
      if (response.status === 200) {
        console.log("Printing response", response);
        console.log("Printing  List", response.data);
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

  handleClick(_id) {
    return function () {
      console.log(_id);
      localStorage.setItem("order_id_details", _id);
      return <Redirect to="/uorderdetails" />;
    };
  }

  handleReviewClick(order_id, restaurant_id, user_id) {
    return function () {
      console.log("OrderID:", order_id);
      localStorage.setItem("order_id_review", order_id);
      console.log("Restaurant ID:", restaurant_id);
      localStorage.setItem("restaurant_id_review", restaurant_id);
      console.log("User ID:", user_id);
      localStorage.setItem("user_id_review", user_id);
      return <Redirect to="/addreview" />;
    };
  }

  submit = (event) => {
    event.preventDefault();
    const user_id = cookie.load("cookie1");
    const data = { filter: this.state.filter, user_id };
    console.log("Testing", data);
    console.log("Sending this data to backend", data);
    const temp = this;
    axios.post("/filterordersearch", data).then((response) => {
      if (response.status === 200) {
        console.log("Printing response", response);
        console.log("Printing Event List", response.data);
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
  };

  sortAscending = () => {
    const self = this;
    const order_id = cookie.load("order_id");
    const user_id = cookie.load("cookie1");
    const data = { order_id, user_id };
    axios.post("/userorderstatus", data).then((response) => {
      if (response.status === 200) {
        console.log("Printing response", response);
        console.log("Printing Event List", response.data);
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
  };

  sortDescending = () => {
    const self = this;
    const order_id = cookie.load("order_id");
    const user_id = cookie.load("cookie1");
    const data = { order_id, user_id };
    axios.post("/userorderstatusdesc", data).then((response) => {
      if (response.status === 200) {
        console.log("Printing response", response);
        console.log("Printing Event List", response.data);
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
  };

  paginatinon = (e) => {
    this.setState({
      filteredOrder: paginate(this.state.order, e, 10),
    });
  };

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

    let orderdata = this.state.filteredOrder.map((order) => {
      return (
        <tr>
          <td>
            <Moment format="D MMM YYYY HH:MM">{order.ts}</Moment>
          </td>
          <td>{order._id}</td>
          <td>{order.restaurant_name}</td>

          <td>{order.deliverymode}</td>
          <td>{order.orderstatus}</td>
          <td>
            <Link to="/uorderdetails">
              <button onClick={this.handleClick(order._id)}>
                View Details
              </button>
            </Link>
          </td>
          <td>
            <Link to="/addreview">
              <button
                onClick={this.handleReviewClick(
                  order._id,
                  order.restaurant_id,
                  order.user_id
                )}
              >
                Rate Order
              </button>
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />

            <div>
              <h1 className="heading-menu">Orders</h1>
              <button onClick={this.sortAscending}>Asc</button>
              <button onClick={this.sortDescending}>Desc</button>
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
                  <option value="Accepted">Recieved</option>
                  <option value="In Progress">Preparing</option>
                  <option value="On the way">On the way </option>
                  <option value="Delivered">Delivered</option>
                  <option value="Pickup ready">Pick Up Reday</option>
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
                        <th>Restaurant Name</th>
                        <th>Delivery Mode</th>
                        <th>Current Status</th>
                        <th>View Details</th>
                        <th>Rate/Review Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderdata}
                      <ul className="pagination">{links}</ul>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UOrderStatusCheck;
