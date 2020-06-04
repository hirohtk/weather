import React from 'react';
import "./currentWeather.css"
import {iconLogic} from "./logic/iconLogic";

function CurrentWeather(props) {

    return (
        <>
            <div className="outerCurrentWeatherBox">
                <h5 className="whiteText">Current Weather for {props.now}</h5>
                <div className="currentWeatherBox">
                    <p className="whiteText">{props.location}</p>
                    <p className="whiteText">{props.weather[0]}F</p>
                    <p className="whiteText">{props.weather[1]}</p>
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