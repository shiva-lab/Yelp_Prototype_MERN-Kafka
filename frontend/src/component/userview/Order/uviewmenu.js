import React, { Component, useState } from "react";
import { Redirect } from 'react-router';
import cookie from "react-cookies";
import Navbar from "../uNavbar";
import {paginate, pages} from '../../../helperFunctions/paginate'
import axios from "axios"

// import Modal from 'react-modal';
class UViewMenu extends React.Component {
  constructor(props) {
    super();
    this.state = {
      menu: [],
      filteredMenu:[]
    };
  }

  componentDidMount() {
    const restaurant_id = localStorage.getItem("restaurant_id_allrest");
    const data = { restaurant_id };
    axios.defaults.withCredentials = true;
    const self = this;
    axios.post('/uviewmenu',data)
    .then((response) => {
      if (response.status === 200) {
        console.log("Printing response",response)
        console.log("Printing User Data",response.data[0].menu)
          this.setState({
            menu: response.data[0].menu,
            filteredMenu : paginate(response.data[0].menu,1,10),
            pages: pages(response.data[0].menu, 10)

          })
          console.log(pages);
      } else {
          console.log("error");
      }
  });
}






  //   fetch("/uviewmenu", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       if (response.status >= 400) {
  //         throw new Error("Bad response from server");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("data")
  //       console.log(data)
  //       self.setState({ items: data});
  //     })
  //     .catch((err) => {
  //       console.log("caught it!", err);
  //     });
  // }


  handleClick(_id, itemname, price, path) {
    return function () {
      const user_id = cookie.load('cookie1');
      const user_name = cookie.load('username');
      const restaurant_id = localStorage.getItem("restaurant_id_allrest");
      console.log(_id, itemname, restaurant_id, price, path,user_name);
      const newdata = {
        _id,
        itemname,
        restaurant_id,
        price,
        user_id,
        path,
        user_name

      };
      console.log(newdata);
      fetch("/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      })      .then((response) => {
        if (response.status== 200) {
          //throw new Error("Bad response from server");
          alert("Item added successfully")
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
  }

  }

  paginatinon = (e) => {
    this.setState({
        filteredMenu: paginate(this.state.menu,e, 10)
    })
}

  render() {
    let redirectVar = null;

    if (!cookie.load("cookie1")) {
      redirectVar = <Redirect to="/" />;
    }
    let links = [];
    if (this.state.pages > 0) {
        //console.log(this.state.pages);
        for (let i = 1; i <= this.state.pages; i++) {
            links.push(<li className="page-item" key={i}><a className="page-link" onClick={() => { this.paginatinon(i) }}>
                {i}
            </a></li>
            )
        }
    }

    let userdata = this.state.filteredMenu.map(item => {
      return(
    <tr>
                      <td>
                                <img
                                  src={item.path}
                                  width={150}
                                  height={120}
                                  mode="fit"
                                />
                              </td>
                              <td>{item.itemname}{' '}</td>
                              <td>{item.item_description}{' '}</td>
                              <td>{item.price}</td>
                              <td>{item.itemcategory}</td>
                              <td>
                                <button
                             onClick={this.handleClick(item._id, item.itemname, item.price, item.path)}
                                >
                                  Add to cart
                                </button>
                              </td>
                              </tr>
                           
    )})






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
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Add to cart</th>
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
      </div>
    );
  }
}

export default UViewMenu;
