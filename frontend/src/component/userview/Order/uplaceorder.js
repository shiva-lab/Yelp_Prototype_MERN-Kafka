import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import cookie from "react-cookies";
import { Redirect } from 'react-router';
import Placeorderform from "./placeorderform";
import Navbar from "../uNavbar";
import axios from "axios";

// import Modal from 'react-modal';
class UPlaceOrder extends React.Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
      data: []
    };
    //this.handlePrice = this.handlePrice.bind(this);
  }

  componentDidMount() {
    const self = this;
    const user_id = cookie.load('cookie1');
    // let restaurant_id = localStorage.getItem("restaurant_id");
    const data = { user_id };

    //axios.post("/uviewcart",data)
    fetch("/uviewcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        console.log(response)
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data - ID",data[0]._id)
        console.log("data",data[0]._id)

        self.setState({ items: data[0].cart });
        localStorage.setItem("order_id",data[0]._id)
      })
      .catch((err) => {
        console.log("caught it!", err);
      });

  }

  handleClick(itemid, itemname, restaurant_id, price, path, cart_id) {
    return function () {
      const self = this;
      const user_id = cookie.load('cookie1');
      console.log(itemid, itemname, restaurant_id, price, path, cart_id, user_id);
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
      fetch("/deletefromcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      }) .then((response) => {
        if (response.status== 200) {
          //throw new Error("Bad response from server");
          alert("Item deleted successfully")
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

  // handlePrice() {
  //   const self = this;
  //   const user_id = cookie.load('cookie1');
  //   const data = { user_id };
  //   return function () {
  //     fetch("/cartprice", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(data)
  //     })
  //       .then(response => response.json())
  //       .then(data => self.setState({ data }));
  //   };
  // }


  render() {
    // let redirectVar = null;

    // if (!cookie.load("cookie1")) {
    //   redirectVar = <Redirect to="/" />;
    // }
    return (
      // <div>
      //   {redirectVar}
      //   <div>
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
                          {this.state.items.map(item => (
                            <tr>
                              <td>
                                <img
                                  src={item.path}
                                  width={150}
                                  height={120}
                                  mode="fit"
                                />
                              </td>
                              <td>
                                {item.itemname}
                                {' '}
                              </td>
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
                      {/* <div className="cartbtn">
                        <button onClick={this.handlePrice()}>
                          Calculate Bill Amount
                        </button>
                      </div>

                      {this.state.data.map(amount => (
                        <h1 className="cartamount">
                        <br/>
                          Your Total Billing Amount: $
                          {amount.price}
                          <br/>
                        </h1>

                      ))}*/}
                    </div> 
                    <Placeorderform />
                  </div>
                </div>
              </div>
            </div>
          </div>
      //   </div>
      // </div>
    );
  }
}

export default UPlaceOrder;
