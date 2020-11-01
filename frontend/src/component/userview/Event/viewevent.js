import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import cookie from "react-cookies";
import axios from "axios";
import Navbar from "../uNavbar";

// import Modal from 'react-modal';
class viewevent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      eventdata: [],
      searcheve: ""
    };
    this.searcheveHandler = this.searcheveHandler.bind(this);
  }
  searcheveHandler = (e) => {
    console.log("Inside search event change handler");
    this.setState({
       searcheve: e.target.value,
    });
  };
  
  viewdetailsHandler(_id)  {
    return function () {
      
      console.log("event ID:", _id);
      localStorage.setItem('event_id_selected',_id);
      return <Redirect to="/vieweventdetails" />;
    };
  };
  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
   
 // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  axios.get('/viewevent')
          .then((response) => {
          //update the state with the response data
          this.setState({
            eventdata : response.data
          });
      });
  }


  handleClick(_id, restaurant_id) {
    return function () {
      const user_id = cookie.load('cookie1');
      console.log(_id, restaurant_id, user_id);
      const newdata = {
        user_id,
        restaurant_id,
        _id
      };
      console.log(newdata);
      fetch("/eventsignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      }).then(response => {
        console.log("inside success")
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
            console.log("success", response)
            alert("successfully registered for event")
            window.location.reload();
            // console.log(response)
        }
    })
    .catch(err => {
        console.log("In error");
        console.log(err);
        alert("Failed","Update failed! Please try again", err)
    })
    };
  }

  render() {
    localStorage.setItem("searcheve", this.state.searcheve);
    let redirectVar = null;
    if (!cookie.load("cookie1")) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        <div>
          <div>
            <Navbar />
           
            <div className="container">
              <h1 className="heading-menu"> Events</h1><br/><br/>
              <label >
                                    <div>
        
                                       <span class="pseudo-input_field-holder">
                                       <input autocomplete="off" id="dropperText_Mast" maxlength="80" name="search" placeholder="Event Name"  onChange={this.searcheveHandler}  />
                                       <input type="hidden" name="ns" value="1" />
                                       </span>
                                       <Link to='/searchevent'>
                              <button class="ybtn ybtn--primary ybtn--small business-search-form_button"  value="submit"> Search
                                 <span class="main-search_action-icon-wrap js-search-icon-wrap">
                                    <span aria-hidden="true" styles="width: 24px; height: 24px;">
                                    </span></span>
                                    </button>
                                  
                              </Link>
                                    </div>
                                 </label>
                                 <br/><br/>

              <div className="panel panel-default p50 uth-panel">
              
                <table className="table table-hover">
                  <thead>
                    <tr className="tbl-header">
                      <th>Event Name</th>
                      
                      <th>Event Description</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Address</th>
                      <th>Sign Up</th>
                      <th>View Details</th>


                    </tr>
                  </thead>
                  <tbody>
                    {this.state.eventdata.map(event => (
                      <tr>
                        <td>
                          {event.eventname}
                          {' '}
                        </td>
                      
                        <td>
                          {event.eventdescription}
                          {' '}
                        </td>
                        <td>
                          {event.date}
                          {' '}
                        </td>
                        <td>
                          {event.time}
                          {' '}
                        </td>
                        <td>{event.address}</td>
                        <td>
                          <Link>
                            <button
                              onClick={this.handleClick(event._id, event.restaurant_id)}
                            >
                              Sign Up
                            </button>
                          </Link>
                          </td>

                          <td>

                          <Link to='/vieweventdetails'>
                            <button
                              onClick={this.viewdetailsHandler(event._id)}
                            >
                              View Details
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
    );
  }
}
export default viewevent;
