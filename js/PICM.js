let boton = document.getElementById('boton-picm');
let botonN = document.getElementById('btnRespuestaPn');
let FormularioRespuesta = document.getElementById('formulario_respuestas');
document.getElementById("formulario_respuestas").style.visibility="hidden";


boton.onclick = function () {

    let lambda = parseFloat(document.getElementById("lambda").value);
    let miu = parseFloat(document.getElementById("miu").value);
    let k = parseFloat(document.getElementById("servidores").value);
    
    document.getElementById("formulario_respuestas").style.visibility="visible";
    let estabilidad = funcionEstabilidad (lambda, miu, k); 

    if (estabilidad < 1){

        
        alert("El sistema es estable: " + estabilidad);

        //Se llaman las funciones:
        let respuestaP0 = FuncionP0(lambda, miu, k);
        let respuestaPk = funcionPk (lambda, miu, k, respuestaP0);
        let respuestaPne = 1 - respuestaPk;
        let respuestaL = funcionL(lambda, miu, k, respuestaP0);
        let respuestaLq = funcionLq(lambda, miu, k, respuestaP0);
        let respuestaLn = funcionLn(respuestaLq, respuestaPk);
        let respuestaW = funcionW(lambda, miu, k, respuestaP0);
        let respuestaWq = funcionWq(lambda, miu, k, respuestaP0);
        let respuestaWn = funcionWn(respuestaWq, respuestaPk);
       
        document.getElementById("respuestaP0").innerHTML = respuestaP0;
        document.getElementById("respuestaPk").innerHTML = respuestaPk;
        document.getElementById("respuestaPne").innerHTML = respuestaPne;
        document.getElementById("respuestaL").innerHTML = respuestaL + " clientes";
        document.getElementById("respuestaLq").innerHTML = respuestaLq + " clientes";
        document.getElementById("respuestaLn").innerHTML = respuestaLn + " clientes";
        document.getElementById("respuestaW").innerHTML = respuestaW + " h/c";
        document.getElementById("respuestaWq").innerHTML = respuestaWq + " h/c";
        document.getElementById("respuestaWn").innerHTML = respuestaWn + " h/c";

        botonN.onclick = function () {
    
            let num = parseInt(document.getElementById("valorN").value);
            let respuestaPn  = funcionPn (lambda, miu, k, num, respuestaP0);
            document.getElementById("respuestaPn").innerHTML = respuestaPn;
        }



    }

    else {
        alert("Alerta: el sistema no es Estable");
        document.getElementById("formulario_respuestas").style.visibility="hidden";
    }
}


//Funcion para sacar el factorial de un número:

function factorial(num) {
    return num === 0 ? 1 : Array.from({length:num},(x,i) => i+1).reduce((a, b) => a * b);
}
  

//Condicion de estabilidad:
var funcionEstabilidad = function (lambda, miu, k){
    return lambda/(k*miu);
}

var FuncionP0 = function (lambda, miu, k) {

    let sumatoria = 0;
    let cont;
    let termino;
    let p0;

    termino = (1/factorial(k)) * (lambda/miu)**k * ((k*miu)/( (k*miu)-lambda))

    for (let n = 0; n < k; n++ ){
        cont = (1/factorial(n)) * ((lambda/miu)**n);
        sumatoria += cont;
    }

    p0 = 1/(sumatoria + termino);

    return p0;
}

var funcionPk = function (lambda, miu, k, p0){
    let pk;
    pk = (1/factorial(k))* ((lambda/miu)**k) * ((k*miu)/((k*miu)-lambda))*p0;
    
    return pk;
}


var funcionL = function (lambda, miu, k, p0) {
    let L;

    L = (( (lambda * miu) * (lambda/miu)**k)/ (factorial(k-1) * ( (k * miu) - lambda )**2) * p0 + (lambda/miu));
    return L;
}

var funcionPn = function (lambda, miu, k, n, p0) {
    let pn;

    if (n >= k){
        pn = (1/ (factorial(k) * Math.pow(k, n-k))) * (Math.pow(lambda/miu, n)) * p0;
        return pn;
    }
    else{
        pn = (p0/factorial(n)) * ((lambda/miu) ** n)
        return pn;

    }
}

var funcionLq = function (lambda, miu, k, p0){
    let Lq;

    Lq = ( (lambda*miu) * ((lambda/miu)**k) * p0  ) / ( (factorial(k-1) * ((k * miu) - lambda )**2) );
    return Lq; 
}

var funcionLn = function (lq, pk){
    return lq/pk;
}

var funcionW = function (lambda, miu, k, p0){
    let w;
    w = (miu * Math.pow((lambda / miu), k) * p0) / (factorial(k - 1) * Math.pow((k * miu - lambda), 2)) + 1 / miu;
    return w;
}

var funcionWq = function (lambda, miu, k, p0) {
    let Wq;

    Wq = (miu * Math.pow((lambda / miu), k) * p0) / (factorial(k - 1) * Math.pow((k * miu - lambda), 2));
    return Wq;
}

var funcionWn = function (wq, pk){
    return wq/pk;
}