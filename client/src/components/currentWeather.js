import React from 'react';
import "./currentWeather.css"

function CurrentWeather() {

    return (
        <>

            <div className="outerCurrentWeatherBox">
                <h4 className="whiteText">Current Weather</h4>
                <div className="currentWeatherBox">
                    <p className="whiteText">55</p>
                </div>
            </div>

        </>
    )
}

export default CurrentWeather;