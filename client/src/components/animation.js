import React from 'react';
import "./rain.css"
import "./icons.css"
//import "./cloud.scss"
import SunAnimation from './sunAnimation';

function Animation(props) {
    return (
        <div className="Scott">

            <canvas className="fireworks" id="myFireworks"></canvas>
            {/* SCOTT IF YOU WANT TO TEST THE RAINY DIVS BELOW TAKE OUT style={{display: "none"}}  */}
            <div className="rainy front-row" style={{display: "none"}}></div>
            <div className="rainy back-row" style={{display: "none"}}></div>

            {/* <div class="snow-on"></div> */}
            <div className="rainy-on" style={{display: "none"}}></div>

            <div>
                {props.weather[1] === "Sunny" ? <SunAnimation></SunAnimation> : ""}
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