import React from 'react';
import "./friendWeather.css"
import { iconLogic } from "./logic/iconLogic";


function FriendWeather(props) {

    return (
        <>
                <div className="friendWeather">
                    <div className="weather-gradient-friend"></div>
                    <h5 className="viewingFor">Viewing weather for {props.friendUsername}!</h5>
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