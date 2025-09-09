/*function saudacao(nome){
    console.log('Olá',nome);
}
saudacao('Anax');

function calcularDobro(numero) {
    return numero*2;
}
let resultadoDobro = calcularDobro(8);
console.log(resultadoDobro);

function calcularMedia(numero1, numero2, numero3) {
    return(numero1+numero2+numero3)/3;
}
let media = calcularMedia(3,1,5);
console.log(media);

function encontraMaior(numero1, numero2) {
    return numero1>numero2? numero1:numero2;
}
let numeroMaior = encontraMaior(5,5);
console.log(numeroMaior);

function elevarQuadrado(n){
    return n*n;
}
let resultadoQuadrado = elevarQuadrado(5);
console.log(resultadoQuadrado);*/

let numerosSorteados=[];
let quantidadeMaximaDeNumeros = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
mensagemInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    /*responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});*/
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto!');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!')
        let palavraTentativa = tentativas>1? 'tentativas':'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.querySelector('button').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute>numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor!');
        }
        else{
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido=parseInt(Math.random()*quantidadeMaximaDeNumeros+1);
    let quantidadeNumerosSorteados=numerosSorteados.length;

    if(quantidadeNumerosSorteados==quantidadeMaximaDeNumeros){
        numerosSorteados=[];
    }
    if (numerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
    }else{
        numerosSorteados.push(numeroEscolhido);
        console.log(numerosSorteados);
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
    tentativas=1;
    mensagemInicial();
    document.querySelector('button').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

/*let testeListas = ['amor','ódio','tédio','paixão','inveja','orgulho','raiva']

let primeiro = testeListas[0];
console.log(primeiro);
let ultimo = testeListas[testeListas.length-1];
console.log(ultimo);*/


