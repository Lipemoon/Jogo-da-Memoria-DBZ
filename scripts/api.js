const CONFIG_API_URLS = [
    "https://dragonball-api.com/api/characters",
  "https://dragonball-api.com/api/characters?page=2&limit=10",
  "https://dragonball-api.com/api/characters?page=4&limit=10",
]

class CartaBase {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    /* Explicação da Promise:
    Primeiro .then(res => res.json())
    Depois que o fetch responde, você recebe um objeto Response.
    res.json() converte em json

    Segundo .then(dados => resolve(...))
    Aqui, você recebeu os dados da API.
    então como deu certo, chama o resolve no metodo transformarEmCartas
    
    .catch() serve para capturar algum erro que deu durante a chamada da api entao
    chama o reject.
    */
    buscarPersonagens(qtd) {
        return new Promise((resolve, reject) => {
            fetch(this.apiUrl)
                .then(res => res.json())
                .then(dados => resolve(this.transformarEmCartas(dados, qtd)))
                .catch(erro => reject(erro));
        });
    }
    /* Podia ser feito desse jeito 
    async buscarPersonagens(qtd) {
        try {
            const res = await fetch(this.apiUrl);
            const dados = await res.json();
            return this.transformarEmCartas(dados, qtd);
        } catch (erro) {
            throw erro;
        } 
    }
    */
}

class CartaDragonBall extends CartaBase {
    constructor() {
        const url = api.endpoints[Math.floor(Math.random() * api.endpoints.length)];
        super(url);
    }
    /*
    “Mesmo que o método buscarPersonagens esteja definido na classe base, como eu crio uma instância da classe filha, 
    o this sempre aponta para a classe filha. Por isso, quando buscarPersonagens chama this.transformarEmCartas, 
    a versão sobrescrita da classe filha é que é executada. Isso demonstra polimorfismo: 
    a mesma função da classe base se comporta diferente dependendo da classe filha que a chama.”
    */
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


