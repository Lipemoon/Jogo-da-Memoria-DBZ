class CartaBase {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    buscarPersonagens(qtd) {
        return new Promise((resolve, reject) => {
            fetch(this.apiUrl)
                .then(res => res.json())
                .then(dados => resolve(this.transformarEmCartas(dados)))
                .catch(erro => reject(erro));
        });
    }
}

class CartaDragonBall extends CartaBase {
    constructor() {
        const url = api.endpoints[Math.floor(Math.random() * api.endpoints.length)];
        super(url);
    }
    transformarEmCartas(dados) {
        return dados.items.map(carta => 
            new Carta(
                carta.id,
                carta.name,
                carta.image
            )
        );
    }
}


