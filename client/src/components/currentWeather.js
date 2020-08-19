import React from 'react';
import "./currentWeather.css"
import { iconLogic } from "./logic/iconLogic";


function CurrentWeather(props) {

    return (
        <>
            <div className="outerCurrentWeatherBox">
                <div className="weather-side">
                {props.windowWidth < 451 ? <img src={props.image} id="smallLocationImage"></img> : <></>}
                    <div className="weather-gradient"></div>
                    {/* <h2 className="date-dayname">Tuesday</h2> */}
                    {/* <span class="date-day">15 Jan 2019</span> */}
                    <h5 className="testText">{props.location}</h5>
                    {
                        props.weather[1] === undefined ? <></> : <span id={props.windowWidth < 451 ? "bumpIcon" : ""}>{iconLogic(props.weather[1])}</span>
                    }
                    <p className="whiteTextInfo">{props.weather[0]} &#xb0;F</p>
                    <p className="whiteTextInfo">{props.weather[1]}</p>
                </div>
                {props.windowWidth < 451 && props.showFriendWeather === true ? <></> :
                <div className="weatherInfo">
                <div className="weather-gradient"></div>
                {/* <a class="btn tooltipped" data-position="bottom" data-tooltip="I am a tooltip">Hover me!</a> */}
                    <div className="tooltip">
                        <span className="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Humidity</span> is the concentration of water vapour present in the air!</span></span>
                        <p className="whiteTextInfo"><span className="whiteTextInfo2">Humidity: </span> {props.weather[2]}%</p>
                    </div>

                    <div className="tooltip">
                        <span className="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Wind speed</span> is a fundamental atmospheric quantity caused by air moving from high to low pressure, usually due to changes in temperature.
                        </span></span>
                        <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Speed: </span> {props.weather[3]}mph</p>
                    </div>

                    <div className="tooltip">
                        <span class="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Wind direction</span> is reported by the direction from which it originates.</span></span>
                        <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Direction: </span> {props.weather[4]}</p>
                    </div>

                    <div className="tooltip">
                        <span class="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Wind degree</span> describes the direction from which the wind emanates.</span></span>
                        <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Degree: </span> {props.weather[5]}</p>
                    </div>
                    <div className="tooltip">
                        <span class="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">UV Index</span> provides a daily forecast of the expected intensity of ultraviolet (UV) radiation from the sun.</span></span>
                        <p className="whiteTextInfo"><span className="whiteTextInfo2">UV Index: </span> {props.weather[6]}/10</p>
                    </div>
                </div>
                }
                
            </div>
        </>
    )
}

export default CurrentWeather;