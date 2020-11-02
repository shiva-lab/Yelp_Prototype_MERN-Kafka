import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './views/Home';
//import RestaurantLogin from './views/RestaurantLogin';
//import RestaurantRegister from './views/RestaurantRegister';
import RestaurantLogin from './component/restaurantview/Login/RestaurantLogin';
import RestaurantRegister from './component/restaurantview/Login/RestaurantRegister';
import UserLogin from './component/userview/Login/UserLogin';
import UserSignup from './component/userview/Login/UserSignup';
import rhome from './component/restaurantview/rhome';
import rviewprofile from './component/restaurantview/Profile/rviewprofile';
import rupdateprofile from './component/restaurantview/Profile/rupdateprofile';
import addmenu from './component/restaurantview/Menu/addmenu';
import viewmenu from './component/restaurantview/Menu/viewmenu';
import viewreview from './component/restaurantview/Reviews/viewreview';
import uviewprofile from './component/userview/Profile/uviewprofile';
import uupdateprofile from './component/userview/Profile/uupdateprofile';
import rNavbar from './component/restaurantview/rNavbar';
import rlogout from './component/restaurantview/rlogout';
import addreview from './component/userview/Review/uaddreview';
import uviewrestaurant from './component/userview/Order/uviewrestaurant';
import uNavbar from './component/userview/uNavbar';
import Footer from './component/Footer';
import Header from './component/Header';
import store from './redux/store';
import uviewmenu from './component/userview/Order/uviewmenu';
import uplaceorder from './component/userview/Order/uplaceorder';
import Placeorderform from './component/userview/Order/placeorderform';
import rvieworder from './component/restaurantview/Order/rvieworder';
import Rcurrentorder from './component/restaurantview/Order/rcurrentorder';
import Rcompleteorder from './component/restaurantview/Order/rcompleteorder';
import Rfinalstatus from './component/restaurantview/Order/rfinalstatus';
import Rorderdone from './component/restaurantview/Order/rorderdone';
import MapContainer from './component/userview/mapContainer';
import uordercheckstatus from './component/userview/Order/uordercheckstatus';
import uorderdetails from './component/userview/Order/uorderdetails';
import editmenu from './component/restaurantview/Menu/editmenu';
import Rrejectedorder from './component/restaurantview/Order/rrejectedorder';
import eventcreate from './component/restaurantview/Event/eventcreate';
import ViewEvent from './component/userview/Event/viewevent';
import vieweventsignup from './component/restaurantview/Event/vieweventsignup';
import vieweventlisting from './component/restaurantview/Event/vieweventlisting';
import usignedupevent from './component/userview/Event/usignedupevent';
import searchrestaurant from './component/userview/Home/searchrestaurant';
import allRestaurant from './component/userview/Home/allRestaurant';
import ImageUpload from './views/ImageUpload';
import StarRating from './component/userview/Review/StarRating';
import searchevent from './component/userview/Event/searchevent';
//import eventcreate from './component/restaurantview/eventcreate';
import vieweventdetails from './component/userview/Event/vieweventdetails';
import LandingPage from './views/LandingPage';

import neworderview from './component/restaurantview/Order/neworderview';
import uviewprofilerest from './component/userview/Profile/uviewprofilerest'
import Paginate from './component/restaurantview/Paginate'
import ListAllUsers from './component/userview/Profile/ListAllUsers'
import ViewSocialProfile from './component/userview/Profile/ViewSocialProfile'






function App() {
  return (
    <Provider store={store}>

      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/RestaurantLogin" component={RestaurantLogin} />
            <Route path="/RestaurantRegister" component={RestaurantRegister} />
            <Route path="/UserLogin" component={UserLogin} />
            <Route path="/UserSignup" component={UserSignup} />
            <Route path="/rviewprofile" component={rviewprofile} />
            <Route path="/rupdateprofile" component={rupdateprofile} />
            <Route path="/addmenu" component={addmenu} />
            <Route path="/viewmenu" component={viewmenu} />
            <Route path="/uviewprofile" component={uviewprofile} />
            <Route path="/rNavbar" component={rNavbar} />
            <Route path="/rlogout" component={rlogout} />
            <Route path="/Footer" component={Footer} />
            <Route path="/Header" component={Header} />
            <Route path="/rhome" component={rhome} />
            <Route path="/addreview" component={addreview} />
            <Route path="/viewreview" component={viewreview} />
            <Route path="/uupdateprofile" component={uupdateprofile} />
            <Route path="/uNavbar" component={uNavbar} />
            <Route path="/uviewrestaurant" component={uviewrestaurant} />
            <Route path="/uviewmenu" component={uviewmenu} />
            <Route path="/uplaceorder" component={uplaceorder} />
            <Route path="/Placeorderform" component={Placeorderform} />
            <Route path="/rvieworder" component={rvieworder} />
            <Route path="/rcurrentorder" component={Rcurrentorder} />
            <Route path="/rcompleteorder" component={Rcompleteorder} />
            <Route path="/rfinalstatus" component={Rfinalstatus} />
            <Route path="/rorderdone" component={Rorderdone} />
            <Route path="/rrejectedorder" component={Rrejectedorder} />
            <Route path="/mapContainer" component={MapContainer} />
            <Route path="/uordercheckstatus" component={uordercheckstatus} />
            <Route path="/uorderdetails" component={uorderdetails} />
            <Route path="/editmenu" component={editmenu} />
            <Route path="/eventcreate" component={eventcreate} />
            <Route path="/viewevent" component={ViewEvent} />
            <Route path="/vieweventsignup" component={vieweventsignup} />
            <Route path="/vieweventlisting" component={vieweventlisting} />
            <Route path="/usignedupevent" component={usignedupevent} />
            <Route path="/ImageUpload" component={ImageUpload} />


            <Route path="/StarRating" component={StarRating} />

            <Route path="/allRestaurant" component={allRestaurant} />
            <Route path="/mapSection" component={Map} />
            <Route path="/searchrestaurant" component={searchrestaurant} />
            <Route path="/searchevent" component={searchevent} />
            <Route path="/vieweventdetails" component={vieweventdetails} />
            <Route path="/LandingPage" component={LandingPage} />
            <Route path="/neworderview" component={neworderview} />
            <Route path="/uviewprofilerest" component={uviewprofilerest} />
            <Route path="/listallusers" component={ListAllUsers} />
            <Route path="/viewsocialprofile" component={ViewSocialProfile} />
            

          </Switch>

        </Router>


      </div>
    </Provider>

  );
}

export default App;
