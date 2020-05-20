import React from 'react';
import "./rain.css"
import "./icons.css"
//import "./cloud.scss"
import SunAnimation from './sunAnimation';

function Animation(props) {
    console.log(`ehhh ${props.weather[0]}`);
    return (
        <div className="Scott">
            {props.weather[0].contains("cloudy") ? <canvas className="fireworks" id="myFireworks"></canvas> : <></>}
            {/* {props.weather[0].contains("cloudy") ?
                <><div className="rainy front-row"></div>
                    <div className="rainy back-row"></div>
                    <div className="rainy-on"></div></> : <></>} */}
            <div>
                {props.weather[0].contains("Sunny") ? <SunAnimation></SunAnimation> : ""}
            </div>

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