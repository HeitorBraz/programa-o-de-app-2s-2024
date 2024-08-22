/*let users = [
    { nome: 'Jonh', idade: 23, cargo: 'CEO'},
    { nome: 'Doe', idade: 32, cargo: 'Fullstack' },
    { nome: 'Sabrina', idade: 33, cargo: 'WebDev' },
]

for (var i = 0 )*/

/*let pessoa = {
    nome: 'Victoria',
    idade: 32,
    profissao: 'CEO'
}

let{nome, idade} = pessoa

console.log(nome)*/

/*let numerosPares = [2, 4, 6, 8, 10]
let numerosImpares = [...numerosPares, 1, 3, 5, 7, 9]

console.log(numerosImpares)*/

/*let pessoa = {
    nome: 'Bob',
    idade: 32,
}

let profissional = {
    ...pessoa,
    cargo: 'Dev'
}

console.log(profissional)*/

function user(info) {
    let data = {
        ...info,
        stats: 'ok',
        inicio: '2024'
    }
    console.log(data)
}

user({nome: 'John', email: 'john@example.com' })