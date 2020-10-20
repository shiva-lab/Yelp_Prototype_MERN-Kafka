import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from "react";


export class MapContainer extends Component {
    constructor(props) {
      super(props);        
    
    }
  
    displayMarkers = () => {
      if(!this.props.latlng){
        return
      }
      return this.props.latlng.map((latlng, index) => {
        return <Marker key={index} id={index} position={{
         lat: latlng.latitude,
         lng: latlng.longitude
       }}

         
       onClick={() => console.log("You clicked me!")} />
       
      })
    }

    
    render() {
      return (
          <Map
            google={this.props.google}
            zoom={12}
            style={mapStyles}
            initialCenter={{ lat:37.3541, lng: -121.9552}}
          >  
          {/* <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        /> */}
            {this.displayMarkers()}
          </Map>
      );
    }
  }
  const mapStyles = {
    width: '50%',
    height: '100%',
  };

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyAD0ljZQ6iObBbIIKqnPMI3I-ttV_rirMw'
  })(MapContainer);