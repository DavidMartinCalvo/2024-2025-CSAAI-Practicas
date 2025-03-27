// Access the canvas element and its context
const canvas = document.getElementById("ctiro");
const ctx = canvas.getContext("2d");

// Access the buttons
const btnLanzar = document.getElementById("btnLanzar");
const btnIniciar = document.getElementById("btnIniciar");

// Initial projectile coordinates
let xop = 5;
let yop = 345;
let xp = xop;
let yp = yop;

// Initial target coordinates
let xomin = 200;
let xomax = 770;
let xo = 500;
let yo = 370;

// Projectile velocity
let velX = 5; // Horizontal velocity
let velY = 0; // Vertical velocity

// Draw the projectile
function dibujarP(x, y, lx, ly, color) {
    ctx.beginPath();
    ctx.rect(x, y, lx, ly);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

// Draw the target
function dibujarO(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

// Initial drawing
dibujarP(xop, yop, 50, 50, "green");
dibujarO(xo, yo);

// Main update function
function update() {
    // Update horizontal position
    xp += velX;

    // Check for wall collisions and reverse direction
    if (xp + 50 >= canvas.width || xp <= 0) {
        velX = -velX; // Reverse direction
    }

    // Update vertical position if jumping
    if (isJumping) {
        yp += velY;
        velY += gravity; // Apply gravity

        // Stop jumping when the square lands
        if (yp >= yop) {
            yp = yop;
            isJumping = false;
            velY = 0;
        }
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the target and projectile
    dibujarO(xo, yo);
    dibujarP(xp, yp, 50, 50, "blue");

    // Repeat the animation
    requestAnimationFrame(update);
}

// Handle spacebar press for jumping
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
        isJumping = true;
        velY = -10; // Initial jump velocity
    }
});

// Button callbacks
btnLanzar.onclick = () => {
    update();
};

btnIniciar.onclick = () => {
    location.reload();
};