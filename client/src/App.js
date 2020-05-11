import React from 'react';
import logo from './logo.svg';
import Animation from "./components/animation"
import Nav from "./components/nav"
import CurrentWeather from "./components/currentWeather"
import ExtendedForecast from "./components/extendedForecast"
import './App.css';
import Axios from 'axios';
import $ from 'jquery'
import _ from 'underscore'
import {animationFunction} from "./components/logic/animationLogic"

class App extends React.Component {

  state = {
    location: [],
    weather: [],
    forecast: [],
    forecastButtonHovered: undefined
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
      let apiKey= process.env.REACT_APP_GOOGLE_API_KEY;
      console.log(latitude, longitude)
      Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${apiKey}`)
      .then(response => {
        console.log(response);
        let loc = response.data.plus_code.compound_code;
        console.log(response.data.plus_code.compound_code.slice(8).split(","));
        this.setState({location: loc.slice(8).split(",")}, () => this.callAPI(latitude, longitude));
      })
    }
    geolocationFunction();
    return;
  }

  callAPI = (lat, lng) => {
    let apiKey = process.env.REACT_APP_NEW_WEATHER_API_KEY;
    console.log(`calling new weather API`);
    Axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lng}`)
    .then(response => {
      console.log(response);
      let tempInF = response.data.current.temp_f;
      let condition = response.data.current.condition.text;
      this.setState({weather: [tempInF, condition]}, () => animationFunction(condition));
    });
    return;
  }

  changeForecast = (event) => {
    if (event.target.dataset.name === "hourly") {
      this.setState({forecast: ["HOURLY DATA"]});
    }
    else if (event.target.dataset.name === "fiveDay") {
      this.setState({forecast: ["5 DAY DATA"]});
    }
    return;
  }

  handleHover = (event) => {
    console.log("handling hover...")
    if (this.state.forecastButtonHovered != undefined) {
      this.setState({forecastButtonHovered: undefined});
    }
    else if (event.target.dataset.name === "hourly") {
      this.setState({forecastButtonHovered: "hourly"});
    }
    else if (event.target.dataset.name === "fiveDay") {
      this.setState({forecastButtonHovered: "fiveDay"});
    }
    return;
  }
    
  render() {
    return (
      <div className="App">
        <Nav></Nav>
        <div className="container">
          <div className="row">
            <Animation
            weather={this.state.weather}></Animation>
            <div className="boxForEverything">
              <div className="row">
              <CurrentWeather 
              location={this.state.location}
              weather={this.state.weather}></CurrentWeather>
              </div>
              <div className="row">
              <ExtendedForecast
              changeForecast={this.changeForecast}
              forecastResults={this.state.forecast}
              hovered={this.state.forecastButtonHovered}
              handleHover={this.handleHover}>
              </ExtendedForecast>
              </div>
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
