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
        </div>
    )
}

export default Animation;

// class Animation extends React.Component {

//     componentDidMount = () => {
//         this.test();
//     }

//     test = () => {
//         window.human = false;


//         var canvasEl = document.querySelector('.fireworks');

//         function setCanvasSize() {
//             canvasEl.width = window.innerWidth * 2;
//             canvasEl.height = window.innerHeight * 2;
//             canvasEl.style.width = window.innerWidth + 'px';
//             canvasEl.style.height = window.innerHeight + 'px';
//             canvasEl.getContext('2d').scale(2, 2);
//         }


//         //RAINNNNNNNNNNNNNNNNNNNNNNN
//         var centerX = window.innerWidth;
//         var centerY = window.innerHeight;
//         var makeItRain = function () {
//             //clear out everything
//             console.log("it's supposed to be raining")
//             // $('.rain').empty();

//             var increment = 0;
//             var drops = "";
//             var backDrops = "";

//             while (increment < 100) {
//                 //couple random numbers to use for various randomizations
//                 //random number between 98 and 1
//                 var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
//                 //random number between 5 and 2
//                 var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
//                 //increment
//                 increment += randoFiver;
//                 //add in a new raindrop with various randomizations to certain CSS properties
//                 drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
//                 backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
//             }

//             $('.rain.front-row').append(drops);
//             $('.rain.back-row').append(backDrops);
//         }

//         switch (localStorage.getItem("weatherCondition")) {
//             case ("Clouds"):
//                 console.log("this is the current localstorage weather conditono");
//                 console.log(localStorage.getItem("weatherConditon"));
//                 makeItRain();
//                 break;
//             default:
//                 console.log("this is the current localstorage weather conditono");
//                 console.log(localStorage.getItem("weatherConditon"));
//         }


//         // $('.splat-toggle.toggle').on('click', function () {
//         //     $('body').toggleClass('splat-toggle');
//         //     $('.splat-toggle.toggle').toggleClass('active');
//         //     //makeItRain();
//         // });

//         // $('.single-toggle.toggle').on('click', function () {
//         //     $('body').toggleClass('single-toggle');
//         //     $('.single-toggle.toggle').toggleClass('active');
//         //     //makeItRain();
//         // });

//         $('.snow-toggle.toggle').on('click', function () {
//             $('body').toggleClass('snow-toggle');
//             $('.snow-toggle.toggle').toggleClass('active');
//             init();
//         });

//         // $('.rain-toggle.toggle').on('click', function () {
//         //     console.log("button clicked")
//         //     $('body').toggleClass('rain-toggle');
//         //     $('.rain-toggle.toggle').toggleClass('active');
//         //     makeItRain();
//         // });

//         //----------------------------------------------------
//         //SNOWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
//         var canvas = document.querySelector('.fireworks'),
//             ctx = canvas.getContext('2d'),
//             windowW = window.innerWidth,
//             windowH = window.innerHeight,
//             numFlakes = 200,
//             flakes = [];

//         function Flake(x, y) {
//             var maxWeight = 5,
//                 maxSpeed = 3;

//             this.x = x;
//             this.y = y;
//             this.r = randomBetween(0, 1);
//             this.a = randomBetween(0, Math.PI);
//             this.aStep = 0.01;


//             this.weight = randomBetween(2, maxWeight);
//             this.alpha = (this.weight / maxWeight);
//             this.speed = (this.weight / maxWeight) * maxSpeed;

//             this.update = function () {
//                 this.x += Math.cos(this.a) * this.r;
//                 this.a += this.aStep;

//                 this.y += this.speed;
//             }

//         }

//         function init() {
//             var i = numFlakes,
//                 flake,
//                 x,
//                 y;

//             while (i--) {
//                 x = randomBetween(0, windowW, true);
//                 y = randomBetween(0, windowH, true);


//                 flake = new Flake(x, y);
//                 flakes.push(flake);
//             }

//             scaleCanvas();
//             loop();
//         }

//         function scaleCanvas() {
//             canvas.width = windowW;
//             canvas.height = windowH;
//         }

//         function loop() {
//             var i = flakes.length,
//                 z,
//                 dist,
//                 flakeA,
//                 flakeB;

//             // clear canvas
//             ctx.save();
//             ctx.setTransform(1, 0, 0, 1, 0, 0);
//             ctx.clearRect(0, 0, windowW, windowH);
//             ctx.restore();

//             // loop of hell
//             while (i--) {

//                 flakeA = flakes[i];
//                 flakeA.update();


//                 ctx.beginPath();
//                 ctx.arc(flakeA.x, flakeA.y, flakeA.weight, 0, 2 * Math.PI, false);
//                 ctx.fillStyle = 'rgba(255, 255, 255, ' + flakeA.alpha + ')';
//                 ctx.fill();

//                 if (flakeA.y >= windowH) {
//                     flakeA.y = -flakeA.weight;
//                 }
//             }

//             requestAnimationFrame(loop);
//         }

//         function randomBetween(min, max, round) {
//             var num = Math.random() * (max - min + 1) + min;

//             if (round) {
//                 return Math.floor(num);
//             } else {
//                 return num;
//             }
//         }

//         function distanceBetween(vector1, vector2) {
//             var dx = vector2.x - vector1.x,
//                 dy = vector2.y - vector1.y;

//             return Math.sqrt(dx * dx + dy * dy);
//         }

//         //init();

//         //makeItRain();
//         setCanvasSize();
//         window.addEventListener('resize', setCanvasSize, false);

//     }

//     render() {
//         return (
//             <div className="Scott">

//                 <canvas className="fireworks" id="myFireworks"></canvas>

//                 <div className="rain front-row"></div>
//                 <div className="rain back-row"></div>
//                 {/* <div class="snow-on"></div> */}
//                 <div className="rain-on"></div>
//                 <div className="toggles">
//                     <div className="splat-toggle toggle active">SPLAT</div>
//                     <div className="back-row-toggle toggle active">BACK<br></br>ROW</div>
//                     <div className="single-toggle toggle">SINGLE</div>
//                     <div className="snow-toggle toggle">SNOW</div>
//                     <div className="rain-toggle toggle active">RAIN</div>

//                 </div>
//             </div>


//         )
//     }
// }

