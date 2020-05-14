import React from 'react';
import "./extendedForecast.css"
import Sun from "./icons/sun.js";
import Clouds from "./icons/clouds.js"
import Flurries from "./icons/flurries.js"
import Rainie from "./icons/rainie.js"
import Sunrain from "./icons/sunrain.js"
import Thunder from "./icons/thunder.js"

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
                                <div className={props.hovered === "fiveDay" ? "hover forecastButton" : "forecastButton"} data-name="fiveDay" onClick={props.changeForecast}
                                    onMouseEnter={props.handleHover}
                                    onMouseLeave={props.handleHover}>
                                    5 Day
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div id="forecastResults" className="whiteText">
                            
                            <Sun></Sun>
                            
                            
                            {/* {
                                props.forecastResults.map((each) => (
                                    <p>{each.date}, {each.avgTempF}, {each.rainProbability}, {each.condition}</p>
                                ))
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExtendedForecast;