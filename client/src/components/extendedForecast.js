import React from 'react';
import "./extendedForecast.css"
// import { PromiseProvider } from 'mongoose';
import {colorLogic} from "./logic/colorLogic";
import {iconLogic} from "./logic/iconLogic";

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
                                    4 Day
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div id={props.forecastChosen === "hourly" ? "forecastResults" : ""} className="whiteText">
                            {props.forecastChosen === "hourly" ?
                                props.hourlyResults.map((each) => ( 
                                    <div className="forecastDayHourly" style={colorLogic(each.dayOfWeek)}>
                                        <h5>{each.dayOfWeek}, {each.time}</h5>
                                        <p>{each.date}</p>
                                        <p>Temperature: {each.tempF}F</p>
                                        <p>Rain Probability: {each.rainProbability}%</p>
                                        <p>{each.condition}</p>
                                        <span>{iconLogic(each.condition)}</span>
                                    </div>
                                ))
                                : props.forecastChosen === "extended" ?
                                    props.forecastResults.map((each) => (
                                        <div className="col l3 forecastDayExtended" style={colorLogic(each.dayOfWeek)}>
                                            <h5>{each.dayOfWeek}, {each.date}</h5>
                                            <p>Average Temperature: {each.avgTempF}F</p>
                                            <p>Rain Probability: {each.rainProbability}%</p>
                                            <p>{each.condition}</p>
                                            <span>{iconLogic(each.condition)}</span>
                                        </div>
                                    )) : ""
                            }
                        </div>
                        {/* <div id="forecastResults" className="whiteText">
                            <div class="carousel">
                                {props.forecastChosen === "hourly" ?
                                    props.hourlyResults.map((each) => (
                                        <a class="carousel-item">
                                            <div className="forecastDay">
                                            <h5>{each.date.slice(11)}</h5>
                                            <p>Temperature: {each.tempF}F</p>
                                            <p>Rain Probability: {each.rainProbability}%</p>
                                            <p>{each.condition}</p>
                                        </div>
                                        </a>
                                    ))
                                    : props.forecastChosen === "extended" ?
                                        props.forecastResults.map((each) => (
                                            <a class="carousel-item" >
                                                <div className="forecastDay">
                                                <h5>{each.dayOfWeek}, {each.date}</h5>
                                                <p>Average Temperature: {each.avgTempF}F</p>
                                                <p>Rain Probability: {each.rainProbability}%</p>
                                                <p>{each.condition}</p>
                                            </div>
                                            </a>
                                        )) : ""
                                }
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExtendedForecast;