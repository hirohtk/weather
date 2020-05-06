import React from 'react';
import logo from './logo.svg';
import Animation from "./components/animation"
import Nav from "./components/nav"
import CurrentWeather from "./components/currentWeather"
import './App.css';
import Axios from 'axios';

class App extends React.Component {

  state = {
    location: []
  }
  
  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    var latitude;
    var longitude;

    let geolocationFunction = () => {
      
      let geoSuccess = (position) => {
        console.log("Geoposition gives " + position.coords.latitude + " for latitutde");
        console.log("Geoposition gives " + position.coords.longitude + " for longitude");
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        googleAPI(latitude, longitude);
      }
      navigator.geolocation.getCurrentPosition(geoSuccess);
    }

    let googleAPI = (latitude, longitude) => {
      let apiKey= process.env.REACT_APP_API_KEY;
      console.log(latitude, longitude)
      Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${apiKey}`)
      .then(response => {
        let loc = response.data.plus_code.compound_code;
        console.log(response.data.plus_code.compound_code);
        this.setState({location: loc.slice(8)})
      })
    }

    geolocationFunction();
  }

  callAPI = () => {
    
  }

  render() {
    return (
      <div className="App">
        <Nav></Nav>
        <div className="container">
          <div className="row">
            <Animation></Animation>
            <div className="boxForEverything">
              <CurrentWeather 
              location={this.state.location}></CurrentWeather>
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
