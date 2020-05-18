import React from 'react';
import "./currentWeather.css"


function CurrentWeather(props) {

    return (
        <>
            <div className="outerCurrentWeatherBox">
                <h5 className="whiteText">Current Weather for {props.now}</h5>
                <div className="currentWeatherBox">
                    <p className="whiteText">{props.location}</p>
                    <p className="whiteText">{props.weather[0]}F</p>
                    <p className="whiteText">{props.weather[1]}</p>
                </div>
            </div>

        </>
    )
}

export default CurrentWeather;