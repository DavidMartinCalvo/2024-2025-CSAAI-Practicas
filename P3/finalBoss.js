// finalBoss.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Asignar dimensiones al canvas (puede personalizarse o definirse en CSS)
canvas.width = 800;
canvas.height = 600;

const fotoTexto = document.getElementById('fotoTexto');
const cajaTexto = document.getElementById('cajaTexto');

const iluminati = new Image();
iluminati.src = "iluminati.png";

const feliz = new Image();
feliz.src = "feliz.jpg";

let MEGALOVANIA = new Audio('boss.mp3');
MEGALOVANIA.volume = 0.3; // Ajusta el valor entre 0.0 y 1.0 según lo bajo que desees el volumen
const maga = new Audio('maga.mp3');

const perdersong = new Audio('perder.mp3');
let vozperder2 = new Audio('vozperder2.mp3');
let vozganar2 = new Audio('vozganar2.mp3');
let intro2 = new Audio('intro2.mp3');

let primeravez = true; // Variable para controlar la primera vez que se reproduce la canción

// ---
// Agregamos este listener para dispositivos móviles, ya que muchos requieren 
// una interacción directa en el documento para iniciar el audio.
document.addEventListener('touchstart', () => {
  if (primeravez) {
    playSongInLoop(MEGALOVANIA);
    intro2.play();
    primeravez = false;
  }
}, { once: true });
// ---

const bossImg = new Image();
bossImg.src = "boss.png";
// Se ajusta la altura del boss para mantener la relación de aspecto
bossImg.onload = function() {
    let aspect = bossImg.naturalWidth / bossImg.naturalHeight;
    boss.height = boss.width / aspect;
};

const shootSounds = [
    new Audio("disparo.mp3"),
];

const explosions = [];
const explosionImg = new Image();
explosionImg.src = "explosion.png";

let shootIndex = 0;
let hitIndex = 0;

const hitSounds = [
    new Audio("explosion.mp3"),
    new Audio("explosion.mp3"),
    new Audio("explosion.mp3")
];
//const victorySound = new Audio("victoria.mp3");

// Jugador: se define con dimensiones 50x65 y se inicializa la vida
const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 70,
    width: 50,
    height: 65,
    speed: 5,
    dx: 0,
    health: 10,
    maxHealth: 10
};

const bullets = []; // Disparos del jugador

// Disparos del boss
const bossBullets = [];

// Boss: se fija un ancho y su altura se ajustará al cargar la imagen
const boss = {
    x: canvas.width / 2 - 50,
    y: 20,
    width: 140,
    height: 140,  // Valor provisional, se actualizará en bossImg.onload
    health: 350,
    alive: true,
    damageTimer: 0,
    dx: 2,
    dy: 2
};

let victory = false;
let gameOver = false; // Indica si la partida ha terminado

// Dibuja al jugador
function drawPlayer() {
    ctx.drawImage(iluminati, player.x, player.y, player.width, player.height);
}

// Dibuja la barra de vida del jugador (posición: esquina superior izquierda)
function drawPlayerHealthBar() {
    const barWidth = 150;
    const barHeight = 15;
    const x = 20;
    const y = 20;
    const healthRatio = player.health / player.maxHealth;
    ctx.fillStyle = "gray";
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, barWidth * healthRatio, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x, y, barWidth, barHeight);
}

// Dibuja el boss usando la imagen con la relación de aspecto ajustada
function drawBoss() {
    if (!boss.alive) return;
    
    ctx.drawImage(bossImg, boss.x, boss.y, boss.width, boss.height);

    if (boss.damageTimer > 0) {
        if (boss.damageTimer % 2 === 0) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
        }
        boss.damageTimer--;
    }
}

function playSongInLoop(audio) {
    audio.loop = true;
    audio.play();
}

// Dibuja los disparos del jugador
function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Dibuja los disparos del boss
function drawBossBullets() {
    ctx.fillStyle = "yellow";
    bossBullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Dibuja las explosiones
function drawExplosions() {
    explosions.forEach((explosion, index) => {
        ctx.drawImage(explosionImg, explosion.x, explosion.y, explosion.width, explosion.height);
        explosion.timer--;
        if (explosion.timer <= 0) {
            explosions.splice(index, 1);
        }
    });
}

// Actualiza la posición de los disparos del jugador
function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) bullets.splice(index, 1);
    });
}

