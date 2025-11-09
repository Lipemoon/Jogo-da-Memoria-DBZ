const api = new Api(CONFIG_API_URLS);
console.log(api);

// 6️⃣ Variáveis de controle do jogo
const tabuleiro = document.getElementById("tabuleiro");
const jogadasRestantesElemento = document.getElementById("jogadasRestantes");

jogadasRestantesElemento.textContent = `Tentativas Restantes: ${jogo.tentativasRestantes}`;

const derrotas = document.getElementById("numeroDerrotas");
const vitorias = document.getElementById("numeroVitorias");
/* ======= Carregar Personagens ======= */
async function carregarPersonagens() {
    tabuleiro.innerHTML = "";
    const cartaDBZ = new CartaDragonBall(api);
    const cartasBase = await cartaDBZ.buscarImagens(jogo.totalCartas);

    // duplica e embaralha
    const cartas = [...cartasBase, ...cartasBase].sort(() => Math.random() - 0.5);

    cartas.forEach(personagem => {
        const carta = criarCarta(personagem);
        tabuleiro.appendChild(carta);
    });
}

/* ======= Cria carta ======= */
function criarCarta(personagem) {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.id = personagem.id;

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

/* ======= Virar carta ======= */
function virarCarta(carta) {
    if (jogo.bloqueado || carta.classList.contains("virada")) return;

    carta.classList.add("virada");

    if (!comparacao.carta1) {
        comparacao.carta1 = carta;
    } else {
        comparacao.carta2 = carta;
        verificarPar();
    }
}

/* ======= Verificar par ======= */
function verificarPar() {
    jogo.bloqueado = true;
    const id1 = comparacao.carta1.dataset.id;
    const id2 = comparacao.carta2.dataset.id;

    if (id1 === id2) {
        comparacao.carta1.classList.add("acertou");
        comparacao.carta2.classList.add("acertou");
        jogo.totalCartas--;
        resetarSelecao();
    } else {
        jogo.tentativasRestantes--;
        setTimeout(() => {  
            comparacao.carta1.classList.remove("virada");
            comparacao.carta2.classList.remove("virada");
            resetarSelecao();
        }, 1000);
    }

    jogadasRestantesElemento.textContent = `Tentativas Restantes: ${jogo.tentativasRestantes}`;

    if (jogo.totalCartas === 0) {
        setTimeout(() => 
            setTimeout(() => 
                alert("🎉 Parabéns! Você venceu o jogo!"), 
                jogo.vitorias++,
                resetarObjeto(),
                vitorias.textContent = `Numero de Vitórias: ${jogo.vitorias}`,
                carregarPersonagens(),
            500),
        500)
    } else if (jogo.tentativasRestantes < 1) {
        setTimeout(() => 
            setTimeout(() => 
                alert("💀 Fim de jogo! Você perdeu."), 
                jogo.derrotas++,
                resetarObjeto(),
                derrotas.textContent = `Numero de Derrotas: ${jogo.derrotas}`,
                carregarPersonagens(),
            500),
        500)
    }
}

function resetarObjeto() {
    jogo.tentativasRestantes = 10;
    jogo.totalCartas = 10;
    jogadasRestantesElemento.textContent = `Tentativas Restantes: ${jogo.tentativasRestantes}`;
}
/* ======= Resetar ======= */
function resetarSelecao() {
    comparacao.carta1 = null;
    comparacao.carta2 = null;
    jogo.bloqueado = false;
}

/* ======= Iniciar jogo ======= */
carregarPersonagens();
