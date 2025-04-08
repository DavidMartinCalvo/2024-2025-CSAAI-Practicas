const mapa = document.getElementById("mapa");
mapa.width = "800";
mapa.height = "400";

let jugar = true;
const contexto = mapa.getContext("2d");

var iluminati = document.getElementById("iluminati");

const explosion = new Image();
explosion.src = "explosion.png";

const fotoTexto = document.getElementById('fotoTexto');
const cajaTexto = document.getElementById('cajaTexto');

const casablanca = new Image();
casablanca.src = "casablanca.png";

const perderi = new Image();
perderi.src = "perder.png";

const botonizquierda = document.getElementById("botonizquierda");
const botonderecha = document.getElementById("botonderecha");
const botondisparar = document.getElementById("botondisparar");
const botonreiniciar = document.getElementById("botonreiniciar");

const teclas = [botonizquierda, botonderecha, botondisparar, botonreiniciar];

iluminati.onload = () => {
    contexto.drawImage(iluminati, 5, 343);
};

let MEGALOVANIA = new Audio('himno.m4a');
let disparoAudio = new Audio('disparo (2).mp3');


let coinsReales = 0;

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
    stopSong(MEGALOVANIA);
    alert("¡Has ganado!");
    jugar = false;
    contexto.clearRect(0, 0, mapa.width, mapa.height);
    contexto.drawImage(casablanca, 0, 0, mapa.width, mapa.height);
}

function perder() {
    stopSong(MEGALOVANIA);
    alert("¡Has perdido!");
    jugar = false;
    contexto.clearRect(0, 0, mapa.width, mapa.height);
    contexto.drawImage(perderi, 0, 0, mapa.width, mapa.height);
}

function cajasTexto() {
    const combinaciones = [
        { texto: "La nieve NO EXISTE. Es plástico. El gobierno la ha sustituido. ¿No me crees? QUÉMALA CON UN MECHERO. NO SE DERRITE VERDAD???? JÁ, se hace negra COMO EL PLÁSTICO AAAAA", imagen: "sans.png" },
        { texto: "LA TIERRA ES PLANA. Piénsalo, te caerías si fuera redonda. Son mentiras que se inventó Elon Musk para vender coches. ¿Por qué no se cae el agua? ESPABILA, HAY UN MURO EN LA ANTARTIDA.", imagen: "rayquaza.png" },
        { texto: "¡Si corremos como Naruto sus balas no nos darán!¡Liberad a mi pueblo del Área 51!, vengo de Raticulínn en la galaxia andrómeda para luchar por sus derechos.", imagen: "españa.png" },
        { texto: "¡Las palomas no existen!, son cámaras espía del gobierno para controlar a la población. Que no te engañen, ¡dispáralas cuando las veas por la calle y verás sus circuitos!", imagen: "yoda.png" },
        { texto: "OEEEOOO, EL COVID NO EXISTE. ¡ES UN INVENTO DE PERRO SANXE PARA AHORRAR AGUA!. ¿Conoces a alguien con covid? ES UN ACTOR PAGADO POR PERRO SANXEEEEE.", imagen: "mcdonalds.png" },
    ];

    function cambiarCombinacion() {
        const combinacion = combinaciones[Math.floor(Math.random() * combinaciones.length)];
        cajaTexto.textContent = combinacion.texto;
        fotoTexto.src = combinacion.imagen; 
    }

    if (jugar) {
        setInterval(cambiarCombinacion, 6000);
    }  
}

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

const image_sources = ["mcdonalds.png", "rayquaza.png", "sans.png", "yoda.png", "españa.png"];

const loadedImages = [];
image_sources.forEach((src) => {
    const image = new Image();
    image.src = src;
    loadedImages.push(image);
});

enemigos.forEach((enemy) => {
    enemy.image = loadedImages[Math.floor(Math.random() * loadedImages.length)];
});

// Objeto para rastrear las teclas presionadas
const keys = {};

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

// Agregar manejo de botones para movimiento:
let botonIzquierdaPressed = false;
let botonDerechaPressed = false;

botonizquierda.addEventListener("mousedown", () => { botonIzquierdaPressed = true; });
botonizquierda.addEventListener("mouseup", () => { botonIzquierdaPressed = false; });
botonizquierda.addEventListener("mouseleave", () => { botonIzquierdaPressed = false; });

botonderecha.addEventListener("mousedown", () => { botonDerechaPressed = true; });
botonderecha.addEventListener("mouseup", () => { botonDerechaPressed = false; });
botonderecha.addEventListener("mouseleave", () => { botonDerechaPressed = false; });

function drawEnemies(contexto) {
    enemigos.forEach((enemy) => {
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

            if (
                disparo.x >= padreEnemigo.x + enemigo.offsetX &&
                disparo.x <= padreEnemigo.x + enemigo.offsetX + enemigo.width &&
                disparo.y >= padreEnemigo.y + enemigo.offsetY &&
                disparo.y <= padreEnemigo.y + enemigo.offsetY + enemigo.height
            ) {
                disparos.splice(i, 1);
                enemigo.image = explosion;
                coinsReales += 1;
                document.getElementById('coins').textContent = coinsReales;
                //padreEnemigo.velocidadX += 4;
                setTimeout(() => {
                    enemigos.splice(j, 1);
                    if (enemigos.length <= 0) {
                        ganar();
                    }
                }, 1000);
                break;
            }
        }
    }
}

function update() {
    contexto.clearRect(0, 0, mapa.width, mapa.height);

    if (padreEnemigo.x < 0 || padreEnemigo.x >= mapa.width - 315) {
        padreEnemigo.y += 12;
        padreEnemigo.velocidadX = -padreEnemigo.velocidadX;
    }
    if (padreEnemigo.y >= mapa.height - 170) {
        jugar = false; 
        stopSong(MEGALOVANIA);
        perder();
        return;
    }
    padreEnemigo.x += padreEnemigo.velocidadX;

    // Mover al protagonista según las flechas del teclado o los botones presionados:
    if ((keys["ArrowLeft"] || botonIzquierdaPressed) && prota.x > 0) {
        prota.x -= prota.velocidad;
    }
    if ((keys["ArrowRight"] || botonDerechaPressed) && prota.x < mapa.width - 50) {
        prota.x += prota.velocidad;
        if (primeravez) {
            playSongInLoop(MEGALOVANIA);
            primeravez = false;
        }
    }

    comprobarMuerte();
    contexto.drawImage(casablanca, 0, 0, mapa.width, mapa.height);
    drawEnemies(contexto);
    
    contexto.drawImage(iluminati, prota.x, prota.y);

    // Actualizar y dibujar cada disparo
    for (let i = disparos.length - 1; i >= 0; i--) {
        disparos[i].y -= disparos[i].velocidad;
        contexto.beginPath();
        contexto.rect(disparos[i].x, disparos[i].y, 3, 7);
        contexto.fillStyle = 'red';
        contexto.fill();
        contexto.stroke();
        contexto.closePath();
        if (disparos[i].y < 0) {
            disparos.splice(i, 1);
        }
    }

    requestAnimationFrame(update);
}

if (jugar) update();
