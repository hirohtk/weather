import React from 'react';
import "./rain.css"
import "./icons.css"
import "./cloudAnimation.css"
import SunAnimation from './sunAnimation';

function Animation(props) {
    console.log(`is this loading out of order? ${props.weather[1]}`)
    return (
        <div className="Scott">

            {/* FOR NOW TO TEST, PUT ACTUAL CURRENT CONDITION  */}
            {/* Snonw */}
            {/* {props.weather[1] === undefined ? <></> : props.weather[1].includes("Partly cloudy") ? <canvas className="fireworks" id="myFireworks"></canvas> : <></>} */}

            {/* Rain */}
            {/* {props.weather[1] === undefined ? <></> : props.weather[1].includes("Party cloudy") ?
                <><div className="rainy front-row"></div>
                    <div className="rainy back-row"></div>
                    <div className="rainy-on"></div></> : <></>} */}

            {/* clouds */}
            {props.weather[1] === undefined ? <></> : props.weather[1].includes("Overcast") ?
                <><div className="hero"></div>
                    <div className="heroClouds"></div></> : <></>}

            {/* Sun */}
            {/* <div>
                {props.weather[1] === undefined ? <></> : props.weather[1].includes("Overcast") ? <SunAnimation></SunAnimation> : ""}
            </div>  */}

            {/* <div className="toggles">
                <div className="splat-toggle toggle active">SPLAT</div>
                <div className="back-row-toggle toggle active">BACK<br></br>ROW</div>
                <div className="single-toggle toggle">SINGLE</div>
                <div className="snow-toggle toggle">SNOW</div>
                <div className="rainy-toggle toggle active">RAIN</div>

            </div> */}

        </div>

    )
}

export default Animation;