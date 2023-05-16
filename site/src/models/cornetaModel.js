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
    fkJogador, ROUND(((COUNT(idCorneta)*100)/(SELECT COUNT(idCorneta) FROM corneta WHERE tipoCorneta = "Jogando bem")),2) as porcentagemBem FROM corneta
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
    fkJogador, ROUND(((COUNT(idCorneta)*100)/(SELECT COUNT(idCorneta) FROM corneta WHERE tipoCorneta = "Jogando mal")), 2) as porcentagemMal FROM corneta
    WHERE tipoCorneta = "Jogando mal"
    GROUP BY fkJogador
    ORDER BY porcentagemMal DESC;
    `
    console.log("Executando a instrução sql: "+instrucao);
    return database.executar(instrucao);
}
module.exports={
    listar, 
    cadastrar,
    listarCurtidos,
    listarTop,
    listarPorcentagemBem,
    listarPorcentagemMal
}