alert("¡Oh no!, ¡alguien ha puesto una bomba en la casa de Rodolfa! ¡Sálvala a ella y a su gato por favor!");
alert("Acierta la contraseña en el menor tiempo posible!!!!!!!");


const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset")
}

console.log("Ejecutando cronómetro...");


const crono = new Crono(gui.display);


gui.start.onclick = () => {
    if (empezardenuevo) {
        console.log("Start!!");
        crono.start();
        start();
    }
}
  
gui.stop.onclick = () => {
    console.log("Stop!");
    crono.stop();
    stop();
}

gui.reset.onclick = () => {
    console.log("Reset!");
    crono.reset();
    reset();
}


function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function explosion() {
    puedesJugar = false;
    alert("BOOOOOOOM!!!");
    alert("La casa de Rodolfa ha salido por los aires. Siéntete culpable. Su gato no tenía culpa :(");
    alert("Recarga la página o pulsa Reset para retrodecer en el tiempo e intentarlo de nuevo.");
    stop();
    empezardenuevo = false;
    crono.reset();
}

function ganar() {
    alert("Has salvado a Rodolfa!");
    alert("Su gato y su casa te lo agradecen.");
    alert("Recarga la página o pulsa Reset para volver a jugar con su vida.");
    crono.stop();
    empezardenuevo = false;
    puedesJugar = false;
}

function start() {
    
    puedesJugar = true;
    displaycontrasena();
    
}

function reset() {
    intentos = 10;
    empezardenuevo = true;
    document.getElementById("intentos").innerText = intentos;
    password = [ getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber() ];
    guessed = [ false, false, false, false ];
    aciertos = 0;
    contradiccion = false;
    contrasenasdocumento.forEach(elem => elem.innerText = "*");
    displaycontrasena();
    crono.reset();
    document.body.style.backgroundImage = "url('fireworks.gif')";
    for (let i = 0; i < password.length; i++) {
        contrasenasdocumento[i].style.color = "yellow";
    }
}

function stop() {
    puedesJugar = false;
    crono.stop();
}

function displaycontrasena() {
    console.log("Para desarrolladores: la contraseña es:");
    password.forEach(num => console.log(num));
}


function modoExtra() {
    document.body.style.backgroundImage = "url('MLG.gif')";
    playSongInLoop(mlgAudio);
}

function Sonido(audio) {
    audio.play();
}

function playSongInLoop(audio) {
    audio.loop = true;
    audio.play();
}

function stopSong(audio) {
    audio.pause();
    audio.currentTime = 0;
}

let puedesJugar = false;
let contradiccion = false;
let aciertos = 0;

let intentosElement = document.getElementById("intentos");
let intentos = parseInt(intentosElement.innerText);


const tecla0 = document.getElementById("tecla0");
const tecla1 = document.getElementById("tecla1");
const tecla2 = document.getElementById("tecla2");
const tecla3 = document.getElementById("tecla3");
const tecla4 = document.getElementById("tecla4");
const tecla5 = document.getElementById("tecla5");
const tecla6 = document.getElementById("tecla6");
const tecla7 = document.getElementById("tecla7");
const tecla8 = document.getElementById("tecla8");
const tecla9 = document.getElementById("tecla9");


const contrasena1documento = document.getElementById("contrasena1");
const contrasena2documento = document.getElementById("contrasena2");
const contrasena3documento = document.getElementById("contrasena3");
const contrasena4documento = document.getElementById("contrasena4");

let mlgAudio = new Audio('MLG.mp3');
let victoriaAudio = new Audio('victoria.mp3');
let derrotaAudio = new Audio('derrota.mp3');
let explosionAudio = new Audio('explosion.mp3');
let acertadaAudio = new Audio('acertada.mp3');
let pulsarbotonAudio = new Audio('pulsarboton.mp3');

let empezardenuevo = false;

const teclas = [tecla0, tecla1, tecla2, tecla3, tecla4, tecla5, tecla6, tecla7, tecla8, tecla9];
const contrasenasdocumento = [contrasena1documento, contrasena2documento, contrasena3documento, contrasena4documento];


let password = [];
let guessed = [];



reset();

teclas.forEach((tecla, teclaDigit) => {
    tecla.onclick = () => {
        
        if (puedesJugar) {
            console.log(`Pulsaste ${teclaDigit}`);
            Sonido(pulsarbotonAudio);
            for (let i = 0; i < password.length; i++) {
                if (password[i] === teclaDigit && !guessed[i]) {
                    contrasenasdocumento[i].innerText = teclaDigit.toString();
                    contrasenasdocumento[i].style.color = "blue"; 
                    guessed[i] = true;
                    aciertos++;
                    Sonido(acertadaAudio);
                    console.log(`Acertaste en la posición ${i} con el dígito ${teclaDigit}!`);
                    break;  
                }
            }
            intentos--;
            console.log(`Intentos restantes: ${intentos}`);
            document.getElementById("intentos").innerText = intentos;
            
            if (aciertos === 4) {
                contradiccion = true;
                Sonido(victoriaAudio);
                document.body.style.backgroundImage = "url('victoria.gif')";
                puedesJugar = false;
                stopSong(mlgAudio);
                ganar();
                
            } else if (intentos === 0 && contradiccion === false) {
                document.body.style.backgroundImage = "url('perder.gif')";
                Sonido(explosionAudio);
                Sonido(derrotaAudio);
                
                explosion();
            }
        }
    }
});

const easteregg1 = document.getElementById("easteregg1");
eastereggverificator = true
easteregg1.onclick = () => {
    if (eastereggverificator) {
        alert("Entraste en el MODO EASTER EGG");
        eastereggverificator = false;
        modoExtra();
    }
}

const easteregg2 = document.getElementById("easteregg2");

easteregg2.onclick = () => {
    if (!eastereggverificator) {
        alert("Saliste del MODO EASTER EGG");
        stopSong(mlgAudio);
        eastereggverificator = true;
        document.body.style.backgroundImage = "url('fireworks.gif')";
    }
}
