/*
// Solicitando as notas ao usuário e convertendo para número
var nota1 = Number(prompt("Digite a primeira nota:"));
var nota2 = Number(prompt("Digite a segunda nota:"));
var nota3 = Number(prompt("Digite a terceira nota:"));
var nota4 = Number(prompt("Digite a quarta nota:"));

// Operações matemáticas básicas
var soma = nota1 + nota2 + nota3 + nota4;
var subtracao = nota1 - nota2;
var multiplicacao = nota1 * nota2;
var divisao = nota1 / nota2;

// Calculando a média
var media = soma / 4;

// Exibindo os resultados usando alert
alert(
  "Resultados das operações matemáticas:\n" +
  "Soma: " + soma + "\n" +
  "Subtração (nota1 - nota2): " + subtracao + "\n" +
  "Multiplicação (nota1 * nota2): " + multiplicacao + "\n" +
  "Divisão (nota1 / nota2): " + divisao + "\n" +
  "\nCálculo da média:\n" +
  "Notas: " + nota1 + ", " + nota2 + ", " + nota3 + ", " + nota4 + "\n" +
  "Média das notas: " + media
);

// Exibindo os mesmos resultados no console
console.log("Resultados das operações matemáticas:");
console.log("Soma: " + soma);
console.log("Subtração (nota1 - nota2): " + subtracao);
console.log("Multiplicação (nota1 * nota2): " + multiplicacao);
console.log("Divisão (nota1 / nota2): " + divisao);
console.log("\nCálculo da média:");
console.log("Notas: " + nota1 + ", " + nota2 + ", " + nota3 + ", " + nota4);
console.log("Média das notas: " + media);
*/

/*
var nome = prompt("Digite o seu nome: ");
var idade = prompt("Digite a sua idade: ");
var imgirl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6I5N0J_3lgFR1rcLkttQ4-5r-QKmvd0JaMA&s"

alert("Nome " + nome + " Idade " + idade);
console.log("Nome " + nome + " Idade " + idade);

document.write(`<p>Olá ${nome}</p>`)
document.write(`<img src="${imgirl}">`)
*/

/*
var greeting = document.getElementById('greeting')

function logar() {
  var usermane = prompt("Digite o seu usuario: ")

  if (usermane === null || usermane === "") {
      alert("Digite um usuario")
    }else {
      greeting.innerHTML = "Bem vindo " + usermane

      let btmLogout = document.createElement("button")

      btmLogout.innerText = "Logout"

      btmLogout.onclick = logout

      greeting.appendChild(btmLogout)
    }
    
}

function logout() {
  alert("Loged out")
  greeting.innerHTML = "Até mais " + usermane
}
*/

// Função para validar e exibir os dados do estudante
function validarDados() {
  // Obter os valores dos campos
  var nome = document.getElementById('nome').value;
  var idade = document.getElementById('idade').value;
  var curso = document.getElementById('curso').value;

  // Verificar se todos os campos estão preenchidos
  if (nome === '' || idade === '' || curso === '') {
      alert('Por favor, preencha todos os campos obrigatórios: nome, idade e curso.');
  } else {
      // Exibir os dados preenchidos
      alert('Nome: ' + nome + '\nIdade: ' + idade + '\nCurso: ' + curso);
  }
}

