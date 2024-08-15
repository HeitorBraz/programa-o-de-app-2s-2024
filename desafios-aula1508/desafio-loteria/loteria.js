function sortearNumeros(min, max, quantidade) {
    let numeros = [];
    while (numeros.length < quantidade) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numeros.includes(num)) {
            numeros.push(num);
        }
    }
    return numeros;
}

function sortear() {
    const tipoJogo = document.getElementById('tipoJogo').value;
    let numeros = [];

    if (tipoJogo === "Lotofacil") {
        numeros = sortearNumeros(1, 25, 15);
    } else if (tipoJogo === "Sena") {
        numeros = sortearNumeros(1, 60, 6);
    } else if (tipoJogo === "Quina") {
        numeros = sortearNumeros(1, 80, 5);
    }

    document.getElementById('resultado').textContent = numeros.join(', ');
}
