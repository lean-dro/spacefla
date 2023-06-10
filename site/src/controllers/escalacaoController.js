var escalacaoModel = require('../models/escalacaoModel')

async function listar(req, res) {
    var query = await escalacaoModel.listar()
    console.log(query)
    res.status(200).json(query)
}

async function listarEscalacaoUsuario(req, res) {
    var fkUsuario = req.params.fkUsuario
    var query = await escalacaoModel.listarEscalacaoUsuario(fkUsuario)
    res.status(200).json(query)
}

async function cadastrar(req,res) {
    var fkUsuario = req.body.fkUsuarioServer
    var fkJogador = req.body.fkJogadorServer
    var tatica = req.body.taticaServer
    var formacao = req.body.formacaoServer

    var escalacaoUsuario = await escalacaoModel.listarEscalacaoUsuario(fkUsuario)

    if(escalacaoUsuario.length == 11){
       await escalacaoModel.apagar(fkUsuario)
    }
    escalacaoModel.cadastrar(fkJogador,fkUsuario,formacao,tatica).then(function() {
        res.status(204).send("Escalado")
    }).catch(function(resposta) {
        console.log(resposta)
    })
}



module.exports={
    cadastrar,
    listar, 
    listarEscalacaoUsuario
}