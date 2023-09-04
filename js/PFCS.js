let boton = document.getElementById('boton-pfcs');
let botonN = document.getElementById('btnRespuestaPn');
let FormularioRespuesta = document.getElementById('formulario_respuestas');
document.getElementById("formulario_respuestas").style.visibility="hidden";

boton.onclick = function (){

    let lambda = parseFloat(document.getElementById("lambda").value);
    let miu = parseFloat(document.getElementById("miu").value);
    let poblacion = parseFloat(document.getElementById("poblcion").value)

    document.getElementById("formulario_respuestas").style.visibility="visible";

    //Se llaman las funciones:
    let respuestaP0 = funcionP0 (lambda, miu, poblacion);
    let respuestaPe = 1 - respuestaP0;
    let respuestaL = funcionL(lambda, miu, poblacion, respuestaP0);
    let respuestaLq = funcionLq(lambda, miu, poblacion, respuestaP0);
    let respuestaLn = respuestaLq/respuestaPe;
    let respuestaWq = funcionWq(lambda, poblacion, respuestaLq, respuestaL);
    let respuestaW = funcionW(respuestaWq, miu);
    let respuestaWn = respuestaWq/respuestaPe;


    document.getElementById("respuestaP0").innerHTML = respuestaP0;
    document.getElementById("respuestaPe").innerHTML = respuestaPe;
    document.getElementById("respuestaL").innerHTML = respuestaL + " clientes";
    document.getElementById("respuestaLq").innerHTML = respuestaLq + " clientes";
    document.getElementById("respuestaLn").innerHTML = respuestaLn + " clientes";
    document.getElementById("respuestaWq").innerHTML = respuestaWq + " h/c";
    document.getElementById("respuestaW").innerHTML = respuestaW + " h/c";
    document.getElementById("respuestaWn").innerHTML = respuestaWn + " h/c";

    botonN.onclick = function () {
      
        let num = parseInt(document.getElementById('valorN').value)
        let respuestaPn = funcionPn (lambda, miu, respuestaP0, poblacion, num)
        document.getElementById("respuestaPn").innerHTML = respuestaPn;

    }
}


//Funcion para sacar el factorial de un número:

function factorial(num) {
    return num === 0 ? 1 : Array.from({length:num},(x,i) => i+1).reduce((a, b) => a * b);
}


var funcionP0 = function (lambda, miu, m){
    let sumatoria = 0;
    let cont = 0;

    for (let n = 0; n <= m; n++){
        cont = (factorial(m)/factorial(m - n)) * (lambda/miu)**n;
        sumatoria += cont
    }

    return 1/sumatoria;
}


var funcionPn = function (lambda, miu, p0, m, n){
    let pn;

    pn = (factorial(m)/ factorial(m-n)) * Math.pow(lambda/miu, n) * p0;
    return pn;
}



var funcionL = function (lambda, miu, m, p0) {
    let L;

    L = m - (miu/lambda) * (1 - p0);
    return L.toFixed(2);
}

var funcionLq = function (lambda, miu, m, p0) {
    let Lq;

    Lq = m - ((lambda + miu)/lambda) * (1 - p0)
    return Lq;
}


var funcionWq = function (lambda, m, Lq, L) {
    let Wq;

    Wq = Lq / ((m - L)* lambda)
    return Wq;
}

var funcionW = function (Wq, miu){
    return Wq + 1/miu
}
