import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
//import Paginate from '../component/restaurantview/Paginate';
import cookie from "react-cookies";
import Navbar from "../uNavbar";
import MapContainer from '../mapContainer';
import {  Col, Row,Pagination } from 'react-bootstrap';

// import Modal from 'react-modal';
class allRestaurant extends React.Component {
  constructor(props) {
    super();
    this.state = {
      resturantlist: [],
      search1: "",
      activePage: 1

    };
    this.search1Handler = this.search1Handler.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    const self = this;
    fetch('/homeviewrestaurant', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },

    }).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      return response.json();
    }).then((data) => {
      self.setState({ latlng: data.map(d => ({ latitude: d.lat, longitude: d.lng })) });

      self.setState({ resturantlist: data });
    }).catch((err) => {
      console.log('caught it!', err);
    });
  }


  // handleClick(restaurant_id_menu) {
  //     return function() {
  //       console.log(restaurant_id_menu)
  //       localStorage.setItem('restaurant_id_menu', restaurant_id_menu);
  //       return <Redirect to='/uviewmenu' />
  //     }
  //     }

  // handleClick(_id) {
    
  //   return function () {
  //     console.log("Restaurant ID:",_id);
  //     localStorage.setItem('restaurant_id_allrest',_id);
  //     return <Redirect to="/rviewprofile" />;
  //   };
  // }

  search1Handler = async(e) => {
    
    console.log("Inside search1 change handler");
    await this.setState({
       search1: e.target.value,
       
    });
    
  };
  
  changePage = (e) => {
    let page = this.state.activePage;
    if (e.target.text === ">" && page !== parseInt(e.target.name)) {
        page += 1;
    } else if (e.target.text === "<" && page !== parseInt(e.target.name)) {
        page -= 1;
    } else {
        page = parseInt(e.target.name);
    }
    this.setState({
        activePage: page
    });
};

  render() {
    
    //localStorage.setItem("search1", this.state.search1);
    // let redirectVar = null;

    // if (!cookie.load("cookie1")) {
    //   redirectVar = <Redirect to="/" />;
    // }
    let 
    active = 1,
    itemsToShow = 1,
    pagesBar = null;


if (this.state && this.state.activePage) {
    active = this.state.activePage;
}
if (this.state && this.state.resturantlist && this.state.resturantlist.length > 0) {
let pages = [];
let restaurantlist=this.state.resturantlist;
let pageCount = Math.ceil(restaurantlist.length / itemsToShow);

for (let i = 1; i <= pageCount; i++) {
    pages.push(
        <Pagination.Item active={i === active} name={i} key={i} onClick={this.changePage}>
            {i}
        </Pagination.Item>
    );
}
pagesBar = (
    <div>
        <Pagination>
            <Pagination.Prev name="1" onClick={this.changePage} />
            {pages}
            <Pagination.Next name={pageCount} onClick={this.changePage} />
        </Pagination>
    </div>

);
}
    return (
       <div>
         {/* {redirectVar} */}
         <div>
          <div>
            <Navbar />
            <br />
            <br />

            <form method="get" action="#" id="header_find_form" class="business-search-form main-search yform u-space-b0 js-business-search-form" role="search">
                  <div class="arrange arrange--equal arrange--stack-small">
                     <div class="arrange_unit">
                        <div class="main-search_suggestions-field search-field-container find-decorator">
                           <label class="pseudo-input business-search-form_input business-search-form_input--find" for="find_desc">
                              <div class="pseudo-input_wrapper">
                                 <span class="pseudo-input_text business-search-form_input-text">Find</span>
                                 <span class="pseudo-input_field-holder">
                                 <input autocomplete="off" id="find_desc" maxlength="64" name="find_desc" placeholder="Food, delivery, takeout..."  onChange={this.search1Handler}class="pseudo-input_field business-search-form_input-field" aria-autocomplete="list" tabindex="1" />
                                 </span>
                              </div>
                           </label>
                           <div class="main-search_suggestions suggestions-list-container search-suggestions-list-container hidden">
                              <ul class="suggestions-list" role="listbox" aria-label="Search results"></ul>
                           </div>
                        </div>
                     </div>
                     <div class="arrange_unit">
                        <div class="arrange">
                           {/* <div class="arrange_unit arrange_unit--fill">
                              <div class="main-search_suggestions-field search-field-container near-decorator">
                                 <label class="pseudo-input business-search-form_input business-search-form_input--near">
                                    <div class="pseudo-input_wrapper">
                                       <span class="pseudo-input_text business-search-form_input-text">Near</span>
                                       <span class="pseudo-input_field-holder">
                                       <input autocomplete="off" id="dropperText_Mast" maxlength="80" name="find_loc" placeholder="city or zip"  onChange={this.search2Handler}  class="pseudo-input_field business-search-form_input-field" aria-autocomplete="list" tabindex="2" />
                                       <input type="hidden" name="ns" value="1" />
                                       </span>
                                    </div>
                                 </label>
                                 <div class="main-search_suggestions suggestions-list-container location-suggestions-list-container hidden">
                                    <ul class="suggestions-list" role="listbox" aria-label="Search results"></ul>
                                 </div>
                              </div>
                           </div> */}
                           <div class="arrange_unit">
                             
                              <button  class="ybtn ybtn--primary ybtn--small business-search-form_button" onClick={()=>{localStorage.setItem("search1", this.state.search1);
    this.props.history.push('/searchrestaurant');}} value="submit" > Search
                                 <span class="main-search_action-icon-wrap js-search-icon-wrap">
                                    <span aria-hidden="true" styles="width: 24px; height: 24px;" class="icon icon--24-search icon--size-24 icon--currentColor">
                                       <svg role="img" class="icon_svg">
                                          <use xlinkHref="#24x24_search" />
                                       </svg>
                                    </span>
                                    <span class="u-offscreen">Search</span>
                                 </span>
                                 <div class="circle-spinner js-circle-spinner hidden">
                                    <div class="circle-spinner_segment container1">
                                       <div class="circle1"></div>
                                       <div class="circle2"></div>
                                       <div class="circle3"></div>
                                       <div class="circle4"></div>
                                    </div>
                                    <div class="circle-spinner_segment container2">
                                       <div class="circle1"></div>
                                       <div class="circle2"></div>
                                       <div class="circle3"></div>
                                       <div class="circle4"></div>
                                    </div>
                                    <div class="circle-spinner_segment container3">
                                       <div class="circle1"></div>
                                       <div class="circle2"></div>
                                       <div class="circle3"></div>
                                       <div class="circle4"></div>
                                    </div>
                                 </div>
                              </button>
                             
                           </div>
                        </div>
                     </div>
                  </div>
               </form>
             
            <div>

              <div className="grid-container">
                <div className="ResDescription">

                  <div>
                    <div>
                      <table className="tables">
                        <thead>
                          <tr className="tbl-header">
                            <th>Name</th>
                            <th>Picture</th>

                            <th>Description</th>
                            <th>Contact Info</th>
                            <th>Address</th>
                            <th>Order Now</th>


                          </tr>
                        </thead>
                        <tbody>

                          {this.state.resturantlist.map(food => (
                            <tr>
                              <td>
                                {food.restaurantname}
                                {' '}
                              </td>
                              <td><img src={food.path} width={150} height={120} mode="fit" /></td>

                              <td>
                                {food.rdescription}
                                {' '}
                              </td>
                              <td>{food.contactinfo}</td>
                              <td>{food.address}</td>

                              <td>
                                <Link to="/rviewprofile"> 
                                  <button
                                    onClick={()=>{ localStorage.setItem('restaurant_id_allrest',food._id);}}
    //                                 onClick={()=>{localStorage.setItem("search1", this.state.search1);
    // this.props.history.push('/searchrestaurant');}}
                                  >
                                    View Restaurant
                                  </button>
                                 </Link> 
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Row>
                    <Col sm={5}></Col>
                    <Col>{pagesBar}</Col>
                </Row>
                    </div>
                  </div>


                </div>
                <div className="maparea">
                  <MapContainer latlng={this.state.latlng} />


                </div>

              </div>
            </div>
          </div>
          
         </div>
       </div>
    );
  }
}
export default allRestaurant;
