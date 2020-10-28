import React, { Component,useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';

import cookie from "react-cookies";
import Navbar from "./rNavbar";


// import Modal from 'react-modal';
class viewmenu extends React.Component {
  constructor(props) {

   // const [currentPage, setCurrentPage] = useState(0)
    super();
    this.state = {
      menu: []
      
      
    };
  }


  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    fetch("/viewmenu", {
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
        console.log("data")
       // console.log(data[0].menu)
        //self.setState({ menu: data[0].menu });
        self.setState({ menu: data });
      })
      .catch((err) => {
        console.log("caught it!", err);
      });
  }

  handleClick(_id) {
    return function () {
      console.log(_id);
      localStorage.setItem('item_id_menudetails', _id);
      return <Redirect to="/editmenu" />;
    };
  }


  handleClickdelete(_id) {
    return function () {
      const self = this;
      console.log(_id);
      const newdata = { _id };
      console.log(newdata);
      fetch("/deletefrommenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      }).then((response) => {
        if (response.status== 200) {
          //throw new Error("Bad response from server");
          alert("Item deleted successfully")
        }
       // return response.json();
      })  
    //   .then(res => {
    //     console.log("data")
    //    // console.log(data[0].menu)
    //  alert("Item added successfully")
    //   })
      .catch((err) => {
        console.log("caught it!", err);
      });
    };
  }


  // function handlePageClick({ selected: selectedPage }) {
  //   setCurrentPage(selectedPage);
  // }

  // const offset = currentPage * PER_PAGE;

  // const currentPageData = data
  //   .slice(offset, offset + PER_PAGE)
  //   .map(({ thumburl }) => <img src={thumburl} />);

  // const pageCount = Math.ceil(data.length / PER_PAGE);

  render() {
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
                          {this.state.menu.map(food => (
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
                                {food.Ingredients}
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
                          ))}
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
export default viewmenu;
