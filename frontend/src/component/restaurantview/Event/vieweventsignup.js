import React, { Component } from "react";
import Navbar from "../rNavbar";
import { Link, Redirect } from 'react-router-dom';
import { paginate, pages } from '../../../helperFunctions/paginate'
import axios from 'axios';  

// import Modal from 'react-modal';
class ViewEventSignup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      eventview: [],
      filteredUserList: []
    };
  }

  componentDidMount() {
    
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const event_id = localStorage.getItem("event_id_eventsignup");
    const data = { restaurant_id, event_id };
    // make a post request with the user data
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post("/vieweventsignup", data)
    .then(response => {
      if (response.status === 200) {
        console.log("Printing response",response)
        console.log("Printing User",response.data.RegistredUser)
          this.setState({
            eventview: response.data.RegistredUser,
            filteredUserList : paginate(response.data.RegistredUser,1,10),
            pages: pages(response.data.RegistredUser, 10)

          })
          console.log(pages);
      } else {
          console.log("error");
      }
  });
  }

  paginatinon = (e) => {
    this.setState({
      filteredUserList: paginate(this.state.eventview,e, 10)
    })
}

  handleClick(user_id) {
    return function () {
      console.log(user_id);
      localStorage.setItem("user_id", user_id);
      return <Redirect to="/uviewprofilerest" />;
    };
  }

  render() {
    let links = [];
    if (this.state.pages > 0) {
        console.log(this.state.pages);
        for (let i = 1; i <= this.state.pages; i++) {
            links.push(<li className="page-item" key={i}><a className="page-link" onClick={() => { this.paginatinon(i) }}>
                {i}
                
            </a></li>
            )
        }
    }

    let event = this.state.filteredUserList.map(event => {
      return (
        <tr>
                    <td>
                      {event.user_id}
                      {' '}
                    </td>
                    <td>
                      {event.Emailid}
                      {' '}
                    </td>
                    <Link to="/uviewprofilerest" onClick={this.handleClick(event.user_id)}>
                    <td>
                      {event.username}
                      {' '}
                    </td>
                    </Link>
                    <td>
                      {event.date}
                      {' '}
                    </td>
                    </tr>      
    )
  })





    return (
      <div>
        <Navbar />
        <div className="container">
          <h1 className="heading-menu"> List of users Signedup for the event</h1>
          <div className="panel panel-default p50 uth-panel">
            <table className="table table-hover">
              <thead>
                <tr className="tbl-header">
                  <th>User ID</th>
                  <th>User Email</th>
                  <th>User Name</th>
                  <th>Registered On</th>
               
                </tr>
              </thead>
              <tbody>
              {event}
                            <ul className="pagination">
                            {links}
                            </ul>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewEventSignup;
