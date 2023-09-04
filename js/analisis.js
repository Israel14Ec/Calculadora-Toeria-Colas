let boton = document.getElementById('botonAnalisis');

boton.onclick = function () {
    
    let lambda = parseFloat(document.getElementById("lambda").value);
    let laborables = parseFloat(document.getElementById("laborables").value);
    let wq = parseFloat(document.getElementById("wq").value);
    let Cte = parseFloat(document.getElementById("Cte").value);
    let W = parseFloat(document.getElementById("W").value);
    let Cts = parseFloat(document.getElementById("Cts").value);
    let miu = parseFloat(document.getElementById("miu").value);
    let Ctse = parseFloat(document.getElementById("Ctse").value);
    let k = parseFloat(document.getElementById("k").value);
    let Cs = parseFloat(document.getElementById("Cs").value);

    //Llamamos a la función:
    let resultadoCTte = funcionCTte (lambda, laborables, wq, Cte);
    let resultadoCTts = funcionCTts (lambda, laborables, W, Cts);
    let resultadoCTtse = funcionCTtse (lambda, laborables, miu, Ctse);
    let resultadoCTs = funcionCTs(k, Cs);
    let resultadoCT = resultadoCTte + resultadoCTts  + resultadoCTtse + resultadoCTs;

    document.getElementById("resultadoCTte").innerHTML = resultadoCTte;
    document.getElementById("resultadoCTts").innerHTML = resultadoCTts;
    document.getElementById("resultadoCTtse").innerHTML = resultadoCTtse;
    document.getElementById("resultadoCTs").innerHTML = resultadoCTs;
    document.getElementById("resultadoCT").innerHTML = resultadoCT;

}

var funcionCTte = function (lambda, laborables, wq, Cte) {

    return lambda * laborables * wq * Cte;
}

var funcionCTts = function (lambda, laborables, W, Cts) {
    return lambda * laborables * W * Cts;

}

var funcionCTtse = function (lambda, laborables, miu, Ctse) {
    return lambda * laborables * (1/miu) * Ctse;
}


var funcionCTs = function (k , Cs) {
    return k * Cs;
}