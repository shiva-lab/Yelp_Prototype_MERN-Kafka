import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import cookie from "react-cookies";
import Navbar from "../uNavbar";

class UViewRestaurant extends React.Component {
  constructor(props) {
    super();
    this.state = {
      resturantlist: [],
    };
  }

  componentDidMount() {
    const self = this;
    const zipcode = cookie.load("userzipcode");
    const data = { zipcode };
    var bearer = localStorage.getItem("token");
    console.log("Token :", bearer);

    axios.post("/uviewrestaurant", data)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        self.setState({ resturantlist: response.data.data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  handleClick(restaurant_id_menu) {
    return function () {
      console.log(restaurant_id_menu);
      localStorage.setItem("restaurant_id_menu", restaurant_id_menu);
      return <Redirect to="/uviewmenu" />;
    };
  }

  handleReviewClick(restaurant_id, user_id) {
    return function () {
      console.log("Restaurant ID:", restaurant_id);
      localStorage.setItem("restaurant_id_review", restaurant_id);
      console.log("User ID:", user_id);
      localStorage.setItem("user_id_review", user_id);
      return <Redirect to="/addreview" />;
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div>
              <div className="container">
                <div>
                  <table className="tables">
                    <thead>
                      <tr className="tbl-header">
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Contact Info</th>
                        <th>Cuisine</th>
                        <th>View Menu</th>
                        <th>Review</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.resturantlist.map((food) => (
                        <tr>
                          <td>
                            <img
                              src={food.restaurantimage}
                              width={150}
                              height={120}
                              mode="fit"
                            />
                          </td>
                          <td>{food.restaurant_name} </td>
                          <td>{food.rdescription} </td>
                          <td>{food.contactinfo}</td>
                          <td>{food.cuisine}</td>
                          <td>
                            <Link to="/uviewmenu">
                              <button
                                onClick={this.handleClick(food.restaurant_id)}
                              >
                                View Menu
                              </button>
                            </Link>
                          </td>

                          <td>
                            <Link to="/addreview">
                              <button
                                onClick={this.handleReviewClick(
                                  food.restaurant_id,
                                  food.user_id
                                )}
                              >
                                Rate Order
                              </button>
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
    );
  }
}
export default UViewRestaurant;
