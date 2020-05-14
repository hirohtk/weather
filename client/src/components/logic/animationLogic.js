// A module can only have one default export, but as many named exports as you'd like (zero, one, two, or many). You can import them all together:
import $ from 'jquery'
import _ from 'underscore'

export function animationFunction(weatherStatus) {
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

    // $('.splat-toggle.toggle').on('click', function () {
    //     $('body').toggleClass('splat-toggle');
    //     $('.splat-toggle.toggle').toggleClass('active');
    //     //makeItRain();
    // });

    // $('.single-toggle.toggle').on('click', function () {
    //     $('body').toggleClass('single-toggle');
    //     $('.single-toggle.toggle').toggleClass('active');
    //     //makeItRain();
    // });

    $('.snow-toggle.toggle').on('click', function () {
        $('body').toggleClass('snow-toggle');
        $('.snow-toggle.toggle').toggleClass('active');
        run();
    });

    // $('.rain-toggle.toggle').on('click', function () {
    //     console.log("button clicked")
    //     $('body').toggleClass('rain-toggle');
    //     $('.rain-toggle.toggle').toggleClass('active');
    //     makeItRain();
    // });

    //----------------------------------------------------
    //SNOWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    var canvas = document.getElementById("myFireworks");
    var context = canvas.getContext("2d");
    var maxParticles = 6000;



    var snowColors = ["white", "ghostwhite", "snow", "whitesmoke"];

    let frame = 0;

    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class Particle {
        constructor(x, y, dx, dy, dx2, dy2, r, color) {
            this.active = true;
            this.position = new Vector(x, y);
            this.velocity = new Vector(dx, dy);
            this.acceleration = new Vector(dx2, dy2);
            this.radius = r;
            this.color = color;
        }

        update() {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }

        draw(context) {
            context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(
                this.position.x,
                this.position.y,
                this.radius,
                0,
                2 * Math.PI,
                false
            );
            context.fill();
            context.restore();
        }
    }

    // window.addEventListener("load", e => {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    // });

    // window.addEventListener("resize", e => {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    // });

    let particles = [];

    function run() {
        frame++;
        // fill with black background
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        if (particles.length === maxParticles) {
            particles = [];
        }

        // generate particles
        particles.push(
            new Particle(
                getRandomArbitrary(0, canvas.width),
                0,
                getRandomArbitrary(-0.5, 0.5),
                getRandomArbitrary(0, 3),
                getRandomArbitrary(-1, 1),
                getRandomArbitrary(1, 0),
                getRandomArbitrary(1, 3),
                rand(snowColors)
            )
        );

        for (let i = 0; i <= particles.length - 1; i++) {
            particles[i].draw(context);
            particles[i].update();

            if (particles[i].radius === 3) {
                particles[i].velocity.y += 4;
            }

            if (particles[i].radius === 2) {
                particles[i].velocity.y += 3;
            }

            if (particles[i].radius === 1) {
                particles[i].velocity.y += 2;
            }
        }

        requestAnimationFrame(run);
    }

    /* 
    * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    */
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    /*
    * https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
    */
    function rand(items) {
        return items[~~(items.length * Math.random())];
    }

    // run();

    switch (weatherStatus) {
        case ("Light rain"):
            makeItRain();
            //aniIcons();
            break;
        case ("Partly cloudy"):
            run();
            break;
        default:
            console.log("default")
    }
    //init();

    //makeItRain();
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize, false);


}