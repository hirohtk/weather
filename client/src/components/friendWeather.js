import React from 'react';
import "./friendWeather.css"
import { iconLogic } from "./logic/iconLogic";


function FriendWeather(props) {

    return (
        <>
                <div className="friendWeather">
                    <div className="weather-gradient-friend"></div>
                    <h5 className="viewingFor">Viewing weather for {props.friendUsername}!</h5>
                    <h5 className="testText">{props.friendLocation}</h5>
                    {
                        props.friendCurrentWeather[1] === undefined ? <></> : <span>{iconLogic(props.friendCurrentWeather[1])}</span>
                    }
                    <p className="whiteTextInfo">{props.friendCurrentWeather[0]} &#xb0;F</p>
                    <p className="whiteTextInfo">{props.friendCurrentWeather[1]}</p>
                </div>
        </>
    )
}

export default FriendWeather;