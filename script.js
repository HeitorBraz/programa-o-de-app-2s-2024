function escolher() {

    let op = Number(prompt('Escolha uma das opção'))

    //let opNumber = Number(op)

    switch (op) {
        case 1:
            alert('Você escolheu Arroz')
            break;
        case 2:
            alert('Você escolheu feijão')
            break
        case 3:
            alert('Você escolheu Batatas fritas')
            break
        case 4:
            alert('Você escolheu Peixes')
            break
    
        default:
            alert('Opção invalida')
            break;
    }
}