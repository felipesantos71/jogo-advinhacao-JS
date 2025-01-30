//Forma de editar tags sem funcao
//let titulo = document.querySelector("h1");
//titulo.innerHTML = "Jogo do número secreto";
//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "Escolha um número entre 1 e 10.";

//defindindo variavel
let listaNumerosSorteados = [];
let numeroMultiplicador = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//funcao para editar tags do html
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ("speechSynthesis" in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = "pt-BR";
        utterance.lang = 1.2;
        window.speechSynthesis.speak(utterance);
    }   else    {
        console.log("web speech API não suportada neste navegador.")
    }
}

//funcao chamando funcoes sem retorno para editar os campos do html
function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroMultiplicador}.`);
}

exibirMensagemInicial();


//funcao sem retorno para mostrar mensagem ao clicar no botao chute
function verificarNumeroSecreto() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você acertou com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }   else    {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "Número secreto é menor.");
        }   else    {
            exibirTextoNaTela("p", "Número secreto é maior.");
        }
        tentativas+=1;
        limparCampo();
    }
}

//funcao com retorno para gerar numero aleatorio
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMultiplicador + 1);
    //verificando se lista esta cheia e zerando se for o caso
    let quantidadeElementosDaLista = listaNumerosSorteados.length;
    if (quantidadeElementosDaLista == numeroMultiplicador) {
        listaNumerosSorteados = [];
    }
    //verificando se numero escolhido esta dentro da lista e incluido caso nao esteja
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }   else    {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//funcao de limpar campo
function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

//funcao para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}