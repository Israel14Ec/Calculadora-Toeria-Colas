let boton = document.getElementById("boton-pics");
let formularioRespuesta = document.getElementById("formulario_respuestas");
let botonN = document.getElementById("btnRespuestaPn");
document.getElementById("formulario_respuestas").style.visibility="hidden";

boton.onclick = function () {

    //Lectura de variables
    let lambda = parseFloat(document.getElementById("lambda").value);
    let miu = parseFloat(document.getElementById("miu").value);
    document.getElementById("formulario_respuestas").style.visibility="visible";
    //Se llama a las funciones y almacena la respuesta 
    let respuestaP = funcionP(lambda,miu);
    let respuestaP0 =  1 - respuestaP;
    let respuestaL = funcionL(lambda, miu);
    let respuestaLq = funcionLq(lambda, miu);
    let respuestaW = funcionW(lambda, miu);
    let respuestaWq = funcionWq(lambda, miu);

    
    if (respuestaP < 1) {

        alert("El sistema es estable");
        document.getElementById("respuesta_ro").innerHTML = respuestaP;
        document.getElementById("respuesta_ro0").innerHTML = respuestaP0;
        document.getElementById("respuesta_L").innerHTML = respuestaL + " clientes";
        document.getElementById("respuesta_Lq").innerHTML = respuestaLq + " clientes";
        document.getElementById("respuesta_Ln").innerHTML = respuestaL + " clientes";
        document.getElementById("respuesta_W").innerHTML = respuestaW + " h/c";
        document.getElementById("respuesta_Wq").innerHTML = respuestaWq + " h/c";
        document.getElementById("respuesta_Wn").innerHTML = respuestaW + " h/c";

        botonN.onclick = function () {  //n, p0, lambda, miu
            let numClientes = parseInt(document.getElementById("valorN").value);
            let respuestaPn = funcionPn(numClientes, respuestaP0, lambda, miu);
            document.getElementById("respuesta_Pn").innerHTML = respuestaPn;
            
        }

    }

    else {
        alert("Alerta: el sistema no es Estable");
        document.getElementById("formulario_respuestas").style.visibility="hidden";
    }
}


var funcionP = function (lambda, miu) {
    return lambda/miu;
}


var funcionL = function (lambda, miu) {
    return lambda/(miu-lambda);
}


var funcionLq = function (lambda, miu) {
 
    return (lambda**2)/(miu * (miu - lambda));
}


var funcionW = function (lambda, miu){

    return 1/(miu-lambda);
}

var funcionWq = function (lambda, miu){
    return (lambda)/(miu*(miu-lambda)) 
}

var funcionPn = function (n, p0, lambda, miu){

    let respuesta;

    respuesta = p0 * ((lambda/miu))**n
    return respuesta;
    
}