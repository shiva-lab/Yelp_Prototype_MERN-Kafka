import axios from "axios";
import React, { Component } from "react";

// import Modal from 'react-modal';
class RCurrentOrder extends React.Component {
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
    // fetch("/rcurrentorder", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    axios.post("/rcurrentorder",data)
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

  handleComplete(order_id) {
    return function () {
      const newdata = { order_id };
      console.log(newdata);

      // fetch("/orderinprogress", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newdata),
      // })
      axios.post("/orderinprogress",newdata)
      .then(res => res.json());
    };
  }


  render() {
    return (
      <div>
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div>
              <h1 className="heading-menu">Current Order</h1>
              <div className="container">
                <div>
                  <table className="tables">
                    <thead>
                      <tr className="tbl-header">
                        <th>Order ID</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Zipcode</th>
                        <th>City</th>
                        <th>Mode</th>
                        <th>Current Status</th>
                        <th>Food Ready</th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.state.order.map(order => (
                        <tr>
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
                          <td>
                            <button
                              onClick={this.handleComplete(order.order_id)}
                            >
                              Food Ready
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
    );
  }
}
export default RCurrentOrder;
