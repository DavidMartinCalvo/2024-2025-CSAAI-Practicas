console.log("Acierta la contraseña o exploto tu ordenador");
alert("Acierta la contraseña en el menor tiempo posible o exploto tu ordenador!!!!!!!");

//-- Elementos de la GUI
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset")
}

console.log("Ejecutando cronómetro...");

//-- Definir un objeto cronómetro
const crono = new Crono(gui.display);

//---- Configurar las funciones de retrollamada
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
    start();
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

// Funciones auxiliares
function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function explosion() {
    puedesJugar = false;
    alert("BOOOOOOOM!!!");
    alert("Tu ordenador ha explotado");
    alert("Recarga la página o pulsa Reset para volver a intentarlo");
    reset();
    crono.stop();
}

function ganar() {
    alert("Has ganado!");
    alert("Tu ordenador está a salvo");
    alert("Recarga la página o pulsa Reset para volver a intentarlo");
    crono.stop();
    puedesJugar = false;
}

function start() {
    puedesJugar = true;
    // (Opcional) Puedes quitar displaycontrasena() para no mostrar la contraseña en consola
    displaycontrasena();
}

function reset() {
    intentos = 10;
    document.getElementById("intentos").innerText = intentos;
    // Se generan 4 nuevos dígitos y se reinicia el estado de acertados
    password = [ getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber() ];
    guessed = [ false, false, false, false ];
    aciertos = 0;
    contradiccion = false;
    // Inicializa los elementos de la contraseña en "*" hasta que se acierte
    passwordElements.forEach(elem => elem.innerText = "*");
    displaycontrasena();
    crono.reset();
}

function stop() {
    puedesJugar = false;
    crono.stop();
}

function displaycontrasena() {
    console.log("Para desarrolladores: la contraseña es:");
    password.forEach(num => console.log(num));
}

// Variables globales
let puedesJugar = true;
let contradiccion = false;
let aciertos = 0;

let intentosElement = document.getElementById("intentos");
let intentos = parseInt(intentosElement.innerText) || 10;

// Elementos de las teclas
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

// Elementos donde se mostrarán los dígitos acertados
const contrasena1documento = document.getElementById("contrasena1");
const contrasena2documento = document.getElementById("contrasena2");
const contrasena3documento = document.getElementById("contrasena3");
const contrasena4documento = document.getElementById("contrasena4");

// Arreglos para teclas y elementos de la contraseña
const teclas = [tecla0, tecla1, tecla2, tecla3, tecla4, tecla5, tecla6, tecla7, tecla8, tecla9];
const passwordElements = [contrasena1documento, contrasena2documento, contrasena3documento, contrasena4documento];

// Arreglos que se inicializan en reset()
let password = [];
let guessed = [];

// Inicializamos el juego
reset();

teclas.forEach((tecla, teclaDigit) => {
    tecla.onclick = () => {
        if (puedesJugar) {
            console.log(`Pulsaste ${teclaDigit}`);
            // Recorremos la contraseña y revelamos solo la primera coincidencia no acertada.
            for (let i = 0; i < password.length; i++) {
                if (password[i] === teclaDigit && !guessed[i]) {
                    passwordElements[i].innerText = teclaDigit.toString();
                    passwordElements[i].style.color = "blue"; // Cambia el color a azul al acertar
                    guessed[i] = true;
                    aciertos++;
                    console.log(`Acertaste en la posición ${i} con el dígito ${teclaDigit}!`);
                    break;  // Se detiene tras revelar la primera ocurrencia
                }
            }
            intentos--;
            console.log(`Intentos restantes: ${intentos}`);
            document.getElementById("intentos").innerText = intentos;
            
            if (aciertos === 4) {
                ganar();
                contradiccion = true;
            } else if (intentos === 0 && contradiccion === false) {
                explosion();
            }
        }
    }
});

const easteregg1 = document.getElementById("easteregg1");
easteregg1.onclick = () => {
    alert("Entraste en el MODO KIRIBATI");

}

const easteregg2 = document.getElementById("easteregg2");
easteregg2.onclick = () => {
    alert("Entraste en el MODO MLG");
}