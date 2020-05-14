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
                                    Hourly for Today
                                </div>
                            </div>
                            <div className="col l6">
                                <div className={props.hovered === "fiveDay" ? "hover forecastButton" : "forecastButton"} data-name="fiveDay" onClick={props.changeForecast}
                                    onMouseEnter={props.handleHover}
                                    onMouseLeave={props.handleHover}>
                                    4 Day
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div id="forecastResults" className="whiteText">
                            { props.forecastChosen === "hourly" ? 
                            props.hourlyResults.map((each) => (
                                    <div className="col l3 forecastDay">
                                        <h5>{each.date.slice(11)}</h5>
                                        <p>Temperature: {each.tempF}F</p>
                                        <p>Rain Probability: {each.rainProbability}%</p>
                                        <p>{each.condition}</p>
                                    </div>
                                )) 
                            : props.forecastChosen === "extended" ?
                            props.forecastResults.map((each) => (
                                <div className="col l3 forecastDay">
                                    <h5>{each.dayOfWeek}, {each.date}</h5>
                                    <p>Average Temperature: {each.avgTempF}F</p>
                                    <p>Rain Probability: {each.rainProbability}%</p>
                                    <p>{each.condition}</p>
                                </div>
                            )) : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExtendedForecast;