const mapa = document.getElementById("mapa");
mapa.width = "800";
mapa.height = "400";

let jugar = true;
const contexto = mapa.getContext("2d");

var iluminati = document.getElementById("iluminati");

const explosion = new Image();
explosion.src = "explosion.png";

fotoTexto = document.getElementById('fotoTexto');
cajaTexto = document.getElementById('cajaTexto');

const botonizquierda = document.getElementById("botonizquierda");
const botonderecha = document.getElementById("botonderecha");
const botondisparar = document.getElementById("botondisparar");
const botonreiniciar = document.getElementById("botonreiniciar");

const teclas = [botonizquierda, botonderecha, botondisparar, botonreiniciar];

iluminati.onload = () => {
    contexto.drawImage(iluminati, 5, 343);
};

let MEGALOVANIA = new Audio('MEGALOVANIA.mp3');
let disparoAudio = new Audio('disparo (2).mp3');


// Objeto del protagonista
const prota = {
    x: 5,
    y: 343,
    velocidad: 4.5,
};

// Contenedor de enemigos
const padreEnemigo = {
    x: 5,
    y: 5,
    velocidadX: 3,
};

// Array que almacenará los disparos
let disparos = [];

// Función para crear un nuevo disparo
function disparar() {
    // Se crea un disparo con las coordenadas actuales del protagonista
    disparos.push({
        x: prota.x + 20,
        y: prota.y,
        velocidad: 7
    });
}


let primeravez = true;
const clicks = [false, false];

function playSongInLoop(audio) {
    audio.loop = true;
    audio.play();
}

function stopSong(audio) {
    audio.pause();
    audio.currentTime = 0;
}

function Sonido(audio) {
    audio.play();
}

function ganar() {
    // Detener la música y mostrar mensaje de victoria
    stopSong(MEGALOVANIA);
    alert("¡Has ganado!");
    jugar = false;
    contexto.clearRect(0, 0, mapa.width, mapa.height);
    contexto.drawImage(iluminati, (mapa.width)/2, ( mapa.height)/2);
    contexto.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("¡Felicidades!, ¡Salvaste a tu país ocultándoles la verdad!", 90, 60);
}

function cajasTexto() {
    // Base de datos de combinaciones de imágenes y textos
    const combinaciones = [
        { texto: "Me llamo Sans y te voy a reventar el planeta si no me vences jajaja espabila noob", imagen: "sans.png" },
        { texto: "Soy el guardian de los cielos, quién osa volar sin mi permiso", imagen: "rayquaza.png" },
        { texto: "Has llegado tan alto como yo jajajaja. Te voy a robar el oro", imagen: "españa.png" },
        { texto: "Espabilar tú debes, y abandonar esta lucha sin sentido es lo que harás", imagen: "yoda.png" },
        { texto: "Mc Auto ahora también disponible para aviones y naves espaciales!", imagen: "mcdonalds.png" },
    ];

    // Función para cambiar aleatoriamente cajaTexto y fotoTexto
    function cambiarCombinacion() {
        const combinacion = combinaciones[Math.floor(Math.random() * combinaciones.length)];
        cajaTexto.textContent = combinacion.texto;
        fotoTexto.src = combinacion.imagen; 
    }

   
    if (jugar){
    setInterval(cambiarCombinacion, 6000);
    }  

}

// Llamar a la función para iniciar el cambio

cajasTexto();

// Enemigos y sus parámetros
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

// Array con nombres de imágenes para enemigos
const image_sources = ["mcdonalds.png", "rayquaza.png", "sans.png", "yoda.png", "españa.png"];

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
let puedeDisparar = true;

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !keys["Space"] && puedeDisparar) {
        disparar();
        if (jugar) {
            Sonido(disparoAudio);
        }
        puedeDisparar = false;
        setTimeout(() => {
            puedeDisparar = true;
        }, 1000);
    }
    keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});

teclas[2].addEventListener("click", () => {
    if (jugar && puedeDisparar) {
        disparar();
        Sonido(disparoAudio);
        puedeDisparar = false;
        setTimeout(() => {
            puedeDisparar = true;
        }, 1000);
    }
});

// Función para dibujar enemigos
function drawEnemies(contexto) {
    enemigos.forEach((enemy) => {
        // Calcula la posición real de cada enemigo
        let enemyX = padreEnemigo.x + enemy.offsetX;
        let enemyY = padreEnemigo.y + enemy.offsetY;
        contexto.drawImage(enemy.image, enemyX, enemyY, enemy.width, enemy.height);
    });
}


function comprobarMuerte() {
    for (let i = disparos.length - 1; i >= 0; i--) {
        for (let j = enemigos.length - 1; j >= 0; j--) {
            let disparo = disparos[i];
            let enemigo = enemigos[j];

            // Detección de colisión
            if (
                disparo.x >= padreEnemigo.x + enemigo.offsetX &&
                disparo.x <= padreEnemigo.x + enemigo.offsetX + enemigo.width &&
                disparo.y >= padreEnemigo.y + enemigo.offsetY &&
                disparo.y <= padreEnemigo.y + enemigo.offsetY + enemigo.height
            ) {
                // Eliminar disparo
                disparos.splice(i, 1);

                // Cambiar imagen del enemigo por la explosión
                enemigo.image = explosion;

                // Esperar 1 segundo y eliminar el enemigo
                setTimeout(() => {
                    enemigos.splice(j, 1);

                    // Verificar si ganaste
                    if (enemigos.length <= 0) {
                        ganar();
                    }
                }, 1000);

                break; // Salir del bucle interno para evitar errores de índice
            }
        }
    }
}



// Función principal de animación
function update() {
    // Borrar el canvas al inicio de cada frame
    contexto.clearRect(0, 0, mapa.width, mapa.height);

    // Actualizar la posición del contenedor de enemigos y cambiar dirección en los extremos
    if (padreEnemigo.x < 0 || padreEnemigo.x >= mapa.width - 315) {
        padreEnemigo.y += 12;
        padreEnemigo.velocidadX = -padreEnemigo.velocidadX;
    }
    // Detener el juego si el contenedor de enemigos alcanza cierta coordenada
    if (padreEnemigo.y >= mapa.height - 170) {
        jugar = false; 
        stopSong(MEGALOVANIA);
        perder();
        return;
    }
    padreEnemigo.x += padreEnemigo.velocidadX;

    // Actualizar la posición del protagonista según las teclas presionadas
    if (keys["ArrowLeft"] && prota.x > 0) {
        prota.x -= prota.velocidad;
    }
    if (keys["ArrowRight"] && prota.x < mapa.width - 50) {
        prota.x += prota.velocidad;
        if (primeravez) {
            playSongInLoop(MEGALOVANIA);
            primeravez = false;
        }
    }

    

    comprobarMuerte();
    // Dibujar enemigos y al protagonista
    drawEnemies(contexto);
    contexto.drawImage(iluminati, prota.x, prota.y);

    // Actualizar la posición de cada disparo y dibujarlos
    for (let i = disparos.length - 1; i >= 0; i--) {
        disparos[i].y -= disparos[i].velocidad;
        contexto.beginPath();
        contexto.rect(disparos[i].x, disparos[i].y, 3, 7);
        contexto.fillStyle = 'red';
        contexto.fill();
        contexto.stroke();
        contexto.closePath();
        // Eliminar el disparo si sale del canvas
        if (disparos[i].y < 0) {
            disparos.splice(i, 1);
        }
    }

    // Continuar la animación
    requestAnimationFrame(update);
}

// ¡Inicia la animación!
if (jugar) update();

