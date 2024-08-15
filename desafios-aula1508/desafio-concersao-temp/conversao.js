function converterTemperatura(valor, entrada, saida) {
    let resultado;

    if (entrada === "Celsius" && saida === "Kelvin") {
        resultado = valor + 273.15;
    } else if (entrada === "Celsius" && saida === "Fahrenheit") {
        resultado = (valor * 9/5) + 32;
    } else if (entrada === "Kelvin" && saida === "Celsius") {
        resultado = valor - 273.15;
    } else if (entrada === "Kelvin" && saida === "Fahrenheit") {
        resultado = (valor - 273.15) * 9/5 + 32;
    } else if (entrada === "Fahrenheit" && saida === "Celsius") {
        resultado = (valor - 32) * 5/9;
    } else if (entrada === "Fahrenheit" && saida === "Kelvin") {
        resultado = (valor - 32) * 5/9 + 273.15;
    } else {
        resultado = valor;
    }

    return resultado;
}

function converter() {
    const valor = parseFloat(document.getElementById('valor').value);
    const entrada = document.getElementById('entrada').value;
    const saida = document.getElementById('saida').value;

    const resultado = converterTemperatura(valor, entrada, saida);
    document.getElementById('resultado').textContent = resultado.toFixed(2);
}
