const CONFIG_API_URLS = [
    "https://dragonball-api.com/api/characters",
  "https://dragonball-api.com/api/characters?page=2&limit=10",
  "https://dragonball-api.com/api/characters?page=4&limit=10",
]

const api = new Api(CONFIG_API_URLS);

const tabuleiro = document.getElementById("tabuleiro");
const jogadasRestantesElemento = document.getElementById("jogadasRestantes");

jogadasRestantesElemento.textContent = `Tentativas Restantes: ${jogo.tentativasRestantes}`;

const derrotas = document.getElementById("numeroDerrotas");
const vitorias = document.getElementById("numeroVitorias");
async function carregarJogo() {
    tabuleiro.innerHTML = "";
    try {
        const cartaDBZ = new CartaDragonBall(api);
        const cartasBase = await cartaDBZ.buscarPersonagens(jogo.totalCartas);

        const cartas = [...cartasBase, ...cartasBase]
        
        cartas.sort(() => Math.random() - 0.5);
        
        cartas.forEach(personagem => {
            const carta = criarCarta(personagem);
            tabuleiro.appendChild(carta);
        });
    } catch (erro) {
        console.error("Erro ao carregar personagens:", erro);
    }
}

function criarCarta(personagem) {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.id = personagem.id;

    const cartaInner = document.createElement("div");
    cartaInner.classList.add("carta-inner");

    const cartaFront = document.createElement("div");
    cartaFront.classList.add("carta-front");
    cartaFront.style.backgroundImage = `url(${personagem.imagem})`;

    const cartaBack = document.createElement("div");
    cartaBack.classList.add("carta-back");
    cartaBack.textContent = "DBZ";

    cartaInner.appendChild(cartaFront);
    cartaInner.appendChild(cartaBack);
    carta.appendChild(cartaInner);

    carta.addEventListener("click", () => virarCarta(carta));

    return carta;
}

function virarCarta(carta) {
    if (jogo.bloqueado || carta.classList.contains("virada")) {
        return;
    } 

    carta.classList.add("virada");

    if (!comparacao.carta1) {
        comparacao.carta1 = carta;
    } else {
        comparacao.carta2 = carta;
        verificarPar();
    }
}

function verificarPar() {
    jogo.bloqueado = true;

    if (comparacao.carta1.id === comparacao.carta2.id) {
        comparacao.carta1.classList.add("acertou");
        comparacao.carta2.classList.add("acertou");
        jogo.totalCartas--;
        resetarObjetoComparacao();
    } else {
        jogo.tentativasRestantes--;
        setTimeout(() => {  
            comparacao.carta1.classList.remove("virada");
            comparacao.carta2.classList.remove("virada");
            resetarObjetoComparacao();
        }, 1000);
    }

    jogadasRestantesElemento.textContent = `Tentativas Restantes: ${jogo.tentativasRestantes}`;

    if (jogo.totalCartas === 0) {
        setTimeout(() => 
            setTimeout(() => 
                alert("🎉 Parabéns! Você venceu o jogo!"), 
                jogo.vitorias++,
                vitorias.textContent = `Numero de Vitórias: ${jogo.vitorias}`,
                resetarObjetoJogo(),
                carregarJogo(),
            500),
        500)
    } else if (jogo.tentativasRestantes < 1) {
        setTimeout(() => 
            setTimeout(() => 
                alert("💀 Fim de jogo! Você perdeu."), 
                jogo.derrotas++,
                derrotas.textContent = `Numero de Derrotas: ${jogo.derrotas}`,
                resetarObjetoJogo(),
                carregarJogo(),
            500),
        500)
    }
}

function resetarObjetoJogo() {
    jogo.tentativasRestantes = 10;
    jogo.totalCartas = 10;
    jogadasRestantesElemento.textContent = `Tentativas Restantes: ${jogo.tentativasRestantes}`;
}

function resetarObjetoComparacao() {
    comparacao.carta1 = null;
    comparacao.carta2 = null;
    jogo.bloqueado = false;
}

carregarJogo();
