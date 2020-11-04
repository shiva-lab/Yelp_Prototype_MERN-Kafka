import React, { Component } from "react";
//import Navbar from "../userview/uNavbar"
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";
import MapContainer from "../mapContainer";
import Navbar from "../uNavbar";
import axios from "axios";

//import Modal from 'react-modal';
class SearchRestaurant extends React.Component {
  constructor(props) {
    super();
    this.state = {
      resturantlist: [],
      filter: "",
    };

    //Bind the handlers to this class
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

componentDidMount() {
    

    let self = this;

    let search1 = localStorage.getItem("search1");
   // let search2 = localStorage.getItem("search2");
   // const data = { search1, search2 };
   const data = { search1 };
   //axios.post("/restaurantsearch",data)
    fetch("/restaurantsearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        console.log("Search Result",data)
        self.setState({
          resturantlist: data, latlng: data.map((d) => ({ latitude: d.lat, longitude: d.lng })),
        });
      //  self.setState({ resturantlist: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick(restaurant_id) {
    return function () {
      console.log("Restaurant ID:", restaurant_id);
      localStorage.setItem("restaurant_id_allrest", restaurant_id);
      return <Redirect to="/rviewprofile" />;
    };
  }

  submit = (event) => {
    event.preventDefault();
    const data = { filter: this.state.filter };
    //ß  var data = "dine-in";
    console.log("Hellooooooo");
    console.log(data);
    const temp = this;
    fetch("/filterrestaurantsearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      })
      .then(function (data) {
        console.log(data);
        //window.location.reload();
        // temp.setState({
        //   latlng: data.map((d) => ({ latitude: d.lat, longitude: d.lng })),
        // });
        temp.setState({ resturantlist: data });
        
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  };

  render() {

    return (
      <div>
        <Navbar />
            <br />
            <br />
        <div class="grid-container">
          <div class="ResDescription">
            <form onSubmit={this.submit}>
              <select
                value={this.state.value}
                onChange={this.handleChange}
                id="filter"
                name="filter"
                placeholder="filter"
              >
                <option>Filter</option>
                <option value="dine-in">Dine In</option>
                <option value="curbsidepickup">Curbside Pickup</option>
                <option value="delivery">Yelp Delivery</option>
                <option value="location">Neighbourhood</option>
              </select>
              <input
                class="btn btn-primary"
                type="submit"
                value="Submit"
              ></input>
            </form>
            <div>
              <div>
                <table className="tables">
                  <thead>
                    <tr class="tbl-header">
                      <th>Name</th>
                      <th>Picture</th>

                      <th>Description</th>
                      <th>Contact Info</th>
                      <th>Address</th>
                      <th>view details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.resturantlist.map((food) => (
                      <tr>
                        <td>{food.restaurantname} </td>
                        <td>
                          <img
                            src={food.path}
                            width={150}
                            height={120}
                            mode="fit"
                          />
                        </td>

                        <td>{food.rdescription} </td>
                        <td>{food.contactinfo}</td>
                        <td>{food.address}</td>

                        <td>
                          <Link to="/rviewprofile">
                            <button
                              onClick={this.handleClick(food._id)}
                            >
                              View Restaurant
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
          <div class="maparea">
            <MapContainer latlng={this.state.latlng}></MapContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchRestaurant;
