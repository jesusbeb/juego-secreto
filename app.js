/*
//document conecta los elementos del html con javascript.
//querySelector es un metodo de document al que le paso el nombre de la etiqueta a conectar
let titulo = document.querySelector('h1');
//titulo ya es reconocida como una variable tipo HTMLHeadingElement y se pueden usar algunos metodos
//el metodo inner.HTML nos permite agregar texto a una variable
titulo.innerHTML = 'Juego del numero Secreto' 
*/

/*
let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un numero del 1 al 10'
*/
//Lo anterior se paso a una funcion generica

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto; 
    return; //no retorna nada, se coloca como buena practica
}

//document es el dom que usa el metodo getElementById para obtener el elemento del html
//.value es para obtener el valor, ya que getElementById retorna el elemento
function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto){
        //usamos el mismo y unico parrafo y cambiamos el texto
        //usamos el operador ternario ? para usar la palabra "intento" o "intentos" segun el numero de intento
        asignarTextoElemento( 'p', `Acertaste el numero en ${intentos}  ${ (intentos === 1) ? 'intento' : 'intentos'}` );
        //Se habilita el boton de "Nuevo Juego" removiendo el atributo "disabled". Esto despues de acertar
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //si el usuario no acerto
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El numero secreto es menor');
        }
        else{
            asignarTextoElemento('p', 'El numero secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    //querySelector que es un selector generico, que obtiene el elemento
    //le indicamos con el simbolo de # que obtendra el elemento por id
    //.value es igual a vacio
    document.querySelector('#valorUsuario').value = '';
}

function condicionesIniciales(){
    asignarTextoElemento('h1', "Juego del Numero Secreto");
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    //si ya se generaron todos los numeros posibles, nos salimos de la recursividad
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles')
    } else {
        //si el numero generado ya fue generado anteriormente
        if(listaNumerosSorteados.includes(numeroGenerado)){
            //Recursividad, la funcion se llamara asi misma para generar otro numero
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    


}

//boton Nuevo Juego
function reiniciarJuego(){
    limpiarCaja();
    condicionesIniciales();
    //setAttribue es una funcion que coloca un atributo, recibe dos parametros
    //primer parametro es el atributo, segundo parametro es el valor
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}


condicionesIniciales();