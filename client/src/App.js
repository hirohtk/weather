import React from 'react';
import Nav from "./components/nav"
import CurrentWeather from "./components/currentWeather"
import ExtendedForecast from "./components/extendedForecast"
import FriendsModule from "./components/friendsModule"
import FriendWeather from "./components/friendWeather"
import './App.css';
import "./components/unsorted.css"
import Axios from 'axios';
import moment from "moment";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      location: [],
      today: "",
      currentWeather: [],
      hourlyForecast: [],
      fiveDayForecast: [],
      howManyForecastedDays: "",
      hourIncrement: 6,
      locationImage: "",
      loggedIn: false,
      currentUser: [],
      coordinates: [],
      showFriendWeather: false,

      friendUsername: "",
      friendCoordinates: [],
      friendLocation: [],
      friendLocationImage: "",
      friendCurrentWeather: [],
      windowWidth: window.innerWidth,
      metric: false,
    }
    
    this.socket = io("localhost:3001");

    // this.checkENV();
  }

  // fires before component modules have mounted
  componentWillMount() {
    // initial function call so that mobile can be true or false to begin
    this.handleResize();
  }

  // fires only after component modules have mounted
  componentDidMount() {
    this.getWeatherData("self");
      this.checkForCookies(() => {
        this.setState({ today: moment().format('MMMM Do YYYY, h:mm:ss a') });
        // console.log(`app.js loaded`)
        window.addEventListener("resize", this.handleResize);
      })
  }

  // checkENV = () => {
  //   if (process.env.NODE_ENV === 'production') {
  //     console.log(`production environment`)
  //     return "https://immense-cove-75264.herokuapp.com/"
  //   }
  //   else {
  //     console.log(`dev envrionment`) 
  //     return "localhost:3001"
  //   }
  // }

  checkForCookies = () => {
    // checks whether or not there is data in cookie
    let cookies = decodeURIComponent(document.cookie);
    let cookieArray = cookies.split(";");
    let theCookie = cookieArray.find(one => one.includes("oauth"));
    console.log(`the Cookie is ${theCookie}`);
    if (theCookie != undefined) {
      //  oauth={"coordinates":[],"_id":"5f7bedf049a81741f40faa80","googleID":"103106405171762584134","username":"Kensen Hirohata","userImage":"https://lh4.googleusercontent.com/-fDDlCT7NC0Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckZN6Zbi2jE8mGFk1eEm1MdtSrAGg/photo.jpg","__v":0"
      let creds = {};
      // split string by commas above
      let splitCookie = theCookie.split(",");
      // split the product by the colon (product are arrays)
      let subSplitId = splitCookie[1].split(":");
      let subSplitUsername = splitCookie[3].split(":");
      // For userImage, splits into three indexes since there's also a colon in https://
      let subSplitUserImage = splitCookie[4].split(":");
      // slice the extra "" from the ends of the index containing username or id
      creds.id = subSplitId[1].slice(1, subSplitId[1].length - 1);
      creds.username = subSplitUsername[1].slice(1, subSplitUsername[1].length - 1);
      creds.userImage = "https:" + subSplitUserImage[2].slice(0, subSplitUserImage[2].length - 1);
      // will run async while time and getWeatherData fire
      this.handleLogin(creds, "login");    
    }
  }

  handleResize = () => {
    console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
    this.setState({ windowWidth: window.innerWidth }, () => {
      if (this.state.windowWidth < 991) {
        this.setState({ mobile: true });
      }
      else {
        this.setState({ mobile: false })
      }
    });
  }

  getWeatherData = (forWho) => {

    var latitude;
    var longitude;

    let geolocationFunction = () => {

      let geoSuccess = (position) => {
        console.log("Geoposition gives " + position.coords.latitude + " for latitutde");
        console.log("Geoposition gives " + position.coords.longitude + " for longitude");
        if (forWho === "self") {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          this.setState({ coordinates: [latitude, longitude] }, () => googleAPI(latitude, longitude));
        }
        else {
          // console.log(`your friend's coordinates are ${this.state.friendCoordinates[0]} and ${this.state.friendCoordinates[1]}`)
          latitude = this.state.friendCoordinates[0];
          longitude = this.state.friendCoordinates[1];
          googleAPI(latitude, longitude);
        }
      }
      navigator.geolocation.getCurrentPosition(geoSuccess);
    }

    let googleAPI = (latitude, longitude) => {
      let apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      console.log(latitude, longitude)
      Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${apiKey}`)
        .then(response => {
          let ind;
          for (let i = 0; i < response.data.results[0].address_components.length; i++) {
            if (response.data.results[0].address_components[i].types[0] === "locality") {
              ind = i;
            }
          }
          let longformLoc = response.data.plus_code.compound_code.slice(8).split(",");
          let loc = response.data.results[0].address_components[ind].long_name + ", " + response.data.results[0].address_components[ind + 2].long_name;
          // console.log(`new LOC is$ {loc}`);
          Axios.get(`/api/googleplaces/${loc}`).then(response => {
            // console.log(`google place API response from BACKEND is ${response.data}`)
            let image = response.data;
            // console.log(image);
            if (forWho === "self") {
              this.setState({ location: longformLoc, locationImage: image }, () => this.callAPI(latitude, longitude, "self"));
            }
            else {
              this.setState({ friendLocation: longformLoc, friendLocationImage: image }, () => this.callAPI(latitude, longitude, "friend"));
            }
          })
        })
    }
    geolocationFunction();
  }

  callAPI = (lat, lng, forWho) => {
    let apiKey = process.env.REACT_APP_NEW_WEATHER_API_KEY;
    // console.log(`calling new weather API`);
    Axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lng}&days=5`)
      .then(response => {
        console.log(response);
        let tempInF = response.data.current.temp_f;
        let tempInC = response.data.current.temp_c;
        let condition = response.data.current.condition.text;
        let windDirection = response.data.current.wind_dir;
        let windSpeed = response.data.current.wind_mph;
        let windDegree = response.data.current.wind_degree;
        let humid = response.data.current.humidity;
        let uvIndex = response.data.current.uv;

        let getFiveDay = () => {
          let fiveDayForecastArray = [];
          for (let i = 0; i < response.data.forecast.forecastday.length; i++) {
            let obj = {};
            obj.date = moment(response.data.forecast.forecastday[i].date).format('ll');
            obj.dayOfWeek = moment(obj.date).format('dddd');
            obj.avgTempF = response.data.forecast.forecastday[i].day.avgtemp_f;
            obj.avgTempC = response.data.forecast.forecastday[i].day.avgtemp_c;
            obj.rainProbability = response.data.forecast.forecastday[i].day.daily_chance_of_rain;
            obj.condition = response.data.forecast.forecastday[i].day.condition.text;
            fiveDayForecastArray.push(obj);
          }
          return fiveDayForecastArray.slice(1);
        }

        // console.log(`five day forecast array is ${fiveDayForecastArray}`);
        let getHourly = () => {
          let hourlyForecastArray = [];
          // FOR 5 DAYS HOURLY DATA
          for (let k = 0; k < response.data.forecast.forecastday.length; k++) {
            // console.log(`doing day ${k} now`)
            for (let j = 0; j < response.data.forecast.forecastday[k].hour.length; j += this.state.hourIncrement) {
              let obj = {};
              obj.date = moment(response.data.forecast.forecastday[k].hour[j].time).format('MMMM Do YYYY');
              obj.time = moment(response.data.forecast.forecastday[k].hour[j].time).format('h:mm a');
              obj.dayOfWeek = moment(response.data.forecast.forecastday[k].date).format('dddd');
              obj.tempF = response.data.forecast.forecastday[k].hour[j].temp_f;
              obj.tempC = response.data.forecast.forecastday[k].hour[j].temp_c;
              obj.rainProbability = response.data.forecast.forecastday[k].hour[j].chance_of_rain;
              obj.condition = response.data.forecast.forecastday[k].hour[j].condition.text;
              hourlyForecastArray.push(obj);
            }
          }
          return hourlyForecastArray;
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
        // console.log(`hourly forecast array is ${hourlyForecastArray}, length is ${hourlyForecastArray.length}`);

        if (forWho === "self") {
          this.setState({
            fiveDayForecast: getFiveDay(),
            hourlyForecast: getHourly(),
            // currentWeather: [tempInF, condition, humid, windSpeed, windDirection, windDegree, uvIndex],
            currentWeather: {
              tempInF: tempInF,
              tempInC: tempInC,
              condition: condition,
              humid: humid,
              windSpeed: windSpeed,
              windDirection: windDirection,
              windDegree: windDegree,
              uvIndex: uvIndex
            },
            howManyForecastedDays: response.data.forecast.forecastday.length,
          });
        }
        else {
          this.setState({
            friendCurrentWeather: {
              tempInF: tempInF,
              tempInC: tempInC,
              condition: condition,
              humid: humid,
              windSpeed: windSpeed,
              windDirection: windDirection,
              windDegree: windDegree,
              uvIndex: uvIndex
            }
          })
        }
      });
  }

  setLastKnownCoords = () => {
    // 6/22/20:  IF USER LOGS IN BEFORE THE COMPONENT MOUNTS (i.e. handleLogin fires before component mounts and runs, currentUser[1] will be null)
    // console.log(`just to make sure, these are my coordinates ${this.state.coordinates}`);
    Axios.put(`/api/updatecoords/${this.state.currentUser[1]}`, { coordinates: this.state.coordinates }).then(response => {
      // console.log(`your last known coordinates were updated in the db`);
      // console.log(response)
    })
  }

  handleLogin = (credentials, doWhich) => {
    // login
    console.log(`credentials for logging in are ${JSON.stringify(credentials)}`)
    if (doWhich === "login") {
      this.setState({ currentUser: [credentials.username, credentials.id, credentials.userImage], loggedIn: true }, () => {
        this.setLastKnownCoords();
      })
    }
    else {
      // for Oauth Logout
      if (document.cookie) {
        // Delete the cookie
        document.cookie = "oauth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
      // console.log(`logging out, emitting socket for leaveRoom, current userID is ${this.state.currentUser[1]}`);
      this.socket.emit("leaveRoom", this.state.currentUser[1]);
      // if this works, should manually also close the socket, preventing the same socket from being used if you use a different account
      this.socket.close();
      this.socket.open();
      this.setState({ currentUser: [], loggedIn: false, showFriendWeather: false });
    }
  }
  // THIS IS FOR FRIENDS MODULE, WHICH WILL RUN ON CLICKING FRIEND, TRIGGERING STATE CHANGE AND TERNARY BELOW TO SHOW FRIEND WEATHER
  getFriendInfo = (username, friendID) => {
    // console.log(`should be resetting friendCoordinates`)
    this.setState({ showFriendWeather: true, friendUsername: username, friendCoordinates: [] }, () => {
      Axios.get(`/api/getfriendcoords/${friendID}`).then(response => {
        // console.log(`your friend, ${username} has coordinates of ${JSON.stringify(response)}`);
        this.setState({ friendCoordinates: response.data.coordinates }, () => this.getWeatherData("friend"));
      })
    })
  }

  closeFriend = () => this.setState({ showFriendWeather: false });

  changeUnits = () => {
    console.log(`changing units`)
    if (this.state.metric === false) {
      this.setState({ metric: true }, () => console.log(`set units to metric, state is now ${this.state.metric} which should be true`));
    }
    else {
      this.setState({ metric: false }, () => console.log(`set units to SI, state is now ${this.state.metric} which should be false`));
    }
  }

  render() {
    return (
      <div className="App">
        <Nav
          loggedIn={this.state.loggedIn}
          handleLogin={this.handleLogin}
          currentUser={this.state.currentUser}
          changeUnits={this.changeUnits}
        ></Nav>
        <FriendsModule
          loggedIn={this.state.loggedIn}
          currentUser={this.state.currentUser}
          loadFriends={this.loadFriends}
          addFriend={this.addFriend}
          friendsList={this.state.friendsList}
          provideFriendInfo={this.getFriendInfo}
          closeFriend={this.closeFriend}
          socket={this.socket}
          mobile={this.state.mobile}
        ></FriendsModule>
        <div className="container">
          {this.state.mobile ? <></> : <img src={this.state.locationImage} id="backgroundImage"></img>}
          <div className="row">
            <div className="boxForEverything">
              {/* Note: doing screen width render ternary, if mobile, don't show current weather when 
              chatting with a friend, only show friend weather.  When desktop, use original rendering rules */}
              <div className="row">
                {
                  this.state.mobile && this.state.showFriendWeather ?
                    <>
                      <FriendWeather
                        friendUsername={this.state.friendUsername}
                        friendLocation={this.state.friendLocation}
                        friendLocationImage={this.state.friendLocationImage}
                        friendCurrentWeather={this.state.friendCurrentWeather}
                        metric={this.state.metric}
                      >
                      </FriendWeather>
                      <CurrentWeather
                        // Splitting moment's result at the comma (.split gives an array)
                        today={this.state.today.split(",")[0]}
                        location={this.state.location}
                        weather={this.state.currentWeather}
                        image={this.state.locationImage}
                        mobile={this.state.mobile}
                        showFriendWeather={this.state.showFriendWeather}
                        metric={this.state.metric}
                      ><p>{this.state.CurrentWeather}</p>
                      </CurrentWeather>
                    </>
                    :
                    <>
                      {<div className={this.state.mobile && this.state.showFriendWeather ? "" : "col l6"}>
                        <CurrentWeather
                          // Splitting moment's result at the comma (.split gives an array)
                          today={this.state.today.split(",")[0]}
                          location={this.state.location}
                          weather={this.state.currentWeather}
                          image={this.state.locationImage}
                          mobile={this.state.mobile}
                          metric={this.state.metric}
                        ><p>{this.state.CurrentWeather}</p>
                        </CurrentWeather>
                      </div>}
                      <div className="col l4">
                        {this.state.showFriendWeather ?
                          <FriendWeather
                            friendUsername={this.state.friendUsername}
                            friendLocation={this.state.friendLocation}
                            friendCurrentWeather={this.state.friendCurrentWeather}
                            metric={this.state.metric}
                          >
                          </FriendWeather>
                          : <></>}
                      </div>
                    </>
                }
              </div>
              <div className="row">
                <ExtendedForecast
                  changeForecast={this.changeForecast}
                  forecastResults={this.state.fiveDayForecast}
                  hourlyResults={this.state.hourlyForecast}
                  forecastChosen={this.state.forecastChosen}
                  mobile={this.state.mobile}
                  windowWidth={this.state.windowWidth}
                  metric={this.state.metric}
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
