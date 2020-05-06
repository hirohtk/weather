import React from 'react';
import "./rain.css"
import $ from 'jquery'

class Animation extends React.Component {

    componentDidMount = () => {
        this.test();
    }

    test = () => {
        window.human = false;


        var canvasEl = document.querySelector('.fireworks');
        // var ctx = canvasEl.getContext('2d');
        // var numberOfParticules = 30;
        // var pointerX = 0;
        // var pointerY = 0;
        // var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
        // var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

        function setCanvasSize() {
            canvasEl.width = window.innerWidth * 2;
            canvasEl.height = window.innerHeight * 2;
            canvasEl.style.width = window.innerWidth + 'px';
            canvasEl.style.height = window.innerHeight + 'px';
            canvasEl.getContext('2d').scale(2, 2);
        }

        // function updateCoords(e) {
        //     pointerX = e.clientX || e.touches[0].clientX;
        //     pointerY = e.clientY || e.touches[0].clientY;
        // }

        // function setParticuleDirection(p) {
        //     var angle = anime.random(0, 360) * Math.PI / 180;
        //     var value = anime.random(50, 180);
        //     var radius = [-1, 1][anime.random(0, 1)] * value;
        //     return {
        //         x: p.x + radius * Math.cos(angle),
        //         y: p.y + radius * Math.sin(angle)
        //     };
        // }

        // function createParticule(x, y) {
        //     var p = {};
        //     p.x = x;
        //     p.y = y;
        //     p.color = colors[anime.random(0, colors.length - 1)];
        //     p.radius = anime.random(16, 32);
        //     p.endPos = setParticuleDirection(p);
        //     p.draw = function () {
        //         ctx.beginPath();
        //         ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        //         ctx.fillStyle = p.color;
        //         ctx.fill();
        //     };
        //     return p;
        // }

        // function createCircle(x, y) {
        //     var p = {};
        //     p.x = x;
        //     p.y = y;
        //     p.color = '#FFF';
        //     p.radius = 0.1;
        //     p.alpha = 0.5;
        //     p.lineWidth = 6;
        //     p.draw = function () {
        //         ctx.globalAlpha = p.alpha;
        //         ctx.beginPath();
        //         ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        //         ctx.lineWidth = p.lineWidth;
        //         ctx.strokeStyle = p.color;
        //         ctx.stroke();
        //         ctx.globalAlpha = 1;
        //     };
        //     return p;
        // }

        // function renderParticule(anim) {
        //     for (var i = 0; i < anim.animatables.length; i++) {
        //         anim.animatables[i].target.draw();
        //     }
        // }

        // function animateParticules(x, y) {
        //     var circle = createCircle(x, y);
        //     var particules = [];
        //     for (var i = 0; i < numberOfParticules; i++) {
        //         particules.push(createParticule(x, y));
        //     }
        //     anime.timeline().add({
        //         targets: particules,
        //         x: function (p) { return p.endPos.x; },
        //         y: function (p) { return p.endPos.y; },
        //         radius: 0.1,
        //         duration: anime.random(5500, 10000),
        //         easing: 'easeOutExpo',
        //         update: renderParticule
        //     })
        //         .add({
        //             targets: circle,
        //             radius: anime.random(80, 160),
        //             lineWidth: 0,
        //             alpha: {
        //                 value: 0,
        //                 easing: 'linear',
        //                 duration: anime.random(600, 800),
        //             },
        //             duration: anime.random(1200, 1800),
        //             easing: 'easeOutExpo',
        //             update: renderParticule,
        //             offset: 0
        //         });
        // }

        // var render = anime({
        //     duration: Infinity,
        //     update: function () {
        //         ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        //     }
        // });



        // document.getElementById("myFireworks").addEventListener("click", function (e) {
        //     window.human = true;
        //     render.play();
        //     updateCoords(e);
        //     animateParticules(pointerX, pointerY);
        // }, false);
        //-------------------------------
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
        // var c = document.getElementById('myFireworks'), 
        //     $ = c.getContext("2d");
        // var w = c.width = window.innerWidth, 
        //     h = c.height = window.innerHeight;
        // function Snowy() {
        //   var snow, arr = [];
        //   var num = 600, tsc = 1, sp = 1;
        //   var sc = 1.3, t = 0, mv = 20, min = 1;
        //     for (var i = 0; i < num; ++i) {
        //       snow = new Flake();
        //       snow.y = Math.random() * (h + 50);
        //       snow.x = Math.random() * w;
        //       snow.t = Math.random() * (Math.PI * 2);
        //       snow.sz = (100 / (10 + (Math.random() * 100))) * sc;
        //       snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp;
        //       snow.sp = snow.sp < min ? min : snow.sp;
        //       arr.push(snow);
        //     }
        //   go();
        //   function go(){
        //     window.requestAnimationFrame(go);
        //       $.clearRect(0, 0, w, h);
        //       $.fillStyle = 'hsla(242, 95%, 3%, 1)';
        //       $.fillRect(0, 0, w, h);
        //       $.fill();
        //         for (var i = 0; i < arr.length; ++i) {
        //           f = arr[i];
        //           f.t += .05;
        //           f.t = f.t >= Math.PI * 2 ? 0 : f.t;
        //           f.y += f.sp;
        //           f.x += Math.sin(f.t * tsc) * (f.sz * .3);
        //           if (f.y > h + 50) f.y = -10 - Math.random() * mv;
        //           if (f.x > w + mv) f.x = - mv;
        //           if (f.x < - mv) f.x = w + mv;
        //           f.draw();}
        //  }
        //  function Flake() {
        //    this.draw = function() {
        //       this.g = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
        //       this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
        //       this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
        //       $.moveTo(this.x, this.y);
        //       $.fillStyle = this.g;
        //       $.beginPath();
        //       $.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
        //       $.fill();}
        //   }
        // }

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

        // $('.snow-toggle.toggle').on('click', function () {
        //     $('body').toggleClass('snow-toggle');
        //     $('.snow-toggle.toggle').toggleClass('active');
        //     Snowy();
        // });

        $('.rain-toggle.toggle').on('click', function () {
            console.log("button clicked")
            $('body').toggleClass('rain-toggle');
            $('.rain-toggle.toggle').toggleClass('active');
            makeItRain();
        });

        //----------------------------------------------------
        //SNOWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        // var c = document.getElementById('myFireworks'), 
        //     $ = c.getContext("2d");
        // var w = c.width = window.innerWidth, 
        //     h = c.height = window.innerHeight;

        // Snowy();
        // function Snowy() {
        //   var snow, arr = [];
        //   var num = 600, tsc = 1, sp = 1;
        //   var sc = 1.3, t = 0, mv = 20, min = 1;
        //     for (var i = 0; i < num; ++i) {
        //       snow = new Flake();
        //       snow.y = Math.random() * (h + 50);
        //       snow.x = Math.random() * w;
        //       snow.t = Math.random() * (Math.PI * 2);
        //       snow.sz = (100 / (10 + (Math.random() * 100))) * sc;
        //       snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp;
        //       snow.sp = snow.sp < min ? min : snow.sp;
        //       arr.push(snow);
        //     }
        //   go();
        //   function go(){
        //     window.requestAnimationFrame(go);
        //       $.clearRect(0, 0, w, h);
        //       $.fillStyle = 'hsla(242, 95%, 3%, 1)';
        //       $.fillRect(0, 0, w, h);
        //       $.fill();
        //         for (var i = 0; i < arr.length; ++i) {
        //           f = arr[i];
        //           f.t += .05;
        //           f.t = f.t >= Math.PI * 2 ? 0 : f.t;
        //           f.y += f.sp;
        //           f.x += Math.sin(f.t * tsc) * (f.sz * .3);
        //           if (f.y > h + 50) f.y = -10 - Math.random() * mv;
        //           if (f.x > w + mv) f.x = - mv;
        //           if (f.x < - mv) f.x = w + mv;
        //           f.draw();}
        //  }
        //  function Flake() {
        //    this.draw = function() {
        //       this.g = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
        //       this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
        //       this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
        //       $.moveTo(this.x, this.y);
        //       $.fillStyle = this.g;
        //       $.beginPath();
        //       $.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
        //       $.fill();}
        //   }
        // }









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
}

export default Animation;