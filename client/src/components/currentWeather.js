import React from 'react';
import "./currentWeather.css"
import { iconLogic } from "./logic/iconLogic";

function CurrentWeather(props) {

    console.log(`metric in currentWeather props is ${props.metric}`)

    return (
        <>
            <div className="outerCurrentWeatherBox">
                <div className="weather-side">
                    {props.mobile? <img src={props.image} id="smallLocationImage"></img> : <></>}
                    <div className="weather-gradient"></div>
                    <h5 className="testText">{props.location}</h5>
                    {
                        props.weather.condition === undefined ? <></> : <span id={props.mobile ? "bumpIcon" : ""}>{iconLogic(props.weather.condition)}</span>
                    }
                    <p className="whiteTextInfo">{props.metric === true ? props.weather.tempInC : props.weather.tempInF}{props.metric === true ? "C" : "F"}</p>
                    <p className="whiteTextInfo">{props.weather.condition}</p>
                </div>
                {!props.mobile ? <div className="weatherInfo">
                    <div className="weather-gradient"></div>
                    <div className="tooltip">
                        <span className="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Humidity</span> is the concentration of water vapour present in the air!</span></span>
                        <p className="whiteTextInfo"><span className="whiteTextInfo2">Humidity: </span> {props.weather.humid}%</p>
                    </div>

                    <div className="tooltip">
                        <span className="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Wind speed</span> is a fundamental atmospheric quantity caused by air moving from high to low pressure, usually due to changes in temperature.
                        </span></span>
                        <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Speed: </span> {props.weather.windSpeed}mph</p>
                    </div>

                    <div className="tooltip">
                        <span className="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Wind direction</span> is reported by the direction from which it originates.</span></span>
                        <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Direction: </span> {props.weather.windDirection}</p>
                    </div>

                    <div className="tooltip">
                        <span className="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Wind degree</span> describes the direction from which the wind emanates.</span></span>
                        <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Degree: </span> {props.weather.windDegree}</p>
                    </div>
                    <div className="tooltip">
                        <span className="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">UV Index</span> provides a daily forecast of the expected intensity of ultraviolet (UV) radiation from the sun.</span></span>
                        <p className="whiteTextInfo"><span className="whiteTextInfo2">UV Index: </span> {props.weather.uvIndex}/10</p>
                    </div>
                </div> : <></>
                }

            </div>
            {props.mobile ? <div id="forMobileHorizontal">
                <div className="weatherInfo">
                    <div className="weather-gradient"></div>
                    <table>
                        <tr>
                            <td>
                                <div className="tooltip">
                                    <span className="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Humidity</span> is the concentration of water vapour present in the air!</span></span>
                                    <p className="whiteTextInfo"><span className="whiteTextInfo2">Humidity: </span> {props.weather.humid}%</p>
                                </div>
                            </td>
                            <td>
                                <div className="tooltip">
                                    <span className="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Wind speed</span> is a fundamental atmospheric quantity caused by air moving from high to low pressure, usually due to changes in temperature.
                        </span></span>
                                    <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Speed: </span> {props.weather.windSpeed}mph</p>
                                </div>
                            </td>
                            <td>
                                <div className="tooltip">
                                    <span class="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Wind direction</span> is reported by the direction from which it originates.</span></span>
                                    <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Direction: </span> {props.weather.windDirection}</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="tooltip">
                                    <span class="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">Wind degree</span> describes the direction from which the wind emanates.</span></span>
                                    <p className="whiteTextInfo"><span className="whiteTextInfo2">Wind Degree: </span> {props.weather.windDegree}</p>
                                </div>
                            </td>
                            <td>
                                <div className="tooltip">
                                    <span class="tooltiptext"><span className="whiteTextToolTip"><span className="whiteTextToolBold">UV Index</span> provides a daily forecast of the expected intensity of ultraviolet (UV) radiation from the sun.</span></span>
                                    <p className="whiteTextInfo"><span className="whiteTextInfo2">UV Index: </span> {props.weather.uvIndex}/10</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div> : <></>}
        </>
    )
}

export default CurrentWeather;