import React, { Component } from "react";
import axios from "axios";
import Navbar from "../rNavbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { updateRestProfile } from "../../redux/action/actionprofile";
import { updateRestProfile } from "../../../redux/action/actionprofile";

import store from "../../../redux/store";

import { Provider } from "react-redux";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class rupdateprofile extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    description: "",
    contactinfo: "",
    cuisine: "",
    timings: "",
    zipcode: "",
    website: "",
    address: "",
   // restaurantimage: "",
    lat:"",
    lng:"",
    modeofdelivery:"",
    delivery_method:"",
    //file:null,
    selectedFile: null,
    loaded:0
  }
  this.submit = this.submit.bind(this);
  this.onChange = this.onChange.bind(this);
};

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };



  
  submit = (event) => {
    event.preventDefault();
    let restaurant_id = localStorage.getItem("restaurant_id");
    console.log("RestaurantID - Update", restaurant_id);
    // const payload = {
    //   description: this.state.description,
    //   contactinfo: this.state.contactinfo,
    //   cuisine: this.state.cuisine,
    //   timings: this.state.timings,
    //   zipcode: this.state.zipcode,
    //   website: this.state.website,
    //   address: this.state.address,
    //   restaurantimage: this.state.restaurantimage,
    //   lat: this.state.lat,
    //   lng: this.state.lng,
    //   modeofdelivery: this.state.modeofdelivery,
    //   delivery_method: this.state.delivery_method,
    //   restaurant_id,
    // };

    const formData = new FormData();
    for(var x = 0; x<this.state.selectedFile.length; x++) {
      formData.append('photos', this.state.selectedFile[x])
    }
  
    //formData.append('photos',this.state.file);
    formData.append('rdescription',this.state.description)
    formData.append('contactinfo', this.state.contactinfo)
    formData.append('cuisine', this.state.cuisine)
    formData.append('timings',this.state.timings)
    formData.append('zipcode', this.state.zipcode)
    formData.append('website',this.state.website)
    formData.append('address',this.state.address)
    formData.append('lat',this.state.lat)
    formData.append('lng', this.state.lng)
    formData.append('modeofdelivery',this.state.modeofdelivery)
    formData.append('delivery_method',this.state.delivery_method)
    formData.append('restaurant_id',restaurant_id)
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    this.props.updateRestProfile(formData);

    //   axios.post("/restaurantupdate",formData,config)
    //   .then(response => {
    //     console.log("inside success")
    //     console.log("Status Code : ", response.status);
    //     if (response.status === 200) {
    //         console.log("success", response)
    //         alert("profile updated successfully")
    //         //window.location.reload();
    //         // console.log(response)
    //     }
    // })
    //     .catch(() => {
    //       console.log('Internal server error');
    //       alert("Internal server error");
    //     });;

    // };

  //   resetUserInputs = () => {
  //     this.setState({
  //       description: '',
  //       contactinfo: '',
  //       cuisine: '',
  //       timings: '',
  //       zipcode: '',
  //       restaurantimage: ''
  //     });
  };
//   onChange(e) {
//     this.setState({file:e.target.files});
// }

onChange=e=>{
  var files = e.target.files
     this.setState({
     selectedFile: files,
     loaded:0
  })
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
      <Provider store={store}>
        <div>
          <Navbar />
          <div>
            <div class="body">
              <div class="row">
                <div class="column">
                  <div class="container">
                    <div class="login-form">
                        <div class="panel"></div>
                        <div>
                          <h1 class="heading">Restaurant Profile Update</h1>
                          <form onSubmit={this.submit}>
                            <br />
                            <textarea
                              style={{ borderRadius: "3px" }}
                              id="description"
                              name="description"
                              cols="30"
                              rows="10"
                              placeholder="A Brief Bio about your Restaurant"
                              value={this.state.description}
                              onChange={this.handleChange}
                            ></textarea>
                            <br />
                            <br />

                            <textarea
                              style={{ borderRadius: "3px" }}
                              cols="30"
                              rows="5"
                              type="text"
                              id="timings"
                              name="timings"
                              placeholder="Infomation about Restaurant Hours and Off Days"
                              value={this.state.timings}
                              onChange={this.handleChange}
                            ></textarea>
                            <br />
                            <br />
                            <textarea
                              style={{ borderRadius: "3px" }}
                              cols="30"
                              rows="5"
                              type="text"
                              id="address"
                              name="address"
                              placeholder="Address"
                              value={this.state.address}
                              onChange={this.handleChange}
                            ></textarea>
                            <br />
                            <br />
                            <input
                              type="text"
                              style={{ borderRadius: "3px" }}
                              id="contactinfo"
                              name="contactinfo"
                              placeholder="Contact Number"
                              value={this.state.contactinfo}
                              onChange={this.handleChange}
                            />
                            <br />
                            <br />

                            <input
                              style={{ borderRadius: "3px" }}
                              type="text"
                              id="cuisine"
                              name="cuisine"
                              placeholder="Cuisine"
                              value={this.state.cuisine}
                              onChange={this.handleChange}
                            />
                            <br />
                            <br />

                            <input
                              style={{ borderRadius: "3px" }}
                              type="zipcode"
                              id="zipcode"
                              name="zipcode"
                              placeholder="Zip Code"
                              value={this.state.zipcode}
                              onChange={this.handleChange}
                            />
                            <br />
                            <br />
                            <input
                              style={{ borderRadius: "3px" }}
                              type="text"
                              id="website"
                              name="website"
                              placeholder="Website"
                              value={this.state.website}
                              onChange={this.handleChange}
                            />
                            <br />
                            <br />

                           
                            <input
                              style={{ borderRadius: "3px" }}
                              type="text"
                              id="lat"
                              name="lat"
                              placeholder="Latitude"
                              value={this.state.lat}
                              onChange={this.handleChange}
                            />
                            <br />
                            <br />
                            <input
                              style={{ borderRadius: "3px" }}
                              type="text"
                              id="lng"
                              name="lng"
                              placeholder="Longitude"
                              value={this.state.lng}
                              onChange={this.handleChange}
                            />
                            <br />
                            <br />

                         <select
                      value={this.state.modeofdelivery}
                      onChange={this.handleChange}
                      id="modeofdelivery"
                      name="modeofdelivery"
                      
                    >
                      <option>Delivery Mode</option>
                      <option value="pickup">Pickup</option>
                      <option value="delivery">Delivery</option>
                      
                    </select> 
                            <br />
                            <br />

                            <select
                      value={this.state.delivery_method}
                      onChange={this.handleChange}
                      id="delivery_method"
                      name="delivery_method"
                      
                    >
                      <option>Delivery Method</option>
                      <option value="curbsidepickup">Cubside Pickup</option>
                      <option value="delivery">Yelp Delivery</option>
                      <option value="dine-in">Dine In</option>
                      
                      
                    </select> 
                            <br />
                            <br />
                  <div className="cartbtn" align="center">
                  <input type="file" name="photos" onChange= {this.onChange} multiple required/>
                  </div>

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
      </Provider>

      </div>
        </div>
    );
  
  }
}

rupdateprofile.propTypes = {
  updateRestProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.register.user,
});

export default connect(mapStateToProps, { updateRestProfile })(rupdateprofile);
//export default rupdateprofile
