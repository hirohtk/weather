import React from 'react';
import "./rain.css"
import "./icons.css"
//import "./cloud.scss"
import SunAnimation from './sunAnimation';

function Animation(props) {
// console.log(`is this loading out of order? ${props.weather[1]}`)
    return (
        <div className="Scott">

{/* FOR NOW, SET .includes ARGUMENT TO BE CURRENT ACTUAL WEATHER CONDITION */}

            {/* {props.weather[1] === undefined ? <></> : props.weather[1].includes("cloudy") ? <canvas className="fireworks" id="myFireworks"></canvas> : <></>} */}

            {props.weather[1] === undefined ? <></> : props.weather[1].includes("cloudy") ?
                <><div className="rainy front-row"></div>
                    <div className="rainy back-row"></div>
                    <div className="rainy-on"></div></> : <></>}

            <div>
                {props.weather[1] === undefined ? <></> : props.weather[1] === "Sunny" ? <SunAnimation></SunAnimation> : ""}
            </div> */}

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