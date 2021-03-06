// JavaScript source code for bouncing balls

// load canvas
const canvas = document.getElementById('ballBox');
const ctx = canvas.getContext('2d');
const cwidth = ctx.canvas.width = window.innerWidth;
const cheight = ctx.canvas.height = window.innerHeight;

// function to randomise velocity (and other attributes if needed)
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// physics variables
const gravity = 0.10; // gravity strength
const bounce = 0.70; // bounciness of ball from the ground
const friction = 0.85; // ground friction

// ball class
class Ball {

    constructor(x, y, xv, yv, color, size) {
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "white";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    movement() {

        // moves the ball
        this.x += this.xv;
        this.y += this.yv;
        this.yv += gravity;

        // change direction of ball when hitting borders
        if (this.x + this.xv > cwidth || this.x + this.xv < 0) {
            this.xv = -this.xv;
        }

        if (this.y + this.yv < 0) {
            this.yv = -this.yv;
        }

        // ball loses some velocity every time it hits the bottom
        if (this.y + this.yv > cheight - this.size) {
            this.yv *= -bounce;
            this.xv *= friction;

            // stop ball bouncing when it loses enough velocity
            if (this.yv < 0 && this.yv > -0.20) {
                this.yv = 0;
            }
        }
    }
}

// array of all balls
const balls = [];

// loop to animate balls
function loop() {
    // keep canvas background constant
    ctx.fillStyle = 'rgba(40, 40, 40)';
    ctx.fillRect(0, 0, cwidth, cheight);
    ctx.font = "bolder 3.6em Segoe UI";
    ctx.fillStyle = "#363636";
    ctx.textAlign = 'center';
    ctx.fillText("Bouncing Circles", cwidth / 2, 60);
    ctx.font = "bolder 2.5em Segoe UI";
    ctx.fillText("Jessica Zhang", cwidth / 2, 112);
    ctx.font = "bolder 2em Segoe UI";
    ctx.fillText("Click to begin", cwidth / 2, 160);

    for (var ball of balls) {
        ball.draw();
        ball.movement();
    }
    requestAnimationFrame(loop);
}

loop();

// add new ball on click
canvas.addEventListener('click', function (e) {
    function addBall() {
        const size = 0.020 * cwidth;
        const ball = new Ball(
            e.clientX * (cwidth / canvas.clientWidth),
            e.clientY * (cheight / canvas.clientHeight),
            random(-8, 8),
            random(-8, 8),
            '#e45800', // Yieldify orange
            size
        );
        balls.push(ball);
    }
    addBall();
});

