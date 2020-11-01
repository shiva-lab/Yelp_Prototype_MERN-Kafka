import React, { Component } from "react";
import axios from "axios";
import Navbar from "../rNavbar";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class eventcreate extends React.Component {
  // Creating State
  constructor(props) {
    super(props);
  this.state = {
    eventname: "",
    eventdescription: "",
    date: "",
    time: "",
    address: "",
    city: "",
    eventtype: "",
    hashtag:"",
    file: null,
  };
  this.submit = this.submit.bind(this);
  this.onChange = this.onChange.bind(this);
}
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();
    let restaurant_id = localStorage.getItem("restaurant_id");
    console.log("RestaurantID - Update", restaurant_id);

    

    const formData = new FormData();
    formData.append('restaurant_id',restaurant_id)
    formData.append('eventname', this.state.eventname)
    formData.append('eventdescription', this.state.eventdescription)
    formData.append('date', this.state.date)
    formData.append('time', this.state.time)
    formData.append('address', this.state.address)
    formData.append('city', this.state.city)
    formData.append('eventtype', this.state.eventtype)
    formData.append('hashtag',this.state.hashtag)
    formData.append('myfile',this.state.file);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    axios.post("/addevent",formData,config)
      .then(response => {
            if (response.status === 200) {
            alert("Event created Successfully ")
            console.log(response);
            }
          })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  resetUserInputs = () => {
    this.setState({
        eventname: "",
        eventdescription: "",
        date: "",
        time: "",
        address: "",
        city: "",
        eventtype: "",
        hashtag:""
    });
  };

  onChange(e) {
    this.setState({file:e.target.files[0]});
}

  render() {
    console.log("State: ", this.state);

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
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel"></div>

              <div>
                <div>
                  <h1 class="heading">Create An Event</h1>
                  <form onSubmit={this.submit} enctype="multipart/form-data">
                    <input
                      style={{ borderRadius: "3px" }}
                      type="text"
                      id="eventname"
                      name="eventname"
                      placeholder="Event Name"
                      value={this.state.eventname}
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />

                    <textarea
                      style={{ borderRadius: "3px" }}
                      id="eventdescription"
                      name="eventdescription"
                      cols="30"
                      rows="10"
                      placeholder="Event Description"
                      value={this.state.eventdescription}
                      onChange={this.handleChange}
                    ></textarea>
                    <br />
                    <br />

                    <input
                      style={{ borderRadius: "3px" }}
                      type="date"
                      id="date"
                      name="date"
                      placeholder="date"
                      value={this.state.date}
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <input
                      style={{ borderRadius: "3px" }}
                      type="time"
                      id="time"
                      name="time"
                      placeholder="time"
                      value={this.state.time}
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <textarea
                      style={{ borderRadius: "3px" }}
                      id="address"
                      name="address"
                      cols="30"
                      rows="5"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={this.handleChange}
                    ></textarea>

                    <br />
                    <br />
                    <input
                      style={{ borderRadius: "3px" }}
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      value={this.state.city}
                      onChange={this.handleChange}
                    />
                    <br />
                    
                    <br />
                    <label>Event Image</label>
                    <input type="file" name="myfile" onChange= {this.onChange} required/>

                    <br />
                    <br />

                    <select
                      value={this.state.value}
                      onChange={this.handleChange}
                      id="eventtype"
                      name="eventtype"
                      placeholder="Event Type"
                    >
                      <option>Select Event Type</option>
                      <option value="virtual">Virtual</option>
                      <option value="onsite">On Site</option>
                    </select>
                    <br />
                    <br />
                    <input
                      style={{ borderRadius: "3px" }}
                      type="text"
                      id="hashtag"
                      name="hashtag"
                      placeholder="#Hashtag"
                      value={this.state.hashtag}
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />

                    <input
                      class="btn btn-primary"
                      type="submit"
                      value="Submit"
                    ></input>
                  </form>
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
export default eventcreate;
