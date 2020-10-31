import React, { Component, useState } from "react";
import { Redirect } from 'react-router';
import cookie from "react-cookies";
import Navbar from "../uNavbar";

// import Modal from 'react-modal';
class uviewmenu extends React.Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id_allrest");
    const data = { restaurant_id };
    fetch("/uviewmenu", {
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
        console.log("data")
        console.log(data)
        self.setState({ items: data});
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }


  handleClick(_id, itemname, restaurant_id, price, path) {
    return function () {
      const user_id = cookie.load('cookie1');
      console.log(_id, itemname, restaurant_id, price, path);
      const newdata = {
        _id,
        itemname,
        restaurant_id,
        price,
        user_id,
        path
      };
      console.log(newdata);
      fetch("/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      })      .then((response) => {
        if (response.status== 200) {
          //throw new Error("Bad response from server");
          alert("Item added successfully")
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
  }

  }


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
                  <h1 className="heading-menu">Restaurant Menu</h1>
                  <div className="container">
                    <div>
                      <table className="tables">
                        <thead>
                          <tr className="tbl-header">
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Add to cart</th>
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
                              <td>
                                {item.item_description}
                                {' '}
                              </td>
                              <td>{item.price}</td>
                              <td>{item.itemcategory}</td>
                              <td>
                                <button
                                  onClick={this.handleClick(item._id, item.itemname, item.restaurant_id, item.price, item.path)}
                                >
                                  Add to cart
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

export default uviewmenu;
