var database = require("../database/config")


function listar() {
    var instrucao = "SELECT * FROM curtidaCorneta"
    console.log("Executando a instrução sql: "+instrucao);
    return database.executar(instrucao);
}
function listarCurtidasCornetas(corneta) {
    var instrucao = `SELECT COUNT(idCurtida) as curtidas FROM curtidaCorneta WHERE fkCorneta = ${corneta}`
    console.log("Executando a instrução sql: "+instrucao);
    return database.executar(instrucao);
}
function verificarCurtida(usuario, corneta) {
    var instrucao = `SELECT COUNT(idCurtida) as curtidas FROM curtidaCorneta WHERE fkUsuario = ${usuario} AND fkCorneta = ${corneta}`
    console.log("Executando a instrução sql: "+instrucao);
    return database.executar(instrucao);
}
function curtir(usuario, corneta) {
    var instrucao = `INSERT INTO curtidaCorneta (fkUsuario, fkCorneta) 
                    VALUES(${usuario}, ${corneta})`
                    console.log("Executando a instrução sql: "+instrucao);
                    return database.executar(instrucao);
}
function removerCurtida(usuario, corneta){
    var instrucao = `DELETE FROM curtidaCorneta 
                    WHERE idCurtida IN (SELECT * FROM (SELECT idCurtida 
                    FROM curtidaCorneta WHERE fkUsuario = ${usuario} AND fkCorneta = ${corneta}) AS TESTE)`
                    console.log("Executando a instrução sql: "+instrucao);
                    return database.executar(instrucao);
}
module.exports = {
    listar,
    listarCurtidasCornetas,
    verificarCurtida, 
    curtir,
    removerCurtida
}