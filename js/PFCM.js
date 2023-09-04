let boton = document.getElementById('boton-pfcs');
let botonN = document.getElementById('btnRespuestaPn');
let FormularioRespuesta = document.getElementById('formulario_respuestas');
document.getElementById("formulario_respuestas").style.visibility="hidden";


boton.onclick = function () {
    let lambda = parseFloat(document.getElementById("lambda").value);
    let miu = parseFloat(document.getElementById("miu").value);
    let servidor = parseInt(document.getElementById("servidor").value);
    let poblacion = parseInt(document.getElementById("poblacion").value);

    document.getElementById("formulario_respuestas").style.visibility="visible"; 


    //Se llaman las funciones:
    let respuestaP0 = funcionP0(lambda, miu, poblacion, servidor);
    let respuestaPe = funcionPe(lambda, miu, poblacion, servidor, respuestaP0);
    let respuestaPne = 1 - respuestaPe;
    let respuestaL = funcionL(lambda, miu, poblacion, servidor, respuestaP0);
    let respuestaLq = funcionLq(lambda, miu, poblacion, servidor, respuestaP0);
    let respuestaLn = respuestaLq/respuestaPe;
    let respuestaWq = funcionWq(respuestaLq, poblacion, respuestaL, lambda);
    let respuestaW = funcionW(miu, respuestaWq);
    let respuestaWn = respuestaWq/respuestaPe;

    document.getElementById("respuestaP0").innerHTML = respuestaP0;
    document.getElementById("respuestaPe").innerHTML = respuestaPe;
    document.getElementById("respuestaPne").innerHTML = respuestaPne;
    document.getElementById("respuestaL").innerHTML = respuestaL + " clientes";
    document.getElementById("respuestaLq").innerHTML = respuestaLq + " clientes";
    document.getElementById("respuestaLn").innerHTML = respuestaLn + " clientes";
    document.getElementById("respuestaWq").innerHTML = respuestaWq + " h/c";
    document.getElementById("respuestaW").innerHTML = respuestaW + " h/c";
    document.getElementById("respuestaWn").innerHTML = respuestaWn + " h/c";
        

    botonN.onclick = function () {
        let num = parseFloat(document.getElementById("valorN").value);

        let respuestaPn = funcionPn (lambda, miu, poblacion, servidor, num, respuestaP0);
        document.getElementById("respuestaPn").innerHTML = respuestaPn;

    }
    

    
}


//Funcion para sacar el factorial de un número:

function factorial(num) {
    return num === 0 ? 1 : Array.from({length:num},(x,i) => i+1).reduce((a, b) => a * b);
}


var funcionP0 = function (lambda, miu, m, k) {
    let sumatoria = 0;
    let sumatoria2 = 0;
    let contador = 0;
    let contadorDos = 0;
    let p0 = 0;


    for(let n = 0; n < k; n++) {
        contador = ( (factorial(m)) / (factorial(m-n)* factorial(n))) * (lambda/miu)**n;
        sumatoria += contador;
    }

    for(let n = k; n <= m; n++) {
        contadorDos = (factorial(m)/ ((factorial(m - n))* factorial(k) * Math.pow(k, n-k) )) * (lambda/miu)**n;
        sumatoria2 += contadorDos; 
    }

    p0 = 1/(sumatoria + sumatoria2);

    return p0;
}

var funcionPn = function (lambda, miu, m, k, n, p0) {
    let pn = 0;

    if (n >= 0 && n<= k){
        pn = p0 * ((factorial(m))/(factorial(m-n) * factorial(n))) * Math.pow(lambda/miu, n)
        return pn;
    }

    {
        pn = p0 * ( (factorial(m))/ ( (factorial(m-n)) * factorial(k) * Math.pow(k, n-k))) * Math.pow(lambda/miu, n);
        return pn;
    }
}


var funcionPe = function (lambda, miu, m, k, p0) {

    let sumatoria = 0;
    let contador = 0;

    for (let n = k; n <= m; n++){
        contador = p0 * ( (factorial(m))/ ( (factorial(m-n)) * factorial(k) * Math.pow(k, n-k))) * Math.pow(lambda/miu, n);
        sumatoria += contador;
    }

    return sumatoria;
}


var funcionL = function (lambda, miu, m, k, p0) {
    
    let L = 0;
    let cont = 0;
    let cont2 = 0;
    let cont3 = 0;
    let sumatoria = 0;
    let sumatoria2 = 0;
    let sumatoria3 = 0;

    for (let n=0; n <k; n++) {
        cont = n * (p0 * ( (factorial(m))/ ( (factorial(m-n)) * factorial(k) * Math.pow(k, n-k))) * Math.pow(lambda/miu, n));
        sumatoria += cont; 

    }

    for (let n=k; n<= m; n++) {
        cont2 = (n-k) * (p0 * ( (factorial(m))/ ( (factorial(m-n)) * factorial(k) * Math.pow(k, n-k))) * Math.pow(lambda/miu, n));
        sumatoria2 += cont2;

    }

    for (let n = 0; n < k; n++){
        cont3 = p0 * ( (factorial(m))/ ( (factorial(m-n)) * factorial(k) * Math.pow(k, n-k))) * Math.pow(lambda/miu, n);
        sumatoria3 += cont3;
    }

    L = sumatoria + sumatoria2 + (k * (1 - sumatoria3));

    return L;
}


var funcionLq = function (lambda, miu, m, k, p0) {
    
    let cont = 0;
    let sumatoria = 0;

    for (let n = k; n <= m; n++){
        cont = (n-k) * (p0 * ( (factorial(m))/ ( (factorial(m-n)) * factorial(k) * Math.pow(k, n-k))) * Math.pow(lambda/miu, n));
        sumatoria += cont;
    }

    return sumatoria;
}


var funcionW = function (miu, wq) {

    return wq + (1/miu);
}


var funcionWq = function (Lq, m, l, lambda) {

    return Lq/((m - l) * lambda)
}



