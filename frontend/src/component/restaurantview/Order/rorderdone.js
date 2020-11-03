import axios from "axios";
import React, { Component } from "react";

// import Modal from 'react-modal';
class ROrderDone extends React.Component {
  constructor(props) {
    super();
    this.state = {
      order: [],
    };
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post("/orderdone",data)
    // fetch("/orderdone", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data) => {
        self.setState({ order: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }


  render() {
    return (
      <div>
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div>
              <h1 className="heading-menu">Completed Orders</h1>
              <div className="container">
                <div>
                  <table className="tables">
                    <thead>
                      <tr className="tbl-header">
                        <th>Date/Time</th>
                        <th>Order ID</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Zipcode</th>
                        <th>Delivery Mode</th>
                        <th>Current Status</th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.state.order.map(order => (
                        <tr>
                          <td>{order.ts}</td>
                          <td>{order.order_id}</td>
                          <td>
                            {order.fullname}
                            {' '}
                          </td>
                          <td>
                            {order.address}
                            {' '}
                          </td>
                          <td>{order.city}</td>
                          <td>{order.zipcode}</td>
                          <td>{order.deliverymode}</td>
                          <td>{order.status}</td>

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
export default ROrderDone;
