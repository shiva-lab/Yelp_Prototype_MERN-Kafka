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
    const data = { order_id };
    var bearer = localStorage.getItem('token');
    console.log('Token :', bearer)
    fetch("/uorderdetails", {
      method: "POST",
      headers: {
        'Authorization': bearer,
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
        console.log("Data: ",data[0].cart);
        self.setState({ items: data[0].cart });
      })
      .catch((err) => {
        console.log("Error - Caught it!", err);
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
