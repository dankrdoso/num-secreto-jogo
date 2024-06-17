let listaNumSorteados = [];
let numeroLimite = 50;
let numSecreto = sorteioNumSecreto();
let tentativas = 1;



function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate:1.2});
}   

function exibirMsgInicial() {
    exibirTextoTela('h1', 'JOGO DO NÚMERO SECRETO');
    exibirTextoTela('p', 'Escolha um número entre 1 e 50.');
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numSecreto){
        exibirTextoTela('h1', 'ACERTOU!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let msgTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}`
        exibirTextoTela('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numSecreto) {
            exibirTextoTela('p', 'O número secreto é menor');
        } else {
            exibirTextoTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}    

function sorteioNumSecreto() {
    let numSecreto = parseInt(Math.random() * numeroLimite+1);
    let quantidadeNumLista = listaNumSorteados.length;

    if (quantidadeNumLista == numeroLimite) {
        listaNumSorteados = [];
    }
    if (listaNumSorteados.includes(numSecreto)) {
        return sorteioNumSecreto();
    } else {
        listaNumSorteados.push(numSecreto);
        console.log(listaNumSorteados)
        return numSecreto
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numSecreto = sorteioNumSecreto();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

exibirMsgInicial();