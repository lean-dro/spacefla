var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT * FROM jogador;
    `
    return database.executar(instrucao)
}
function buscarFoto() {
    var instrucao = `SELECT idJogador,fotoJogador,nomeJogador FROM jogador;`;
    return database.executar(instrucao);
}
function listarTop() {
    var instrucao = `
    SELECT COUNT(fkJogador) as contagem, nomeJogador 
    FROM corneta 
    join jogador on fkJogador = idJogador 
    GROUP by fkJogador order by contagem desc;
    `
    return database.executar(instrucao)
}

module.exports = {
    listar,
    listarTop,
    buscarFoto
};

