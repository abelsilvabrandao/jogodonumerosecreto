function isSmallScreen() {
    return window.innerWidth <= 768;
}
let listaDeNumerosSorteados = [];
let numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo número secreto');
    exibirTextoNaTela('p', 'Liz Escolha um número entre 1 e 1000');
}

exibirMensagemInicial();

document.querySelector('input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        verificarChute();
    }
});

function verificarChute() {
    let chute = document.querySelector('.container__input').value;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

        if (tentativas >= 1 && tentativas <= 5) {
            mensagemTentativas = "Você é foda! Parabéns!";
        } if (tentativas >= 6 && tentativas <= 10) {
            mensagemTentativas += " Demorou em? Você precisa melhorar, se esforce mais!";
        } if (tentativas >= 11 && tentativas <= 19) {
            mensagemTentativas += " Xii é retardado! Tenta mais uma vez vacilão!";    
        } else if (tentativas >= 20) {
            mensagemTentativas += " Desista você é burro pra caralho! Vai descansar a mente chega por hoje!";
        }

        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}




