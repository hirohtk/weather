import React from 'react';
import "./extendedForecast.css"

function ExtendedForecast(props) {

    return (
        <>
            <div className="outerForecastBox">
                <h5 className="whiteText">Extended Forecast</h5>
                <div className="forecastBox">
                    <div className="row">
                        <div id="forecastOptions">
                            <span>7 Day</span><span>10 Day</span><span>14 Day</span>
                        </div>
                    </div>
                    <div className="row">
                        <div id="forecastResults">
                            <span>yes</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExtendedForecast;