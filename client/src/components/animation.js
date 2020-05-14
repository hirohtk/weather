import React from 'react';
import "./rain.css"
import "./icons.css"
//import "./cloud.scss"

function Animation(props) {
    return (
        <div className="Scott">

            <canvas className="fireworks" id="myFireworks"></canvas>

            <div className="rainy front-row"></div>
            <div className="rainy back-row"></div>

            {/* <div class="snow-on"></div> */}
            <div className="rainy-on"></div>

            <div className="toggles">
                <div className="splat-toggle toggle active">SPLAT</div>
                <div className="back-row-toggle toggle active">BACK<br></br>ROW</div>
                <div className="single-toggle toggle">SINGLE</div>
                <div className="snow-toggle toggle">SNOW</div>
                <div className="rainy-toggle toggle active">RAIN</div>
                <div>
                    {/* <div className="icon sun-shower">
                        <div className="cloud"></div>
                        <div className="sun">
                            <div className="rays"></div>
                        </div>
                        <div className="rain"></div>
                    </div> */}

                    {/* <div className="icon thunder-storm">
                        <div className="cloud"></div>
                        <div className="lightning">
                            <div className="bolt"></div>
                            <div className="bolt"></div>
                        </div>
                    </div> */}

                    {/* <div className="icon cloudy">
                        <div className="cloud"></div>
                        <div className="cloud"></div>
                    </div> */}

                    {/* <div className="icon flurries">
                        <div className="cloud"></div>
                        <div className="snow">
                            <div className="flake"></div>
                            <div className="flake"></div>
                        </div>
                    </div> */}

                    {/* <div className="icon sunny">
                        <div className="sun">
                            <div className="rays"></div>
                        </div>
                    </div> */}

                    {/* <div className="icon rainy">
                        <div className="cloud"></div>
                        <div className="rain"></div>
                    </div> */}
                </div>

            </div>
        </div>

    )
}

export default Animation;