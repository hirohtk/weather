import React from 'react';
import "./currentWeather.css"

function CurrentWeather() {


    return (
        <>
            <div className="outerCurrentWeatherBox">
                <h5 className="whiteText">Current Weather</h5>
                <div className="currentWeatherBox">
                    <p className="whiteText">55</p>
                </div>
            </div>

        </>
    )
}

export default CurrentWeather;