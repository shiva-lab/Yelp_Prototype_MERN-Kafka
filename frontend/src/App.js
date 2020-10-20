import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './views/Home';
import RestaurantLogin from './views/RestaurantLogin';
import RestaurantRegister from './views/RestaurantRegister';
import UserLogin from './views/UserLogin';
import UserSignup from './views/UserSignup';
import rhome from './component/restaurantview/rhome';
import rviewprofile from './component/restaurantview/rviewprofile';
import rupdateprofile from './component/restaurantview/rupdateprofile';
import addmenu from './component/restaurantview/addmenu';
import viewmenu from './component/restaurantview/viewmenu';
import viewreview from './component/restaurantview/viewreview';
import uviewprofile from './component/userview/uviewprofile';
import uupdateprofile from './component/userview/uupdateprofile';
import rNavbar from './component/restaurantview/rNavbar';
import rlogout from './component/restaurantview/rlogout';
import addreview from './component/userview/uaddreview';
import uviewrestaurant from './component/userview/uviewrestaurant';
import uNavbar from './component/userview/uNavbar';
import Footer from './component/Footer';
import Header from './component/Header';
import store from './redux/store';
import uviewmenu from './component/userview/uviewmenu';
import uplaceorder from './component/userview/uplaceorder';
import Placeorderform from './component/userview/placeorderform';
import rvieworder from './component/restaurantview/rvieworder';
import Rcurrentorder from './component/restaurantview/rcurrentorder';
import Rcompleteorder from './component/restaurantview/rcompleteorder';
import Rfinalstatus from './component/restaurantview/rfinalstatus';
import Rorderdone from './component/restaurantview/rorderdone';
import MapContainer from './component/userview/mapContainer';
import uordercheckstatus from './component/userview/uordercheckstatus';
import uorderdetails from './component/userview/uorderdetails';
import editmenu from './component/restaurantview/editmenu';
import Rrejectedorder from './component/restaurantview/rrejectedorder';
import eventcreate from './component/restaurantview/eventcreate';
import viewevent from './component/userview/viewevent';
import vieweventsignup from './component/restaurantview/vieweventsignup';
import vieweventlisting from './component/restaurantview/vieweventlisting';
import usignedupevent from './component/userview/usignedupevent';
import searchrestaurant from './views/searchrestaurant';
import allRestaurant from './views/allRestaurant';
import ImageUpload from './views/ImageUpload';
import StarRating from './component/userview/StarRating';
import searchevent from './component/userview/searchevent';
//import eventcreate from './component/restaurantview/eventcreate';
import vieweventdetails from './component/userview/vieweventdetails';
import LandingPage from './views/LandingPage';

import neworderview from './component/restaurantview/neworderview';
import uviewprofilerest from './component/restaurantview/uviewprofilerest'





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
            <Route path="/viewevent" component={viewevent} />
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


          </Switch>

        </Router>


      </div>
    </Provider>

  );
}

export default App;
