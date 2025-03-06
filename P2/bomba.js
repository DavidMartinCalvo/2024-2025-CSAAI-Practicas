console.log("Acierta la contraseña o exploto tu ordenador");



// Falta el caso de que dos números de la contraseña sean iguales
// Falta randomizar los números de la contraseña
// Faltan los botones de Start, Reset y Stop
// Falta que el contador de intentos se actualice en el HTML
// Falta que el juego pete cuando el contador de intentos llegue a 0
// Falta el contador de tiempo
// Falta que el juego pete al llegar el contador a 0




let contrasena1 = document.getElementById("contrasena1");
let contrasena2 = document.getElementById("contrasena2");
let contrasena3 = document.getElementById("contrasena3");
let contrasena4 = document.getElementById("contrasena4");

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

let intentosElement = document.getElementById("intentos");
let intentos = intentosElement.innerText;

console.log(intentos);

contrasena1.style.display = "none";
contrasena2.style.display = "none";
contrasena3.style.display = "none";
contrasena4.style.display = "none";


console.log("Para desarrolladores: la contraseña es:");

console.log(contrasena1.innerText);
console.log(contrasena2.innerText);
console.log(contrasena3.innerText);
console.log(contrasena4.innerText);

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

const teclaStart = document.getElementById("teclaStart");
const teclaStop = document.getElementById("teclaStop");
const teclaReset = document.getElementById("teclaReset");

let aciertos = 0;


function ganar() {
    
    alert("Has ganado!");
    
}


const teclas = [tecla0, tecla1, tecla2, tecla3, tecla4, tecla5, tecla6, tecla7, tecla8, tecla9];
const contrasenas = [contrasena1, contrasena2, contrasena3, contrasena4];
const hasacertado = [acertada0, acertada1, acertada2, acertada3, acertada4, acertada5, acertada6, acertada7, acertada8, acertada9];

teclas.forEach((tecla, index) => {
    tecla.onclick = () => {
        
        console.log(`Pulsaste ${index}`);
        contrasenas.forEach((contrasena) => {
            if (contrasena.innerText == index.toString()) {
                contrasena.style.display = "block";
                if (hasacertado[index] == false) {
                    aciertos++;
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
    };
});

