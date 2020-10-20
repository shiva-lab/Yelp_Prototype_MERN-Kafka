import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Navbar from "./rNavbar";

// import Modal from 'react-modal';
class viewreview extends React.Component {
  constructor(props) {
    super();
    this.state = {
      review: [],
    };
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    fetch("/viewreview", {
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
        self.setState({ review: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div>
          <h1 className="heading-menu">View Review</h1>
        </div>
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div className="container">
              {this.state.review.map(foodreview => (
                <div className="cardclass">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      height="180"
                      src={foodreview.path}
                    />
                    <Card.Body>
                      <Card.Title>
                        {foodreview.fname}
                        {' '}
                        {foodreview.lname}
                      </Card.Title>
                      <h3>Review</h3>
                      <Card.Text>{foodreview.review_desc}</Card.Text>
                      <h3>Rating</h3>
                      <Card.Text>{foodreview.rating}</Card.Text>
                      <h3>Date</h3>
                      <Card.Text>{foodreview.ts}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default viewreview;
