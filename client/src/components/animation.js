import React from 'react';
import "./rain.css"
//import "./cloud.scss"
import "./sun.css"
import $ from 'jquery'
import _ from 'underscore'

class Animation extends React.Component {

    componentDidMount = () => {
        this.test();
    }

    test = () => {
        window.human = false;


        var canvasEl = document.querySelector('.fireworks');

        function setCanvasSize() {
            canvasEl.width = window.innerWidth * 2;
            canvasEl.height = window.innerHeight * 2;
            canvasEl.style.width = window.innerWidth + 'px';
            canvasEl.style.height = window.innerHeight + 'px';
            canvasEl.getContext('2d').scale(2, 2);
        }


        //RAINNNNNNNNNNNNNNNNNNNNNNN
        var centerX = window.innerWidth;
        var centerY = window.innerHeight;
        var makeItRain = function () {
            //clear out everything
            console.log("it's supposed to be raining")
            $('.rain').empty();

            var increment = 0;
            var drops = "";
            var backDrops = "";

            while (increment < 100) {
                //couple random numbers to use for various randomizations
                //random number between 98 and 1
                var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
                //random number between 5 and 2
                var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
                //increment
                increment += randoFiver;
                //add in a new raindrop with various randomizations to certain CSS properties
                drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
                backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
            }

            $('.rain.front-row').append(drops);
            $('.rain.back-row').append(backDrops);
        }
        //----------------------------------------------------
        //SNOWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        var canvas = document.querySelector('.fireworks'),
            ctx = canvas.getContext('2d'),
            windowW = window.innerWidth,
            windowH = window.innerHeight,
            numFlakes = 200,
            flakes = [];

        function Flake(x, y) {
            var maxWeight = 5,
                maxSpeed = 3;

            this.x = x;
            this.y = y;
            this.r = randomBetween(0, 1);
            this.a = randomBetween(0, Math.PI);
            this.aStep = 0.01;


            this.weight = randomBetween(2, maxWeight);
            this.alpha = (this.weight / maxWeight);
            this.speed = (this.weight / maxWeight) * maxSpeed;

            this.update = function () {
                this.x += Math.cos(this.a) * this.r;
                this.a += this.aStep;

                this.y += this.speed;
            }

        }

        function init() {
            var i = numFlakes,
                flake,
                x,
                y;

            while (i--) {
                x = randomBetween(0, windowW, true);
                y = randomBetween(0, windowH, true);


                flake = new Flake(x, y);
                flakes.push(flake);
            }

            scaleCanvas();
            loop();
        }

        function scaleCanvas() {
            canvas.width = windowW;
            canvas.height = windowH;
        }

        function loop() {
            var i = flakes.length,
                z,
                dist,
                flakeA,
                flakeB;

            // clear canvas
            //$('.snow').empty();

            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, windowW, windowH);
            ctx.restore();

            // loop of hell
            while (i--) {

                flakeA = flakes[i];
                flakeA.update();


                ctx.beginPath();
                ctx.arc(flakeA.x, flakeA.y, flakeA.weight, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(255, 255, 255, ' + flakeA.alpha + ')';
                ctx.fill();

                if (flakeA.y >= windowH) {
                    flakeA.y = -flakeA.weight;
                }
            }

            requestAnimationFrame(loop);
        }

        function randomBetween(min, max, round) {
            var num = Math.random() * (max - min + 1) + min;

            if (round) {
                return Math.floor(num);
            } else {
                return num;
            }
        }

        function distanceBetween(vector1, vector2) {
            var dx = vector2.x - vector1.x,
                dy = vector2.y - vector1.y;

            return Math.sqrt(dx * dx + dy * dy);
        }

        //SUN-------------------------------------------
        class Sun {
            constructor() {
                this.$sun = $('.sun');
                this.$beams = this.$sun.find('.beams');
                this.size = this.$sun.width();

                this.beamAmount = 10;
                this.indRotation = 360 / this.beamAmount;
                this.path = [
                    { x: -15, y: 0 },
                    { x: 75, y: -90 },
                    { x: 165, y: 0 },
                    { x: 75, y: 90 },
                    { x: -15, y: 0 }
                ];

                this.location = { x: this.path[0].x, y: this.path[0].y };
                this.tn1 = TweenMax.to(this.location, this.beamAmount, { bezier: { curviness: 1.5, values: this.path }, ease: Linear.easeNone });

                this.tn2 = TweenMax.to(this.$beams, 60, { rotation: 360, repeat: -1, ease: Linear.easeNone });
                this.tn2.play();

                let i,
                    element;

                for (i = 0; i < this.beamAmount; i++) {
                    this.tn1.time(i);
                    element = '<span class="beam" id="beam-' + i + '"></span>';
                    this.$beams.append(element);
                    console.log(this.indRotation);

                    TweenMax.set($("#beam-" + i), { x: this.location.x - 5, y: this.location.y + 45, rotation: ((this.indRotation * i) - 90) })
                }
            }
        }

        $(() => {
            let sun = new Sun();
        });






        $('.splat-toggle.toggle').on('click', function () {
            $('body').toggleClass('splat-toggle');
            $('.splat-toggle.toggle').toggleClass('active');
            //makeItRain();
        });

        $('.single-toggle.toggle').on('click', function () {
            $('body').toggleClass('single-toggle');
            $('.single-toggle.toggle').toggleClass('active');
            //makeItRain();
        });

        $('.snow-toggle.toggle').on('click', function () {
            $('body').toggleClass('snow-toggle');
            $('.snow-toggle.toggle').toggleClass('active');
            init();
        });

        $('.snow-toggle.toggle').on('click', function () {
            $('body').toggleClass('snow-toggle');
            $('.snow-toggle.toggle').toggleClass('active');
            $('.snow').empty();
        });

        $('.rain-toggle.toggle').on('click', function () {
            console.log("button clicked")
            $('body').toggleClass('rain-toggle');
            $('.rain-toggle.toggle').toggleClass('active');
            makeItRain();
        });

        $('.sun-toggle.toggle').on('click', function () {
            console.log("button clicked")
            $('body').toggleClass('rain-toggle');
            $('.sun-toggle.toggle').toggleClass('active');
            Sun();
        });



        //init();

        //makeItRain();
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize, false);

    }

    render() {
        return (
            <div className="Scott">

                <canvas className="fireworks" id="myFireworks"></canvas>

                <div className="rain front-row"></div>
                <div className="rain back-row"></div>
                <div className="snow-on"></div>
                <div className="rain-on"></div>
                <div className="sun-on"></div>
                <div className="toggles">
                    <div className="splat-toggle toggle active">SPLAT</div>
                    <div className="back-row-toggle toggle active">BACK<br></br>ROW</div>
                    <div className="single-toggle toggle">SINGLE</div>
                    <div className="snow-toggle toggle">SNOW</div>
                    <div className="rain-toggle toggle active">RAIN</div>
                    <div className="sun-toggle toggle">SUN</div>
                </div>
                <div class="sun">
                        <div class="beams"></div>
                        <div class="face">
                            <span class="eye eye-left"></span>
                            <span class="eye eye-right"></span>
                            <span class="mouth"></span>
                        </div>
                    </div>
            </div>


        )
    }
}

export default Animation;