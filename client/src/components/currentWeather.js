import React from 'react';
import "./currentWeather.css"
import { iconLogic } from "./logic/iconLogic";
import moment from "moment";


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