function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc < 16) {
        return "Muito abaixo do peso";
    } else if (imc >= 16 && imc < 17) {
        return "Abaixo do peso";
    } else if (imc >= 17 && imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 25) {
        return "Peso normal";
    } else if (imc >= 25 && imc < 30) {
        return "Acima do peso";
    } else if (imc >= 30 && imc < 35) {
        return "Obesidade Grau I";
    } else if (imc >= 35 && imc < 40) {
        return "Obesidade Grau II (severa)";
    } else {
        return "Obesidade Grau III (mórbida)";
    }
}

function calcular() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        document.getElementById('resultado').textContent = "Por favor, insira valores válidos para peso e altura.";
        document.getElementById('classificacao').textContent = "";
        return;
    }

    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc);

    document.getElementById('resultado').textContent = `IMC: ${imc.toFixed(2)}`;
    document.getElementById('classificacao').textContent = `Classificação: ${classificacao}`;
}
