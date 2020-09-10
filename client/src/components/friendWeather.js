import React from 'react';
import "./friendWeather.css"
import { iconLogic } from "./logic/iconLogic";

function FriendWeather(props) {

    return (
        <>
            <div className="friendWeather">
                <div className="weather-side">
                    <div className="weather-gradient-friend">
                    <img src={props.friendLocationImage} id="smallLocationImage"></img>
                        <h5 className="viewingFor">Viewing weather for {props.friendUsername}!</h5>
                        <h5 className="testText">{props.friendLocation}</h5>
                        {
                            props.friendCurrentWeather.condition === undefined ? <></> : <span>{iconLogic(props.friendCurrentWeather.condition)}</span>
                        }
                        <p className="whiteTextInfo">{props.metric === true ? props.friendCurrentWeather.tempInC : props.friendCurrentWeather.tempInF}{props.metric === true? "C" : "F"}</p>
                        <p className="whiteTextInfo">{props.friendCurrentWeather.condition}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendWeather;