import React from 'react';
import logo from './logo.svg';
import Animation from "./components/animation"
import Nav from "./components/nav"
import CurrentWeather from "./components/currentWeather"
import './App.css';
import Axios from 'axios';

class App extends React.Component {
  
  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    
    let geolocationFunction = () => {
      let coords = {}
      let geoSuccess = (position) => {
        console.log("Geoposition gives " + position.coords.latitude + " for latitutde");
        console.log("Geoposition gives " + position.coords.longitude + " for longitude");
        coords.latitude = position.coords.latitude;
        coords.longitude = position.coords.longitude;
        return;
      }
      navigator.geolocation.getCurrentPosition(geoSuccess);
      return coords;
    }

    let googleAPI = (coordsObj) => {
      console.log(coordsObj);
      console.log(process.env.API_KEY);
      // Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordsObj.latitude},${coordsObj.longitude}&sensor=false&key=${s}`)
      // .then(response => {
      //   console.log(response);
      // })
    }

    googleAPI(geolocationFunction());
    // http://maps.googleapis.com/maps/api/geocode/json?latlng=+37.42+,+37.42+&sensor=false
  }

  callAPI = (location) => {

  }

  render() {
    return (
      <div className="App">
        <Nav></Nav>
        <div className="container">
          <div className="row">
            <Animation></Animation>
            <div className="boxForEverything">
              <CurrentWeather></CurrentWeather>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// function App() {
//   return (

//   );
// }

export default App;
