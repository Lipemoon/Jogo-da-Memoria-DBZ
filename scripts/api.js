const CONFIG_API_URLS = [
    "https://dragonball-api.com/api/characters",
  "https://dragonball-api.com/api/characters?page=2&limit=10",
  "https://dragonball-api.com/api/characters?page=4&limit=10",
]

class CartaBase {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    async buscarImagens(qtd = 10) {
                try {
                    const resposta = await fetch(this.apiUrl);
                    if (!resposta.ok) {
                        throw new Error("Erro na resposta da API");
                    } 
                    const dados = await resposta.json();

                    // converte os dados em um array de imagens genéricas
                    return this.transformarEmCartas(dados, qtd);
                } catch (erro) {
                    console.error("Erro ao buscar imagens:", erro);
                    return [];
                }
        }
         transformarEmCartas(dados, qtd) {
                // Método genérico (pode ser sobrescrito)
                const cartas = [];

                for (let i = 0; i < qtd; i++) {
                    const carta = new Carta(dados.id[i], dados.name[i], dados.image[i]);
                    cartas.push(carta);
                }

                return cartas;
            }
}

// === CLASSE FILHA (API ESPECÍFICA) ===
        class CartaDragonBall extends CartaBase {
            constructor() {
                const url = api.endpoints[Math.floor(Math.random() * api.endpoints.length)];
                super(url);
            }

            transformarEmCartas(dados) {
                // Adaptar os dados específicos da API
                return dados.items.map(personagem => ({
                    id: personagem.id,
                    nome: personagem.name,
                    imagem: personagem.image
                }));
            }
        }


