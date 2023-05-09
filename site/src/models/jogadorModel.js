var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT * FROM jogador;
    `
    return database.executar(instrucao)
}

module.exports = {
    listar
};

