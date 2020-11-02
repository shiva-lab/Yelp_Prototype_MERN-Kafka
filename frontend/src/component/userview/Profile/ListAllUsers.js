import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {paginate, pages} from '../../../helperFunctions/paginate'
import cookie from "react-cookies";
import axios from "axios";
import Navbar from "../uNavbar";

// import Modal from 'react-modal';
class ListAllUsers extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userdata: [],
      filteredUserdata:[],
      searcheve: "",
    };
    this.searcheveHandler = this.searcheveHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  searcheveHandler = (e) => {
    console.log("Inside Search User Event Handler");
    this.setState({
      searcheve: e.target.value,
    });
  };

  viewprofileHandler(_id) {
    return function () {
      console.log("User ID:", _id);
      localStorage.setItem("user_id_profileview", _id);
      return <Redirect to="/ViewSocialProfile" />;
    };
  }
  componentDidMount() {
    axios.defaults.withCredentials = true;
    const self = this;
    axios.get('/viewuserlist')
      .then((response) => {
        if (response.status === 200) {
          console.log("Printing response",response)
          console.log("Printing User Data",response.data)
            this.setState({
              userdata: response.data,
              filteredUserdata : paginate(response.data,1,10),
              pages: pages(response.data, 10)

            })
            console.log(pages);
        } else {
            console.log("error");
        }
    });
  }

  paginatinon = (e) => {
    this.setState({
      filteredUserdata: paginate(this.state.userdata,e, 10)
    })
}

handleChange = ({ target }) => {
  const { name, value } = target;
  this.setState({ [name]: value });
};


submit = (event) => {
  event.preventDefault();
  var user_id = localStorage.getItem('user_id')
  const data = {user_id};
  console.log(data);
  const self = this;
  axios.defaults.withCredentials = true;
    axios.post('/usersifollow',data)
      .then((response) => {
        if (response.status === 200) {
          console.log("Printing response",response)
          console.log("Printing User Data",response.data[0].followedUser)
            this.setState({
              userdata: response.data[0].followedUser,
              filteredUserdata : paginate(response.data[0].followedUser,1,10),
              pages: pages(response.data[0].followedUser, 10)

            })
            console.log("Pages",pages);
        } else {
            console.log("error");
        }
    });
  
};

           
  render() {
    localStorage.setItem("searcheve", this.state.searcheve);
    let redirectVar = null;
    if (!cookie.load("cookie1")) {
      redirectVar = <Redirect to="/" />;
    }

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

    let userdata = this.state.filteredUserdata.map(socialprofile => {
      return (
        <tr>
          <td>{socialprofile.fname}</td>
          <td>{socialprofile.lname}</td>
          <td>{socialprofile.Emailid}</td>
          <td>{socialprofile.headline}</td>
          <td>{socialprofile.city}</td>
          <td><Link to="/ViewSocialProfile">
            <button onClick={this.viewprofileHandler(socialprofile._id)}>View Profile
                            </button></Link></td>
        </tr>
      )
    })



    return (
      <div>
        {redirectVar}
        <div>
          <div>
            <Navbar />

            <div className="container">
              <h1 className="heading-menu"> List of all Users</h1>
              <br />
              <br />
              <label>
                <div>
                  <span class="pseudo-input_field-holder">
                    <input
                      autocomplete="off"
                      id="dropperText_Mast"
                      maxlength="80"
                      name="search"
                      placeholder="User Name"
                      onChange={this.searcheveHandler}
                    />
                    <input type="hidden" name="ns" value="1" />
                  </span>
                  <Link to="/searchevent">
                    <button
                      class="ybtn ybtn--primary ybtn--small business-search-form_button"
                      value="submit"
                    >
                      {" "}
                      Search
                      <span class="main-search_action-icon-wrap js-search-icon-wrap">
                        <span
                          aria-hidden="true"
                          styles="width: 24px; height: 24px;"
                        ></span>
                      </span>
                    </button>
                  </Link>
                </div>
              </label>
              <form onSubmit={this.submit}>
              <select
                value={this.state.value}
                onChange={this.handleChange}
                id="filter"
                name="filter"
                placeholder="filter"
              >
                <option>Filter</option>
                <option value="followedusers">Users I follow</option>
              </select>
              <input
                class="btn btn-primary"
                type="submit"
                value="Submit"
              ></input>
            </form>
              <br />
              <br />
              <div className="container">
                    <div>
              <div className="panel panel-default p50 uth-panel">
                <table className="tables">
                  <thead>
                    <tr className="tbl-header">
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Headline</th>
                      <th>City</th>
                      <th>View Profile</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                        {userdata}
                            <ul className="pagination">
                            {links}
                            </ul>
                        </tbody>
                 
                </table>
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
export default ListAllUsers;
