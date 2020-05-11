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
        this.setState({location: loc.slice(8).split(",")}, () => this.callAPI(this.state.location));
      })
    }
    geolocationFunction();
    return;
  }

  callAPI = (locationInAnArray) => {
    let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    console.log(`callAPI function yields ${locationInAnArray}`);
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${locationInAnArray[0]},${locationInAnArray[1]},${locationInAnArray[2]}&appid=${apiKey}`)
    .then(response => {
      console.log(response);
      let temp = response.data.main.temp;
      let tempInF = (1.8 * (temp - 273) + 32).toFixed();
      let condition = response.data.weather[0].main;
      this.setState({weather: [tempInF, condition]}, () => this.test());
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

  test = () => {
    window.human = false;


    var canvasEl = document.querySelector('.fireworks');

    function setCanvasSize() {
        canvasEl.width = window.innerWidth * 2;
        canvasEl.height = window.innerHeight * 2;
        canvasEl.style.width = window.innerWidth + 'px';
        canvasEl.style.height = window.innerHeight + 'px';
        canvasEl.getContext('2d').scale(2, 2);
    }


    //RAINNNNNNNNNNNNNNNNNNNNNNN
    var centerX = window.innerWidth;
    var centerY = window.innerHeight;
    var makeItRain = function () {
        //clear out everything
        console.log("it's supposed to be raining")
        // $('.rain').empty();

        var increment = 0;
        var drops = "";
        var backDrops = "";

        while (increment < 100) {
            //couple random numbers to use for various randomizations
            //random number between 98 and 1
            var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
            //random number between 5 and 2
            var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
            //increment
            increment += randoFiver;
            //add in a new raindrop with various randomizations to certain CSS properties
            drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
            backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        }

        $('.rain.front-row').append(drops);
        $('.rain.back-row').append(backDrops);
    }

    switch (this.state.weather[1]) {
        case ("Clouds"):
            makeItRain();
            break;
        default:
          console.log("default")
    }


    // $('.splat-toggle.toggle').on('click', function () {
    //     $('body').toggleClass('splat-toggle');
    //     $('.splat-toggle.toggle').toggleClass('active');
    //     //makeItRain();
    // });

    // $('.single-toggle.toggle').on('click', function () {
    //     $('body').toggleClass('single-toggle');
    //     $('.single-toggle.toggle').toggleClass('active');
    //     //makeItRain();
    // });

    $('.snow-toggle.toggle').on('click', function () {
        $('body').toggleClass('snow-toggle');
        $('.snow-toggle.toggle').toggleClass('active');
        init();
    });

    // $('.rain-toggle.toggle').on('click', function () {
    //     console.log("button clicked")
    //     $('body').toggleClass('rain-toggle');
    //     $('.rain-toggle.toggle').toggleClass('active');
    //     makeItRain();
    // });

    //----------------------------------------------------
    //SNOWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    var canvas = document.querySelector('.fireworks'),
        ctx = canvas.getContext('2d'),
        windowW = window.innerWidth,
        windowH = window.innerHeight,
        numFlakes = 200,
        flakes = [];

    function Flake(x, y) {
        var maxWeight = 5,
            maxSpeed = 3;

        this.x = x;
        this.y = y;
        this.r = randomBetween(0, 1);
        this.a = randomBetween(0, Math.PI);
        this.aStep = 0.01;


        this.weight = randomBetween(2, maxWeight);
        this.alpha = (this.weight / maxWeight);
        this.speed = (this.weight / maxWeight) * maxSpeed;

        this.update = function () {
            this.x += Math.cos(this.a) * this.r;
            this.a += this.aStep;

            this.y += this.speed;
        }

    }

    function init() {
        var i = numFlakes,
            flake,
            x,
            y;

        while (i--) {
            x = randomBetween(0, windowW, true);
            y = randomBetween(0, windowH, true);


            flake = new Flake(x, y);
            flakes.push(flake);
        }

        scaleCanvas();
        loop();
    }

    function scaleCanvas() {
        canvas.width = windowW;
        canvas.height = windowH;
    }

    function loop() {
        var i = flakes.length,
            z,
            dist,
            flakeA,
            flakeB;

        // clear canvas
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, windowW, windowH);
        ctx.restore();

        // loop of hell
        while (i--) {

            flakeA = flakes[i];
            flakeA.update();


            ctx.beginPath();
            ctx.arc(flakeA.x, flakeA.y, flakeA.weight, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + flakeA.alpha + ')';
            ctx.fill();

            if (flakeA.y >= windowH) {
                flakeA.y = -flakeA.weight;
            }
        }

        requestAnimationFrame(loop);
    }

    function randomBetween(min, max, round) {
        var num = Math.random() * (max - min + 1) + min;

        if (round) {
            return Math.floor(num);
        } else {
            return num;
        }
    }

    function distanceBetween(vector1, vector2) {
        var dx = vector2.x - vector1.x,
            dy = vector2.y - vector1.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    //init();

    //makeItRain();
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize, false);

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
