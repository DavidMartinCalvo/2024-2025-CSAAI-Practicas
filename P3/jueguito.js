const mapa = document.getElementById("mapa");

mapa.width = "800";
mapa.height = "400";

jugar = true;
const contexto = mapa.getContext("2d");

var iluminati = document.getElementById("iluminati");

iluminati.onload = () => {
    contexto.drawImage(iluminati, 5, 343);
};

// Objeto prota y sus parámetros
const prota = {
    x: 5,
    y: 343,
    velocidad: 5, // Velocidad del movimiento
};

// Objeto contenedor de enemigos y sus parámetros
const padreEnemigo = {
    x: 5,
    y: 5,
    velocidadX: 2,
};

// Enemigos que van dentro del padre
let enemigos = [
    { offsetX: 0, offsetY: 0, width: 30, height: 30 },
    { offsetX: 40, offsetY: 0, width: 30, height: 30 },
    { offsetX: 80, offsetY: 0, width: 30, height: 30 },
    { offsetX: 120, offsetY: 0, width: 30, height: 30 },
    { offsetX: 160, offsetY: 0, width: 30, height: 30 },
    { offsetX: 200, offsetY: 0, width: 30, height: 30 },
    { offsetX: 240, offsetY: 0, width: 30, height: 30 },
    { offsetX: 280, offsetY: 0, width: 30, height: 30 },
    { offsetX: 0, offsetY: 40, width: 30, height: 30 },
    { offsetX: 40, offsetY: 40, width: 30, height: 30 },
    { offsetX: 80, offsetY: 40, width: 30, height: 30 },
    { offsetX: 120, offsetY: 40, width: 30, height: 30 },
    { offsetX: 160, offsetY: 40, width: 30, height: 30 },
    { offsetX: 200, offsetY: 40, width: 30, height: 30 },
    { offsetX: 240, offsetY: 40, width: 30, height: 30 },
    { offsetX: 280, offsetY: 40, width: 30, height: 30 },
    { offsetX: 0, offsetY: 80, width: 30, height: 30 },
    { offsetX: 40, offsetY: 80, width: 30, height: 30 },
    { offsetX: 80, offsetY: 80, width: 30, height: 30 },
    { offsetX: 120, offsetY: 80, width: 30, height: 30 },
    { offsetX: 160, offsetY: 80, width: 30, height: 30 },
    { offsetX: 200, offsetY: 80, width: 30, height: 30 },
    { offsetX: 240, offsetY: 80, width: 30, height: 30 },
    { offsetX: 280, offsetY: 80, width: 30, height: 30 },
];

// Array que almacena el nombre de las imágenes
const image_sources = ["mcdonalds.png", "rayquaza.png", "sans.png", "yoda.png", 'españa.png'];

// Precargar imágenes
const loadedImages = [];
image_sources.forEach((src) => {
    const image = new Image();
    image.src = src;
    loadedImages.push(image);
});

// Asignar una imagen aleatoria a cada enemigo al inicio
enemigos.forEach((enemy) => {
    enemy.image = loadedImages[Math.floor(Math.random() * loadedImages.length)];
});

// Objeto para rastrear las teclas presionadas
const keys = {};

// Escuchar eventos de teclado
document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

// Función principal de animación
function update() {

    // Condición de rebote en extremos del canvas
    if (padreEnemigo.x < 0 || padreEnemigo.x >= mapa.width - 315) {
        padreEnemigo.y += 20;
        padreEnemigo.velocidadX = -padreEnemigo.velocidadX;
    }

    // Detener el juego si padreEnemigo llega a una coordenada específica
    if (padreEnemigo.y >= mapa.height - 170) {
        jugar = false; 
        return;
    }

    // Actualizar la posición del contenedor de enemigos
    padreEnemigo.x += padreEnemigo.velocidadX;

    // Actualizar la posición del protagonista según las teclas presionadas
    if (keys["ArrowLeft"] && prota.x > 0) {
        prota.x -= prota.velocidad;
    }
    if (keys["ArrowRight"] && prota.x < mapa.width - 50) {
        prota.x += prota.velocidad;
    }

    // Borrar el canvas
    contexto.clearRect(0, 0, mapa.width, mapa.height);

    // Dibujar enemigos
    drawEnemies(contexto);

    // Dibujar al prota
    contexto.drawImage(iluminati, prota.x, prota.y);

    // Volver a ejecutar update cuando toque
    requestAnimationFrame(update);
}

// Función para dibujar enemigos
function drawEnemies(contexto) {
    enemigos.forEach((enemy) => {
        // Calcula la posición real de cada nave
        let enemyX = padreEnemigo.x + enemy.offsetX;
        let enemyY = padreEnemigo.y + enemy.offsetY;

        // Dibuja la imagen asignada al enemigo
        contexto.drawImage(enemy.image, enemyX, enemyY, enemy.width, enemy.height);
    });
}

// ¡Que empiece la función!
if (jugar) update();