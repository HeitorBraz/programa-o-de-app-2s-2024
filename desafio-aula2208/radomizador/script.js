let numbers = [];

function addNumber() {
    const input = document.getElementById('numberInput');
    const number = parseInt(input.value);

    if (!isNaN(number)) {
        numbers.push(number);
        document.getElementById('numberList').textContent = numbers.join(', ');
        input.value = '';
    } else {
        alert('Por favor, insira um número válido.');
    }
}

function getRandomNumber() {
    if (numbers.length > 0) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const randomNum = numbers[randomIndex];
        document.getElementById('randomNumber').textContent = randomNum;
    } else {
        alert('Por favor, adicione alguns números antes de tentar obter um número aleatório.');
    }
}
