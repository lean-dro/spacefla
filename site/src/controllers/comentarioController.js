var comentarioModel = require('../models/comentarioModel')
async function listar(req,res) {
    var fkUsuarioPerfil = req.params.fkUsuario
    var query = await comentarioModel.listar(fkUsuarioPerfil)
    res.status(200).json(query)
}

async function comentar(req,res) {
    var fkUsuarioPerfil = req.body.fkUsuarioPerfilServer
    var fkUsuarioComentario = req.body.fkUsuarioComentarioServer
    var comentario = req.body.comentarioServer

    var query = await comentarioModel.comentar(comentario,fkUsuarioComentario,fkUsuarioPerfil).then(function(resposta) {
       res.status(204).send("Comentado") 
    }).catch(function(erro) {
        console.log(erro)
    })
}

module.exports={
    listar, 
    comentar
}