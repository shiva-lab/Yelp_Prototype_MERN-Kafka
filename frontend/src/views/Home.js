import React, {Component} from 'react';
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import axios from "axios"
class Home extends React.Component{
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
             <div class="y-container homepage-hero homepage-hero_bg">
         <div class="y-container_content">
            <div class="hero-header js-main-header">
               <div class="arrange arrange--18">
                  <div class="arrange_unit arrange_unit--fill">
                     <div class="hero-header_nav hero-header_nav--main nowrap">
                        <ul class="header-nav" id="header-nav">
                           <li id="talk" class="header-nav_item " data-analytics-label="talk">
                              <a class="header-nav_link">
                             <Link class= "link-home" to="/RestaurantRegister">Restaurant Sign Up</Link>
                              </a>
                           </li>
                           <li id="events" class="header-nav_item" data-analytics-label="events">
                              <a class="header-nav_link" href="/RestaurantLogin">
                              <Link class= "link-home" to="/RestaurantLogin">Restaurant Login</Link>
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  {/* <!--Login Signup Section--> */}
                  <div class ="arrange_unit nowrap">
                     <ul class="header-nav hero-header_nav main-header_account">
                        <li class="header-nav_item u-space-r2" id="header-log-in">
                           <a class="header-nav_link header-nav_link--log-in " href="/UserLogin" data-analytics-label="login">
                           <Link class= "link-home" to="/UserLogin">Login</Link>
                           </a>
                        </li>
                        <li class="header-nav_item u-space-r0 " id="header-sign-up" data-analytics-label="signup">
                           <a class="ybtn ybtn--primary header-nav_button nowrap">
                              <Link class= "link-home" to="/UserSignup">Sign Up</Link>
                              </a>
                        </li>
                     </ul>
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
        )
    }

}
export default Home