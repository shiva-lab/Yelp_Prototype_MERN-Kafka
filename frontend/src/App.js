import React from "react";
import "./App.css";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./views/Home";
//import RestaurantLogin from './views/RestaurantLogin';
//import RestaurantRegister from './views/RestaurantRegister';
import RestaurantLogin from "./component/restaurantview/Login/RestaurantLogin";
import RestaurantRegister from "./component/restaurantview/Login/RestaurantRegister";
import UserLogin from "./component/userview/Login/UserLogin";
import UserSignup from "./component/userview/Login/UserSignup";
import RHome from "./component/restaurantview/rhome";
import RViewProfile from "./component/restaurantview/Profile/rviewprofile";
import rupdateprofile from "./component/restaurantview/Profile/rupdateprofile";
import AddMenu from "./component/restaurantview/Menu/addmenu";
import ViewMenu from "./component/restaurantview/Menu/viewmenu";
import ViewReview from "./component/restaurantview/Reviews/viewreview";
import UViewProfile from "./component/userview/Profile/uviewprofile";
import UUpdateProfile from "./component/userview/Profile/uupdateprofile";
import rNavbar from "./component/restaurantview/rNavbar";
import rlogout from "./component/restaurantview/rlogout";
import AddReview from "./component/userview/Review/uaddreview";
import UViewRestaurant from "./component/userview/Order/uviewrestaurant";
import uNavbar from "./component/userview/uNavbar";
import Footer from "./component/Footer";
import Header from "./component/Header";
import store from "./redux/store";
import UViewMenu from "./component/userview/Order/uviewmenu";
import UPlaceOrder from "./component/userview/Order/uplaceorder";
import MapContainer from "./component/userview/mapContainer";
import UOrderCheckStatus from "./component/userview/Order/uordercheckstatus";
import UOrderDetails from "./component/userview/Order/uorderdetails";
import EditMenu from "./component/restaurantview/Menu/editmenu";
import EventCreate from "./component/restaurantview/Event/eventcreate";
import ViewEvent from "./component/userview/Event/viewevent";
import ViewEventSignup from "./component/restaurantview/Event/vieweventsignup";
import ViewEventListing from "./component/restaurantview/Event/vieweventlisting";
import USignedupEvent from "./component/userview/Event/usignedupevent";
import SearchRestaurant from "./component/userview/Home/searchrestaurant";
import AllRestaurant from "./component/userview/Home/allRestaurant";
import ImageUpload from "./views/ImageUpload";
import StarRating from "./component/userview/Review/StarRating";
import SearchEvent from "./component/userview/Event/searchevent";
//import eventcreate from './component/restaurantview/eventcreate';
import ViewEventDetails from "./component/userview/Event/vieweventdetails";
import LandingPage from "./views/LandingPage";
import NewOrderView from "./component/restaurantview/Order/neworderview";
import UViewProfileRest from "./component/userview/Profile/uviewprofilerest";
import ListAllUsers from "./component/userview/Profile/ListAllUsers";
import ViewSocialProfile from "./component/userview/Profile/ViewSocialProfile";
import RestaurantMessage from "./component/restaurantview/Messages/Messages";
import UserMessage from "./component/userview/Messages/Messages";

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/RestaurantLogin" component={RestaurantLogin} />
            <Route path="/RestaurantRegister" component={RestaurantRegister} />
            <Route path="/UserLogin" component={UserLogin} />
            <Route path="/UserSignup" component={UserSignup} />
            <Route path="/rviewprofile" component={RViewProfile} />
            <Route path="/rupdateprofile" component={rupdateprofile} />
            <Route path="/addmenu" component={AddMenu} />
            <Route path="/viewmenu" component={ViewMenu} />
            <Route path="/uviewprofile" component={UViewProfile} />
            <Route path="/rNavbar" component={rNavbar} />
            <Route path="/rlogout" component={rlogout} />
            <Route path="/Footer" component={Footer} />
            <Route path="/Header" component={Header} />
            <Route path="/rhome" component={RHome} />
            <Route path="/addreview" component={AddReview} />
            <Route path="/viewreview" component={ViewReview} />
            <Route path="/uupdateprofile" component={UUpdateProfile} />
            <Route path="/uNavbar" component={uNavbar} />
            <Route path="/uviewrestaurant" component={UViewRestaurant} />
            <Route path="/uviewmenu" component={UViewMenu} />
            <Route path="/uplaceorder" component={UPlaceOrder} />
            <Route path="/mapContainer" component={MapContainer} />
            <Route path="/uordercheckstatus" component={UOrderCheckStatus} />
            <Route path="/uorderdetails" component={UOrderDetails} />
            <Route path="/editmenu" component={EditMenu} />
            <Route path="/eventcreate" component={EventCreate} />
            <Route path="/viewevent" component={ViewEvent} />
            <Route path="/vieweventsignup" component={ViewEventSignup} />
            <Route path="/vieweventlisting" component={ViewEventListing} />
            <Route path="/usignedupevent" component={USignedupEvent} />
            <Route path="/ImageUpload" component={ImageUpload} />
            <Route path="/StarRating" component={StarRating} />
            <Route path="/allRestaurant" component={AllRestaurant} />
            <Route path="/mapSection" component={Map} />
            <Route path="/searchrestaurant" component={SearchRestaurant} />
            <Route path="/searchevent" component={SearchEvent} />
            <Route path="/vieweventdetails" component={ViewEventDetails} />
            <Route path="/LandingPage" component={LandingPage} />
            <Route path="/neworderview" component={NewOrderView} />
            <Route path="/uviewprofilerest" component={UViewProfileRest} />
            <Route path="/listallusers" component={ListAllUsers} />
            <Route path="/viewsocialprofile" component={ViewSocialProfile} />
            <Route path="/rMessages" component={RestaurantMessage} />
            <Route path="/uMessages" component={UserMessage} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
