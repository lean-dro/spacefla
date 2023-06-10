var database = require('../database/config')

function listar() {
    var instrucao='select * from escalacaoIdeal'
    return database.executar(instrucao)
}
function listarEscalacaoUsuario(fkUsuario) {
    var instrucao= `select * from escalacaoIdeal where fkUsuario = ${fkUsuario};`
    return database.executar(instrucao)
}
function cadastrar(fkJogador, fkUsuario, formacao, tatica) {
    var instrucao = `
    INSERT INTO escalacaoIdeal 
    VALUES (null, ${fkUsuario}, ${fkJogador}, '${formacao}', '${tatica}');
    `
    return database.executar(instrucao)
}
function apagar(fkUsuario) {
    var instrucao = `
        DELETE FROM escalacaoIdeal WHERE fkUsuario = ${fkUsuario};
    `
    return database.executar(instrucao)
}

module.exports={
    listar,
    cadastrar,
    listarEscalacaoUsuario,
    apagar
}