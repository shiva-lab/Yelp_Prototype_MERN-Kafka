import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from "../uNavbar";
//import axios from "axios";
//import PropTypes from "prop-types";
//import { connect } from "react-redux";
import { placeOrder } from "../../../redux/action/orderAction";
import store from "../../../redux/store";

import { Provider } from "react-redux";

class UPlaceOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      data: [],
      deliverymode: null,
    };
  }

  componentDidMount() {
    const user_id = cookie.load("cookie1");
    // let restaurant_id = localStorage.getItem("restaurant_id");
    const data = { user_id };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post("/uviewcart",data)
      .then((response) => {
        console.log(response);
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setState({ items: response.data.data[0].cart });
        localStorage.setItem("order_id", response.data.data[0]._id);
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick(itemid, itemname, restaurant_id, price, path, cart_id) {
    return function () {
      const self = this;
      const user_id = cookie.load("cookie1");
      console.log(
        itemid,
        itemname,
        restaurant_id,
        price,
        path,
        cart_id,
        user_id
      );
      const newdata = {
        itemid,
        itemname,
        restaurant_id,
        price,
        user_id,
        path,
        cart_id,
      };
      console.log(newdata);
      axios.post("/deletefromcart", newdata)
        .then((response) => {
          if (response.status == 200) {
            //throw new Error("Bad response from server");
            alert("Item deleted successfully");
          }
          // return response.json();
        })
        //   .then(res => {
        //     console.log("data")
        //    // console.log(data[0].menu)
        //  alert("Item added successfully")
        //   })
        .catch((err) => {
          console.log("caught it!", err);
        });
    };
  }

  submit = (event) => {
    event.preventDefault();
    let user_id = cookie.load("cookie1");
    console.log("user_id:", user_id)
    var order_id = localStorage.getItem("order_id");
    const payload = {
      deliverymode: this.state.deliverymode,
      order_id,
      user_id,
    };
    this.props.placeOrder(payload);
    // axios({
    //   url: "/createorder",
    //   method: "POST",
    //   data: payload,
    // })
    //   .then(function (response) {
    //     alert("Order Placed Successfully");
    //     console.log(response);
    //   })
    //   .catch(() => {
    //     console.log("Internal server error");
    //   });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div>
              <h1 className="heading-menu">Items in Cart</h1>
              <div className="container">
                <div>
                  <table className="tables">
                    <thead>
                      <tr className="tbl-header">
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>ID</th>
                        <th>Cart ID</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item) => (
                        <tr>
                          <td>
                            <img
                              src={item.path}
                              width={150}
                              height={120}
                              mode="fit"
                            />
                          </td>
                          <td>{item.itemname} </td>
                          <td>{item.price}</td>
                          <td>{item.itemid}</td>
                          <td>{item._id}</td>
                          <td>
                            <Link to="/uplaceorder">
                              <button
                                onClick={this.handleClick(
                                  item.itemid,
                                  item.itemname,
                                  item.restaurant_id,
                                  item.price,
                                  item.path,
                                  item.cart_id
                                )}
                              >
                                Delete Item
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div class="login-form">
                  <form onSubmit={this.submit}>
                    <select
                      value={this.state.value}
                      onChange={this.handleChange}
                      id="deliverymode"
                      name="deliverymode"
                      placeholder="deliverymode"
                    >
                      <option>Mode of Delivery</option>
                      <option value="Pickup">Pickup</option>
                      <option value="Delivery">Delivery</option>
                      <br />
                    </select>

                    <br />

                    <div>
                      <br />
                      <br />

                      <button
                        class="btn btn-primary"
                        type="submit"
                        value="submit"
                      >
                        <b>Place an Order</b>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  placeOrder: state.order.deliverymode
});

function mapDispatchToProps(dispatch) {
  return {
      placeOrder : (data) => dispatch(placeOrder(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UPlaceOrder);
//export default UPlaceOrder;