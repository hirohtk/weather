import React from 'react';
import "./rain.css"
//import "./cloud.scss"

function Animation(props) {
    return (
        <div className="Scott">

            <canvas className="fireworks" id="myFireworks"></canvas>

            <div className="rain front-row"></div>
            <div className="rain back-row"></div>
            {/* <div class="snow-on"></div> */}
            <div className="rain-on"></div>
            <div className="toggles">
                <div className="splat-toggle toggle active">SPLAT</div>
                <div className="back-row-toggle toggle active">BACK<br></br>ROW</div>
                <div className="single-toggle toggle">SINGLE</div>
                <div className="snow-toggle toggle">SNOW</div>
                <div className="rain-toggle toggle active">RAIN</div>

            </div>
            <div class="icon sun-shower">
  <div class="cloud"></div>
  <div class="sun">
    <div class="rays"></div>
  </div>
  <div class="rain"></div>
</div>

<div class="icon thunder-storm">
  <div class="cloud"></div>
  <div class="lightning">
    <div class="bolt"></div>
    <div class="bolt"></div>
  </div>
</div>

<div class="icon cloudy">
  <div class="cloud"></div>
  <div class="cloud"></div>
</div>

<div class="icon flurries">
  <div class="cloud"></div>
  <div class="snow">
    <div class="flake"></div>
    <div class="flake"></div>
  </div>
</div>

<div class="icon sunny">
  <div class="sun">
    <div class="rays"></div>
  </div>
</div>

<div class="icon rainy">
  <div class="cloud"></div>
  <div class="rain"></div>
</div>

<p>Based on <a href="https://dribbble.com/shots/2097042-Widget-Weather" target="_blank">Dribbble</a> by kylor</p>
        </div>
    )
}

export default Animation;