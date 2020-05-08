import React from 'react';
import "./extendedForecast.css"

function ExtendedForecast(props) {

    return (
        <>
            <div className="outerForecastBox">
                <h5 className="whiteText">Extended Forecast</h5>
                <div className="forecastBox">
                    <div className="row">
                        <div id="forecastOptions" className="whiteText">
                            <div className="col l6">
                                <div className="forecastButton" data-name="hourly" onClick={props.changeForecast}>
                                    Hourly
                                </div>
                            </div>
                            <div className="col l6">
                                <div className="forecastButton" data-name="fiveDay"onClick={props.changeForecast}>
                                    5 Day
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div id="forecastResults" className="whiteText">
                            <span>{props.forecastResults}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExtendedForecast;