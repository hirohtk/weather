import React from 'react';
import "./currentWeather.css"
import {iconLogic} from "./logic/iconLogic";

function CurrentWeather(props) {

    return (
        <>
            <div className="outerCurrentWeatherBox">
                <h5 className="testText">Current Weather for {props.now}</h5>
                <div className="currentWeatherBox">
                    <p className="fontSizing">{props.location}</p>
                    <p className="whiteTextInfo">{props.weather[0]}F</p>
                    <p className="whiteTextInfo">{props.weather[1]}</p>
                    {
                        props.weather[1] === undefined ? <></> : <span>{iconLogic(props.weather[1])}</span>
                    }
                    {/* <img src={props.image}></img> */}
                </div>
            </div>

        </>
    )
}

export default CurrentWeather;