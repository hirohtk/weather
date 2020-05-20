// A module can only have one default export, but as many named exports as you'd like (zero, one, two, or many). You can import them all together:
import $ from 'jquery'
import _ from 'underscore'


export function animationFunction(weatherStatus) {
    window.human = false;

    //RAINNNNNNNNNNNNNNNNNNNNNNN

    // DOES NOT REQUIRE USE OF CANAVS AT ALL
    var centerX = window.innerWidth;
    var centerY = window.innerHeight;
    var makeItRain = function () {
        //clear out everything
        console.log("it's supposed to be raining")
        // $('.rain').empty();

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

        $('.rainy.front-row').append(drops);
        $('.rainy.back-row').append(backDrops);
    }

    //----------------------------------------------------
    //SNOWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    function init() {

        var canvasEl = document.querySelector('.fireworks');

        function setCanvasSize() {
            canvasEl.width = window.innerWidth * 2;
            canvasEl.height = window.innerHeight * 2;
            canvasEl.style.width = window.innerWidth + 'px';
            canvasEl.style.height = window.innerHeight + 'px';
            canvasEl.getContext('2d').scale(2, 2);
        }
        var canvas = document.getElementById('myFireworks');
        var ctx = canvas.getContext('2d');
        var flakeArray = [];

        // canvas.style.pointerEvents = 'none';
        // canvas.style.position = 'fixed';
        // canvas.style.top = 0;
        // canvas.style.left = 0;
        // canvas.style.width = '100vw';
        // canvas.style.height = '100vh';
        // canvas.style.backgroundColor = '#000';

        // function canvasResize() {
        //     canvas.height = canvas.offsetHeight;
        //     canvas.width = canvas.offsetWidth;
        // }
        // canvasResize();

        // window.onresize = function () {
        //     canvasResize();
        // };

        var MyMath = Math;

        setInterval(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();

            var random = MyMath.random();
            var distance = 0.05 + 0.95 * random;

            var flake = {};
            flake.x = 1.5 * canvas.width * MyMath.random() - 0.5 * canvas.width;
            flake.y = -9;
            flake.velX = 2 * distance * (MyMath.random() / 2 + 0.5);
            flake.velY = (4 + 2 * MyMath.random()) * distance;
            flake.radius = MyMath.pow(5 * random, 2) / 5;
            flake.update = function () {
                var t = this;
                t.x += t.velX;
                t.y += t.velY;
                ctx.beginPath();
                ctx.arc(t.x, t.y, t.radius, 0, 2 * MyMath.PI, !1);
                ctx.fillStyle = '#FFF';
                ctx.fill();
            };

            flakeArray.push(flake);

            for (var b = 0; b < flakeArray.length; b++) {
                if (flakeArray[b].y > canvas.height) {
                    flakeArray.splice(b, 1);
                } else {
                    flakeArray[b].update();
                }
            }
        }, 16);

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize, false);
    }


    switch (weatherStatus) {
        case ("Light rain"):
            makeItRain();
            //aniIcons();
            break;
        case ("Partly cloudy"):
            // init();
            makeItRain();
            break;
        // case ("Sunny"):
        //     SunAnimation();
        //     break;

        default:
            console.log("default")
    }

}