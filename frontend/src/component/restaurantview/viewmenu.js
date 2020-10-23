import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';

import cookie from "react-cookies";
import Navbar from "./rNavbar";
// import Modal from 'react-modal';
class viewmenu extends React.Component {
  constructor(props) {
    super();
    this.state = {
      menu: [],
    };
  }


  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    fetch("/viewmenu", {
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
        console.log(data[0].menu)
        self.setState({ menu: data[0].menu });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  handleClick(item_id) {
    return function () {
      console.log(item_id);
      localStorage.setItem('item_id_menudetails', item_id);
      return <Redirect to="/editmenu" />;
    };
  }


  handleClickdelete(item_id) {
    return function () {
      const self = this;
      console.log(item_id);
      const newdata = { item_id };
      console.log(newdata);
      fetch("/deletefrommenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      }).then(res => res.json());
    };
  }


  render() {
    let redirectVar = null;

    if (!cookie.load("restaurant_id")) {
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
                            <th>Main Ingredients</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Edit Item</th>
                            <th>Delete Item</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.menu.map(food => (
                            <tr>
                              <td>
                                <img
                                  src={food.path}
                                  width={150}
                                  height={120}
                                  mode="fit"
                                />
                              </td>
                              <td>
                                {food.itemname}
                                {' '}
                              </td>
                              <td>
                                {food.ingredients}
                                {' '}
                              </td>
                              <td>{food.price}</td>
                              <td>{food.itemcategory}</td>
                              <td>
                                <Link to="/editmenu">
                                  <button onClick={this.handleClick(food.item_id)}>Edit</button>
                                </Link>
                              </td>
                              <td>
                                <Link>
                                  <button onClick={this.handleClickdelete(food.item_id)}>Delete</button>
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
export default viewmenu;
