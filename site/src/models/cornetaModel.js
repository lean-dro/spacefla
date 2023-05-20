var database = require("../database/config");


function listar() {
    console.log("Acessando corneta model");
    var instrucao = `
        SELECT corneta.*, nomeUsuario, COUNT(idCurtida) as curtidas
        FROM corneta
        left JOIN curtidaCorneta on corneta.idCorneta = fkCorneta
            INNER JOIN usuario ON corneta.fkUsuario = usuario.idUsuario
            GROUP BY corneta.idCorneta,
            corneta.tipoCorneta, corneta.comentarioCorneta,
            corneta.dataCorneta, corneta.competicao, fkJogador, fkUsuario
            ORDER BY dataCorneta DESC;
    `
    console.log("Executando a instrução sql: "+instrucao);
    return database.executar(instrucao);
}
function listarTop() {
    var instrucao = `
        SELECT corneta.*, nomeUsuario, COUNT(idCurtida) as curtidas
        FROM corneta
        left JOIN curtidaCorneta on corneta.idCorneta = fkCorneta
            INNER JOIN usuario ON corneta.fkUsuario = usuario.idUsuario
            GROUP BY corneta.idCorneta,
            corneta.tipoCorneta, corneta.comentarioCorneta,
            corneta.dataCorneta, corneta.competicao, fkJogador, fkUsuario
            ORDER BY curtidas DESC LIMIT 1;
    `
    console.log("Executando a instrução sql: "+instrucao);
    return database.executar(instrucao);
}
function listarCurtidos(usuario) {
    console.log("Acessando corneta model");
    var instrucao = `
        SELECT fkCorneta FROM curtidaCorneta WHERE fkUsuario = ${usuario}
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

function listarPorcentagemBem() {
    var instrucao = `
    SELECT 
    fkJogador, ROUND(((COUNT(idCorneta)*100)/(SELECT COUNT(idCorneta) FROM corneta WHERE tipoCorneta = "Jogando bem")),0) as porcentagemBem FROM corneta
    WHERE tipoCorneta = "Jogando bem"
    GROUP BY fkJogador
    ORDER BY porcentagemBem DESC;
    `
    console.log("Executando a instrução sql: "+instrucao);
    return database.executar(instrucao);
}
function listarPorcentagemMal() {
    var instrucao = `
    SELECT 
    fkJogador, ROUND(((COUNT(idCorneta)*100)/(SELECT COUNT(idCorneta) FROM corneta WHERE tipoCorneta = "Jogando mal")), 0) as porcentagemMal FROM corneta
    WHERE tipoCorneta = "Jogando mal"
    GROUP BY fkJogador
    ORDER BY porcentagemMal DESC;
    `
    console.log("Executando a instrução sql: "+instrucao);
    return database.executar(instrucao);
}
function listarQtdPosicao() {
    var instrucao = `
    SELECT COUNT(idCorneta) as contagem, posicaoJogador as posicao FROM corneta RIGHT JOIN jogador on fkJogador = idJogador GROUP BY posicaoJogador;`
    return database.executar(instrucao)
}
function obterMaiorCompeticao() {
    var instrucao = `
    SELECT COUNT(idCorneta) as contagem, competicao FROM corneta GROUP by competicao ORDER BY contagem DESC limit 1;
    `
    return database.executar(instrucao)
}
module.exports={
    listar, 
    listarQtdPosicao,
    cadastrar,
    listarCurtidos,
    listarTop,
    listarPorcentagemBem,
    listarPorcentagemMal,
    obterMaiorCompeticao
}