// Mueve los disparos del boss
function moveBossBullets() {
    bossBullets.forEach((bullet, index) => {
        bullet.y += bullet.speed; // Se disparan hacia abajo
        if (bullet.y > canvas.height) bossBullets.splice(index, 1);
    });
}

// Verifica colisiones entre disparos del jugador y el boss
function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        if (boss.alive &&
            bullet.x < boss.x + boss.width &&
            bullet.x + bullet.width > boss.x &&
            bullet.y < boss.y + boss.height &&
            bullet.y + bullet.height > boss.y) {
            bullets.splice(bIndex, 1);
            boss.health--;
            hitSounds[hitIndex].currentTime = 0;
            hitSounds[hitIndex].play();
            hitIndex = (hitIndex + 1) % hitSounds.length;
            boss.damageTimer = 10;
            explosions.push({
                x: bullet.x - 20,
                y: bullet.y - 20,
                width: 40,
                height: 40,
                timer: 10
            });
            if (boss.health <= 0) {
                boss.alive = false;
                victory = true;
                crearTracaFinal();
                drawVictory();
            }
        }
    });
}

// Verifica colisiones entre disparos del boss y el jugador
function checkBossBulletCollisions() {
    bossBullets.forEach((bullet, index) => {
        if (
            bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y
        ) {
            bossBullets.splice(index, 1);
            player.health--;
            if (player.health <= 0) {
                perder();
            }
        }
    });
}

// Dibuja la barra de vida del boss (posición: esquina superior derecha)
function drawBossHealthBar() {
    if (!boss.alive) return;
    const barWidth = 150;
    const barHeight = 15;
    const x = canvas.width - barWidth - 20;
    const y = 20;
    const healthRatio = boss.health / 500;
    ctx.fillStyle = "gray";
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, barWidth * healthRatio, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x, y, barWidth, barHeight);
}

// Disparo del jugador
function shoot() {
    bullets.push({ 
        x: player.x + player.width / 2 - 2.5, 
        y: player.y, 
        width: 5, 
        height: 10, 
        speed: 5 
    });
    shootSounds[shootIndex].currentTime = 0;
    shootSounds[shootIndex].play();
    shootIndex = (shootIndex + 1) % shootSounds.length;
}

// Función para dibujar la victoria
function drawVictory() {
    ctx.fillStyle = "green";
    ctx.font = "40px Arial";
    ctx.fillText("¡Victoria!", canvas.width / 2 - 80, canvas.height / 2);
    // Mensaje de victoria
    document.getElementById('fotoTexto').src = feliz.src;
    document.getElementById('cajaTexto').textContent = "Derrotaste a Super Saiyan Trump 3000 y salvaste a tu país, no hay nada más patriótico que eso. Felicidades soldado.";
    vozganar2.play(); // Reproducir el audio de la voz al perder
    setTimeout(() => {
        window.open("https://davidmartincalvo.github.io/2024-2025-CSAAI-Practicas/P3/", "_self");
    }, 10000);
}

// Función que se llama cuando el jugador pierde (vida 0)
// Ahora solo se marca gameOver; el ciclo de update seguirá dibujando el estado y se mostrará el mensaje.
function perder() {
    gameOver = true;
    vozperder2.play(); 
    playSongInLoop(perdersong);
    document.getElementById('fotoTexto').src = bossImg.src;
    document.getElementById('cajaTexto').textContent = "Te derroté, y ahora NADIE podrá detenerme. ¡Haré AMÉRICA GRANDE OTRA VEZ!";
    
}

// Función que hace que el boss dispare. Se reprogrma a sí misma con un retardo aleatorio entre 0 y 2 segundos.
function bossShoot() {
    if (!boss.alive || gameOver) return;
    // Se crea un disparo del boss desde la parte inferior central
    bossBullets.push({
        x: boss.x + boss.width / 2 - 3,
        y: boss.y + boss.height,
        width: 6,
        height: 12,
        speed: 5
    });
    const delay = Math.random() * 2000;
    setTimeout(bossShoot, delay);
}

