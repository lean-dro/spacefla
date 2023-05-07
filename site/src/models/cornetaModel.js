var database = require("../database/config");


function listar() {
    console.log("Acessando corneta model");
    var instrucao = `
        SELECT corneta.*, nomeUsuario FROM corneta 
            INNER JOIN usuario ON corneta.fkUsuario = usuario.idUsuario;
    `
    console.log("Executando a instrução sql: "+instrucao);
    return database.executar(instrucao);
}
function cadastrar(tipo, comentario, competicao, jogador, usuario){
    console.log("Acessando corneta model");
    var instrucao = `
        INSERT INTO corneta    
            (tipoCorneta, comentarioCorneta, competicao, fkJogador, fkUsuario)
            VALUES('${tipo}', '${comentario}', '${competicao}', ${jogador}, ${usuario});
    `
    console.log("Executando a instrução sql: "+instrucao);
    return database.executar(instrucao);
}
module.exports={
    listar, 
    cadastrar
}