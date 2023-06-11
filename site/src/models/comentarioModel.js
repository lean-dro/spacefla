var database = require('../database/config')

function listar(idUsuario) {
    var instrucao = `
    SELECT comentarioPerfil.*,nomeUsuario 
    FROM comentarioPerfil
    INNER JOIN usuario
    ON fkUsuarioComentario = idUsuario
    where fkUsuarioPerfil = ${idUsuario}
    ORDER BY dtComentario DESC; 
    `
    return database.executar(instrucao)
}

function comentar(texto, fkUsuarioComentario, fkUsuarioPerfil) {
    var instrucao = `
        INSERT INTO comentarioPerfil
        VALUES(null, '${texto}', default, ${fkUsuarioPerfil}, ${fkUsuarioComentario});
    `
    return database.executar(instrucao)
}

module.exports={
    listar,
    comentar
}