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
import { animationFunction } from "./components/logic/animationLogic"

class App extends React.Component {

  state = {
    location: [],
    currentWeather: [],
    hourlyForecast: [],
    fiveDayForecast: [],
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
      let apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      console.log(latitude, longitude)
      Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${apiKey}`)
        .then(response => {
          console.log(response);
          let loc = response.data.plus_code.compound_code;
          console.log(response.data.plus_code.compound_code.slice(8).split(","));
          this.setState({ location: loc.slice(8).split(",") }, () => this.callAPI(latitude, longitude));
        })
    }
    geolocationFunction();
    return;
  }

  callAPI = (lat, lng) => {
    let apiKey = process.env.REACT_APP_NEW_WEATHER_API_KEY;
    console.log(`calling new weather API`);
    Axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lng}&days=5`)
      .then(response => {
        console.log(response);
        let tempInF = response.data.current.temp_f;
        let condition = response.data.current.condition.text;

        let fiveDayForecastArray = [];
        for (let i = 0; i < response.data.forecast.forecastday.length; i++) {
          let obj = {};
          obj.date = response.data.forecast.forecastday[i].date;
          obj.avgTempF = response.data.forecast.forecastday[i].day.avgtemp_f;
          obj.rainProbability = response.data.forecast.forecastday[i].day.daily_chance_of_rain;
          obj.condition = response.data.forecast.forecastday[i].day.condition.text;
          fiveDayForecastArray.push(obj);
        }
        console.log(`five day forecast array is ${fiveDayForecastArray}`);

        let hourlyForecastArray = [];
        // incrementing by  j += 6 seems to bug out
        
        for (let j = 0; j < response.data.forecast.forecastday[0].hour.length; j += 6) {
          console.log(j)
            let obj = {};
            obj.date = response.data.forecast.forecastday[0].hour[j].time;
            obj.tempF = response.data.forecast.forecastday[0].hour[j].temp_f;
            obj.rainProbability = response.data.forecast.forecastday[0].hour[j].chance_of_rain;
            obj.condition = response.data.forecast.forecastday[0].hour[j].condition.text;
            hourlyForecastArray.push(obj);
        }
        console.log(`hourly forecast array is ${hourlyForecastArray}`);

        // this.setState({fiveDayForecast: Object.assign(this.state.fiveDayForecast, fiveDayForecastArray)})
  
        // this.setState(state => {const list = state.list.concat(state.value)})

        // this.setState(prevState => ({
        //   fiveDayForecast: prevState.fiveDayForecast.forEach(
        //      (each, index) => (Object.assign(each, fiveDayForecastArray[index]))
        //   )
        // }), () => console.log(`this is fiveDayForecast in State ${this.state.fiveDayForecast} ???`));

        // this.setState({fiveDayForecast: fiveDayForecastArray.map((each) => each))};

        // all previous attempts to setState for the fiveDayForecast empty array failed. only when giving it indivdual elements did it work
        // omitting today (fiveDayForecastArray[0]).  Intending to handle this on hourly
        this.setState({
          fiveDayForecast: fiveDayForecastArray.slice(1), 
          hourlyForecast: hourlyForecastArray,
          currentWeather: [tempInF, condition] 
        }, () => {
          animationFunction(condition);
          console.log(`here's the five day forecast ${this.state.fiveDayForecast} ${this.state.hourlyForecast}`)
        });
      });
    return;
  }

  changeForecast = (event) => {
    
    if (event.target.dataset.name === "hourly") {
      console.log("changing forecast to hourly")
      this.setState({ forecastChosen: "hourly" });
    }
    else if (event.target.dataset.name === "fiveDay") {
      console.log("changing forecast to extended")
      this.setState({ forecastChosen: "extended" });
    }
    return;
  }

  handleHover = (event) => {
    console.log("handling hover...")
    if (this.state.forecastButtonHovered != undefined) {
      this.setState({ forecastButtonHovered: undefined });
    }
    else if (event.target.dataset.name === "hourly") {
      this.setState({ forecastButtonHovered: "hourly" });
    }
    else if (event.target.dataset.name === "fiveDay") {
      this.setState({ forecastButtonHovered: "fiveDay" });
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
                  weather={this.state.currentWeather}></CurrentWeather>
              </div>
              <div className="row">
                <ExtendedForecast
                  changeForecast={this.changeForecast}
                  forecastResults={this.state.fiveDayForecast}
                  hourlyResults={this.state.hourlyForecast}
                  hovered={this.state.forecastButtonHovered}
                  handleHover={this.handleHover}
                  forecastChosen={this.state.forecastChosen}
                  >
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
