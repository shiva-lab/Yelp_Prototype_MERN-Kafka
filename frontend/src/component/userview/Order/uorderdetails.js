import axios from "axios";
import React, { Component, useState } from "react";
import cookie from "react-cookies";
import Navbar from "../uNavbar";

class UOrderDetails extends React.Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const self = this;
    const order_id = localStorage.getItem("order_id_details");
    axios.get(`/uorderdetails/${order_id}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        self.setState({ items: response.data.data[0].cart });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }


  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div>
              <h1 className="heading-menu">Order Details</h1>
              <div className="container">
                <div>
                  <table className="tables">
                    <thead>
                      <tr className="tbl-header">
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Price</th>
                        

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
    );
  }
}

export default UOrderDetails;
