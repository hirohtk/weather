import React from 'react';
import "./currentWeather.css"
import { iconLogic } from "./logic/iconLogic";


function CurrentWeather(props) {

    return (
        <>
            <div className="outerCurrentWeatherBox">
                <div className="weather-side">
                    <div className="weather-gradient"></div>
                    {/* <h2 className="date-dayname">Tuesday</h2> */}
                    {/* <span class="date-day">15 Jan 2019</span> */}
                    <h5 className="testText">{props.location}</h5>
                    {
                        props.weather[1] === undefined ? <></> : <span>{iconLogic(props.weather[1])}</span>
                    }
                    <p className="whiteTextInfo">{props.weather[0]} &#xb0;F</p>
                    <p className="whiteTextInfo">{props.weather[1]}</p>
                </div>
                <div className="weatherInfo">
                <div className="weather-gradient"></div>
                    <p className="whiteTextInfo"><span className="whiteTextInfo2">Humidity:</span> {props.weather[2]}%</p>
                    <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Speed:</span> {props.weather[3]}mph</p>
                    <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Direction:</span> {props.weather[4]}</p>
                    <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Degree:</span> {props.weather[5]}</p>
                </div>

                {props.clock}

            </div>
            

            {/* <div className="outerCurrentWeatherBox">
                <h5 className="testText">Current Weather for {props.now}</h5>
                <div className="currentWeatherBox">
                    <p className="fontSizing">{props.location}</p>
                    <p className="whiteTextInfo">{props.weather[0]}F</p>
                    <p className="whiteTextInfo">{props.weather[1]}</p>
                    {
                        props.weather[1] === undefined ? <></> : <span>{iconLogic(props.weather[1])}</span>
                    }
                </div>
            </div> */}


        </>
    )
}

export default CurrentWeather;