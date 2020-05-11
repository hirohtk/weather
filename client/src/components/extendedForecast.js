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
                                <div className={props.hovered === "hourly" ? "hover forecastButton" : "forecastButton"} data-name="hourly" onClick={props.changeForecast}
                                onMouseEnter={props.handleHover}
                                onMouseLeave={props.handleHover}>
                                    Hourly
                                </div>
                            </div>
                            <div className="col l6">
                                <div className={props.hovered === "fiveDay" ? "hover forecastButton" : "forecastButton"} data-name="fiveDay"onClick={props.changeForecast}
                                onMouseEnter={props.handleHover}
                                onMouseLeave={props.handleHover}>
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