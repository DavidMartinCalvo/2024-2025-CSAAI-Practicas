console.log("Acierta la contraseña o exploto tu ordenador");
alert("Acierta la contraseña en el menor tiempo posible o exploto tu ordenador!!!!!!!");


//-- Elementos de la gui
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

//-- Arranque del cronometro
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
    start();
}
  
//-- Detener el cronómetro
gui.stop.onclick = () => {
    console.log("Stop!");
    crono.stop();
    stop();
}

//-- Reset del cronómetro
gui.reset.onclick = () => {
    console.log("Reset!");
    crono.reset();
    reset();
}



// Falta el caso de que dos números de la contraseña sean iguales


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
    displaycontrasena();
}

function reset() {
    intentos = 10;
    document.getElementById("intentos").innerText = intentos;
    contrasena1.style.display = "none";
    contrasena2.style.display = "none";
    contrasena3.style.display = "none";
    contrasena4.style.display = "none";
    contrasena1.innerText = getRandomNumber();
    contrasena2.innerText = getRandomNumber();
    contrasena3.innerText = getRandomNumber();
    contrasena4.innerText = getRandomNumber();
    displaycontrasena();
    crono.reset();
    aciertos = 0;
hasacertado.forEach((element, index) => {
    hasacertado[index] = false;
});
    
}

function stop() {
    puedesJugar = false;
    crono.stop();
}

function displaycontrasena() {
    console.log("Para desarrolladores: la contraseña es:");
    console.log(contrasena1.innerText);
    console.log(contrasena2.innerText);
    console.log(contrasena3.innerText);
    console.log(contrasena4.innerText);
}

function checkLenghtContrasenas() {
    const values = contrasenas.map(contrasena => contrasena.innerText);
    const uniqueValues = new Set(values);
    return uniqueValues.size
}

function checkDuplicateContrasenas() {
    const values = contrasenas.map(contrasena => contrasena.innerText);
    const uniqueValues = new Set(values);
    return uniqueValues.size !== values.length;
}

function checkDuplicatedNumberContrasenas() {
    const values = contrasenas.map(contrasena => contrasena.innerText);
    const uniqueValues = new Set(values);
    return Array.from(uniqueValues)[0];
}

let contrasena1 = document.getElementById("contrasena1");
let contrasena2 = document.getElementById("contrasena2");
let contrasena3 = document.getElementById("contrasena3");
let contrasena4 = document.getElementById("contrasena4");


document.getElementById("contrasena1").innerText = getRandomNumber();
document.getElementById("contrasena2").innerText = getRandomNumber();
document.getElementById("contrasena3").innerText = getRandomNumber();
document.getElementById("contrasena4").innerText = getRandomNumber();


let acertada1 = false;
let acertada2 = false;
let acertada3 = false;
let acertada4 = false;
let acertada5 = false;
let acertada6 = false;
let acertada7 = false;
let acertada8 = false;
let acertada9 = false;

let acertada0 = false;

let puedesJugar = false;

let intentosElement = document.getElementById("intentos");
let intentos = intentosElement.innerText;

console.log(intentos);

contrasena1.style.display = "none";
contrasena2.style.display = "none";
contrasena3.style.display = "none";
contrasena4.style.display = "none";



const tecla1 = document.getElementById("tecla1");
const tecla2 = document.getElementById("tecla2");
const tecla3 = document.getElementById("tecla3");
const tecla4 = document.getElementById("tecla4");
const tecla5 = document.getElementById("tecla5");
const tecla6 = document.getElementById("tecla6");
const tecla7 = document.getElementById("tecla7");
const tecla8 = document.getElementById("tecla8");
const tecla9 = document.getElementById("tecla9");
const tecla0 = document.getElementById("tecla0");


let aciertos = 0;


const teclas = [tecla0, tecla1, tecla2, tecla3, tecla4, tecla5, tecla6, tecla7, tecla8, tecla9];
const contrasenas = [contrasena1, contrasena2, contrasena3, contrasena4];
const hasacertado = [acertada0, acertada1, acertada2, acertada3, acertada4, acertada5, acertada6, acertada7, acertada8, acertada9];

teclas.forEach((tecla, index) => {
    tecla.onclick = () => {
        if (puedesJugar == true) {
            console.log(`Pulsaste ${index}`);
                contrasenas.forEach((contrasena) => {
                    if (contrasena.innerText == index.toString()) {
                        contrasena.style.display = "block";
                        if (hasacertado[index] == false) {
                            
                            if (checkDuplicateContrasenas()) {
                                let numeroRepetido = checkDuplicatedNumberContrasenas();
                                let repeticiones = checkLenghtContrasenas() - 1;
                                if (index == numeroRepetido) {
                                    aciertos += repeticiones;
                                } else {
                                    aciertos++;
                                }
                            } else {
                                aciertos++;
                            }
                            console.log(`Acertaste ${index}!!!`);
                            console.log(`Aciertos: ${aciertos}`);
                            
                            if (aciertos == 4) {
                                ganar();
                            }
                        }
                        hasacertado[index] = true;
                    } 
                });
                intentos = intentos - 1;
                console.log(`Intentos restantes:  ${intentos}`);
                document.getElementById("intentos").innerText = intentos;
                if (intentos == 0) {
                    explosion();
                }
        }
    };
});



//start.onclick = () => {
//    start();
//}

//reset.onclick = () => {
//    reset();
//}