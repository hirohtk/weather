import React from 'react';
import "./friendWeather.css"
import { iconLogic } from "./logic/iconLogic";


function FriendWeather(props) {

    return (
        <>
                <div className="weather-side">
                    <div className="weather-gradient"></div>
                    <h5 className="viewingFor">Viewing weather for {props.friend}!</h5>
                    {/* <h5 className="testText">{props.location}</h5>
                    {
                        props.weather[1] === undefined ? <></> : <span>{iconLogic(props.weather[1])}</span>
                    }
                    <p className="whiteTextInfo">{props.weather[0]} &#xb0;F</p>
                    <p className="whiteTextInfo">{props.weather[1]}</p> */}
                </div>
        </>
    )
}

export default FriendWeather;