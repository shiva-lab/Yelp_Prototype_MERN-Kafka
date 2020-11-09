import React, { Component, useState } from "react";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import Navbar from "../uNavbar";
import { paginate, pages } from "../../../helperFunctions/paginate";
import axios from "axios";
import swal from "sweetalert2";

class UViewMenu extends React.Component {
  constructor(props) {
    super();
    this.state = {
      menu: [],
      filteredMenu: [],
    };
  }

  componentDidMount() {
    const restaurant_id = localStorage.getItem("restaurant_id_allrest");
    const data = { restaurant_id };
    const self = this;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.post("/uviewmenu", data).then((response) => {
      if (response.status === 200) {
        console.log("Printing response", response);
        console.log("Printing User Data", response.data.data[0].menu);
        this.setState({
          menu: response.data.data[0].menu,
          filteredMenu: paginate(response.data.data[0].menu, 1, 10),
          pages: pages(response.data.data[0].menu, 10),
        });
        console.log(pages);
      } else {
        console.log("error");
      }
    });
  }

  handleClick(_id, itemname, price, path) {
    return function () {
      const user_id = cookie.load("cookie1");
      const user_name = cookie.load("username");
      const restaurant_id = localStorage.getItem("restaurant_id_allrest");
      const restaurant_name = localStorage.getItem("restaurant_name_allrest");
      console.log(_id, itemname, restaurant_id,restaurant_name, price, path, user_name);
      const newdata = {
        _id,
        itemname,
        restaurant_id,
        restaurant_name,
        price,
        user_id,
        path,
        user_name,
      };
      console.log(newdata);
      var bearer = localStorage.getItem("token");
      console.log("Token :", bearer);
      axios.post("/addtocart", newdata)
        .then((response) => {
          if (response.status == 200) {
            swal.fire({
              title: "Success!",
              text: "Item Successfully Added",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          console.log("caught it!", err);
        });
    };
  }

  paginatinon = (e) => {
    this.setState({
      filteredMenu: paginate(this.state.menu, e, 10),
    });
  };

  render() {
    let redirectVar = null;

    if (!cookie.load("cookie1")) {
      redirectVar = <Redirect to="/" />;
    }
    let links = [];
    if (this.state.pages > 0) {
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

    let userdata = this.state.filteredMenu.map((item) => {
      return (
        <tr>
          <td>
            <img src={item.path} width={150} height={120} mode="fit" />
          </td>
          <td>{item.itemname} </td>
          <td>{item.Ingredients} </td>
          <td>{item.item_description} </td>
          <td>{item.price}</td>
          <td>{item.itemcategory}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={this.handleClick(
                item._id,
                item.itemname,
                item.price,
                item.path
              )}
            >
              Add to cart
            </button>
          </td>
        </tr>
      );
    });

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
                            <th>Ingredients</th>
                            <th>description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Add to cart</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userdata}
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

export default UViewMenu;
