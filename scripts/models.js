// Funções Construtoras
function Carta(id, nome, imagem) {
    this.id = id;
    this.nome = nome;
    this.imagem = imagem;
}

function Api(urls) {
    this.endpoints = urls;
}