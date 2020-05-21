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
// import { animationFunction } from "./components/logic/animationLogic"
import moment from "moment";



class App extends React.Component {

  state = {
    location: [],
    now: "",
    currentWeather: [],
    hourlyForecast: [],
    fiveDayForecast: [],
    forecastButtonHovered: undefined,
    howManyForecastedDays: "",
    hourIncrement: 6,
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({now: moment().format('MMMM Do YYYY, h:mm:ss a')});
    }, 1000);
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
          obj.date = moment(response.data.forecast.forecastday[i].date).format('ll');
          obj.dayOfWeek = moment(obj.date).format('dddd');
          obj.avgTempF = response.data.forecast.forecastday[i].day.avgtemp_f;
          obj.rainProbability = response.data.forecast.forecastday[i].day.daily_chance_of_rain;
          obj.condition = response.data.forecast.forecastday[i].day.condition.text;
          fiveDayForecastArray.push(obj);
        }
        console.log(`five day forecast array is ${fiveDayForecastArray}`);

        let hourlyForecastArray = [];
        // FOR 5 DAYS HOURLY DATA
        for (let k = 0; k < response.data.forecast.forecastday.length; k++) {
          console.log(`doing day ${k} now`)
          for (let j = 0; j < response.data.forecast.forecastday[k].hour.length; j += this.state.hourIncrement) {
              let obj = {};
              obj.date = moment(response.data.forecast.forecastday[k].hour[j].time).format('MMMM Do YYYY');
              obj.time = moment(response.data.forecast.forecastday[k].hour[j].time).format('h:mm a');
              obj.dayOfWeek = moment(response.data.forecast.forecastday[k].date).format('dddd');
              obj.tempF = response.data.forecast.forecastday[k].hour[j].temp_f;
              obj.rainProbability = response.data.forecast.forecastday[k].hour[j].chance_of_rain;
              obj.condition = response.data.forecast.forecastday[k].hour[j].condition.text;
              hourlyForecastArray.push(obj);
          }
        }
        // FOR ONE DAY HOURLY DATA
        // for (let j = 0; j < response.data.forecast.forecastday[0].hour.length; j += 6) {
        //   console.log(j)
        //     let obj = {};
        //     obj.date = response.data.forecast.forecastday[0].hour[j].time;
        //     obj.tempF = response.data.forecast.forecastday[0].hour[j].temp_f;
        //     obj.rainProbability = response.data.forecast.forecastday[0].hour[j].chance_of_rain;
        //     obj.condition = response.data.forecast.forecastday[0].hour[j].condition.text;
        //     hourlyForecastArray.push(obj);
        // }
        console.log(`hourly forecast array is ${hourlyForecastArray}, length is ${hourlyForecastArray.length}`);
        this.setState({
          fiveDayForecast: fiveDayForecastArray.slice(1),
          hourlyForecast: hourlyForecastArray,
          currentWeather: [tempInF, condition],
          howManyForecastedDays: response.data.forecast.forecastday.length,
        }, () => {
          animationFunction(condition);
          console.log(`here's the five day forecast ${this.state.fiveDayForecast} ${this.state.hourlyForecast}`);
          console.log(`currentWeather is ${this.state.currentWeather}`)
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
        <Nav
        // Splitting moment's result at the comma (.split gives an array)
        time={this.state.now.split(",")[1]}></Nav>
        <div className="container">
          <div className="row">
            <Animation
              weather={this.state.currentWeather}>
            </Animation>
            <div className="boxForEverything">
              <div className="row">
                <CurrentWeather
                // Splitting moment's result at the comma (.split gives an array)
                now={this.state.now.split(",")[0]}
                  location={this.state.location}
                  weather={this.state.currentWeather}><p>{this.state.CurrentWeather}</p></CurrentWeather>
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
