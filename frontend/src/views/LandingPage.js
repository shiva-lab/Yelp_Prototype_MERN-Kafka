import React, {Component} from 'react';
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import axios from "axios"
import Navbar from "../component/userview/uNavbar";

class LandingPage extends React.Component{
   constructor(props) {
      //Call the constructor of Super class i.e The Component
      super(props);
      //maintain the state required for this component
      this.state = {
        search1: "",
        search2: ""
      };
      this.search1Handler = this.search1Handler.bind(this);
      this.search2Handler = this.search2Handler.bind(this);
      //this.submitCustomerLogin = this.submitCustomerLogin.bind(this);
      //this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    search1Handler = (e) => {
      console.log("Inside search1 change handler");
      this.setState({
         search1: e.target.value,
      });
    };
    //password change handler to update state variable with the text entered by the user
    search2Handler = (e) => {
      this.setState({
         search2: e.target.value,
      });
    };
   

    render(){
      localStorage.setItem("search1", this.state.search1);
      localStorage.setItem("search2", this.state.search2);

        return(
            <div>
            <Navbar />
            <br />
            <br />
        <div>
             <div class="y-container homepage-hero homepage-hero_bg">
         <div class="y-container_content">
            <div class="hero-header js-main-header">
               <div class="arrange arrange--18">
                  <div class="arrange_unit arrange_unit--fill">
                     <div class="hero-header_nav hero-header_nav--main nowrap">
                       
                     </div>
                  </div>
                 
               </div>
            </div>
            {/* <!--Adding Logo Through CSS--> */}
            <div class="homepage-hero_inner">
               <div class="u-text-centered">
                  <h1 class="homepage-hero_logo" id="logo">
                     <a href="/">Yelp</a>
                  </h1>
               </div>
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
                           <div class="arrange_unit arrange_unit--fill">
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
                           </div>
                           <div class="arrange_unit">
                              <Link to='/searchrestaurant'>
                              <button class="ybtn ybtn--primary ybtn--small business-search-form_button"  value="submit"> Search
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
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </form>
             
               <div class="u-text-centered homepage-hero_photo-owner u-size-full">
                  <div data-hypernova-key="homepage__4df10ec47b3a69a592bdc358e7cc029de9ded942__homepage__PhotoAuthorText__dynamic" data-hypernova-id="6a46b050-6a68-4e95-9749-d748d5a58dee">
                     <p>Photo by <a class="homepage-hero_photo-owner-link" href="#"><strong>Shiva Pandey</strong></a></p>
                  </div>
                 
               </div>
            </div>
         </div>
      </div>
      <Footer/>
        </div>
        </div>
        )
    }

}
export default LandingPage