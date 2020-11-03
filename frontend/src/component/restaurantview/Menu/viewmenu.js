import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { paginate, pages } from '../../../helperFunctions/paginate'
import axios from 'axios';
import cookie from "react-cookies";
import Navbar from "../rNavbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { viewMenu } from "../../../redux/action/menuAction";
// import Modal from 'react-modal';
class ViewMenu extends React.Component {
  constructor(props) {
    super();
    this.state = {
      menu: [],
      filteredMenu:[],
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    //this.props.viewMenu(data);
    // make a post request with the user data
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post("/viewmenu", data)
        .then(response => {
            if (response.status === 200) {
              console.log("Printing response",response)
              console.log("Printing Menu",response.data)
                this.setState({
                  menu: response.data,
                  filteredMenu : paginate(response.data,1,10),
                  pages: pages(response.data, 10)

                })
                console.log(pages);
            } else {
                console.log("error");
            }
        });
}



  handleClick(item_id) {
    return function () {
      console.log(item_id);
      localStorage.setItem('item_id_menudetails', item_id);
      return <Redirect to="/editmenu" />;
    };
  }


  handleClickdelete(item_id) {
    return function () {
      const self = this;
      console.log(item_id);
      const newdata = { item_id };
      console.log(newdata);
      // make a post request with the user data
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios.post("/deletefrommenu", newdata)
      .then(res => res.json());
    };
  }

  paginatinon = (e) => {
    this.setState({
        filteredMenu: paginate(this.state.menu,e, 10)
    })
}


  render() {
    let redirectVar = null;
    if (!cookie.load("restaurant_id")) {
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

    let menu = this.state.filteredMenu.map(food => {
      return (
        <tr>
          <td>
            <img
              src={food.path}
              width={150}
              height={120}
              mode="fit"
            />
          </td>
          <td>
            {food.itemname}
            {' '}
          </td>
          <td>
            {food.ingredients}
            {' '}
          </td>
          <td>{food.price}</td>
          <td>{food.itemcategory}</td>
          <td>
            <Link to="/editmenu">
              <button onClick={this.handleClick(food._id)}>Edit</button>
            </Link>
          </td>
          <td>
            <Link>
              <button onClick={this.handleClickdelete(food._id)}>Delete</button>
            </Link>
          </td>
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
              <div className="main-div-menu">
                <div className="panel" />
                <div>
                  <h1 className="heading-menu">Restaurant Menu</h1>
                  <div className="container">
                    <div>
                      <table className="tables">
                        <thead>
                          <tr className="tbl-header">
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Main Ingredients</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Edit Item</th>
                            <th>Delete Item</th>
                          </tr>
                        </thead>
                        <tbody>
                        {menu}
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
      </div>
    );
  }
}
// viewmenu.propTypes = {
//   viewMenu: PropTypes.func.isRequired,
//   menuitem: PropTypes.object.isRequired,
 
// };

// const mapStateToProps = (state) => ({
//   menuitem: state.menu.menuitem,
// });

// export default connect(mapStateToProps, { viewMenu })(viewmenu);


export default ViewMenu;