// Función para crear explosiones finales al derrotar el boss.
function crearTracaFinal() {
    const numExplosiones = 12;
    for (let i = 0; i < numExplosiones; i++) {
        const delay = i * 100;
        setTimeout(() => {
            const offsetX = Math.random() * boss.width;
            const offsetY = Math.random() * boss.height;
            explosions.push({
                x: boss.x + offsetX - 20,
                y: boss.y + offsetY - 20,
                width: boss.width,
                height: boss.height,
                timer: 15
            });
        }, delay);
    }
    
}


// Mueve al boss dentro del canvas
function moveBoss() {
    if (!boss.alive) return;
    boss.x += boss.dx;
    boss.y += boss.dy;

    // Rebote en los bordes horizontales
    if (boss.x <= 0 || boss.x + boss.width >= canvas.width) {
        boss.dx *= -1;
    }
    // Rebote en los bordes verticales (manteniéndose en la mitad superior)
    if (boss.y <= 0 || boss.y + boss.height >= canvas.height / 2) {
        boss.dy *= -1;
    }
    // Cambio aleatorio de dirección
    if (Math.random() < 0.01) boss.dx *= -1;
    if (Math.random() < 0.01) boss.dy *= -1;
}

// Función que reproduce de forma aleatoria un audio entre 4 y 10 segundos
function playRandomAudio() {
    const delay = 4000 + Math.random() * 6000; // Delay entre 4000ms y 10000ms
    setTimeout(() => {
        maga.currentTime = 0;
        maga.play();
        // Se vuelve a llamar la función para reproducir el siguiente audio
        playRandomAudio();
    }, delay);
}

// Función principal de actualización (game loop)
// Se actualizan los movimientos y colisiones solo si el juego sigue en curso,
// pero siempre se dibuja el estado actual (incluyendo el mensaje de derrota o victoria).
function update() {
    if (!gameOver && !victory) {
        player.x += player.dx;
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
        moveBullets();
        checkCollisions();
        moveBoss();
        moveBossBullets();
        checkBossBulletCollisions();
    }
    draw();
    requestAnimationFrame(update);
}

// Modificamos la función draw para que, si el juego terminó, se muestre el mensaje adecuado.
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("¡Has Perdido!", canvas.width / 2 - 100, canvas.height / 2);
        return; // Se finaliza el dibujo para no sobreponer otros elementos.
    }
    drawPlayer();
    drawBoss();
    drawExplosions();
    drawBullets();
    drawBossBullets();
    drawBossHealthBar();
    drawPlayerHealthBar();
    if (victory) drawVictory();
}

// Iniciar el ciclo de disparo del boss y del audio aleatorio
bossShoot();
playRandomAudio();

// Eventos de teclado para mover al jugador y disparar
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.dx = -player.speed;
    if (e.key === "ArrowRight") {
        player.dx = player.speed;
        if (primeravez) {
            playSongInLoop(MEGALOVANIA);
            intro2.play();
            primeravez = false;
          }
    }
    if (e.key === " ") shoot();
});
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") player.dx = 0;
});

// ----- Agregamos soporte para eventos táctiles -----
// Movimiento hacia la izquierda
const btnIzquierda = document.getElementById("botonizquierda");
btnIzquierda.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Para evitar conflictos con otros gestos
    player.dx = -player.speed;
});
btnIzquierda.addEventListener("touchend", (e) => {
    e.preventDefault();
    player.dx = 0;
});

// Movimiento hacia la derecha
const btnDerecha = document.getElementById("botonderecha");
btnDerecha.addEventListener("touchstart", (e) => {
    e.preventDefault();
    player.dx = player.speed;
    // En este caso, ya se activó la canción en el listener global de touchstart
});
btnDerecha.addEventListener("touchend", (e) => {
    e.preventDefault();
    player.dx = 0;
});

// Botón de disparo
const btnDisparar = document.getElementById("botondisparar");
btnDisparar.addEventListener("touchstart", (e) => {
    e.preventDefault();
    shoot();
});

update();
