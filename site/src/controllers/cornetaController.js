var cornetaModel = require("../models/cornetaModel");
function testar(){
    console.log("Rota das cornetas")
}
function listar(req, res) {
    cornetaModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarCurtidos(req,res) {
    var usuario = req.body.usuarioServer;
    if(usuario == undefined){
        res.status(400).send("Seu usuario está undefined!");
    }else{
        cornetaModel.listarCurtidos(usuario).then(function(resultado) {
            res.json(resultado)
        }).catch(function(erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function cadastrar(req, res) {
    var tipo = req.body.tipoServer; 
    var comentario = req.body.comentarioServer; 
    var competicao = req.body.competicaoServer; 
    var jogador = req.body.jogadorServer;
    var usuario = req.body.usuarioServer;

    if(tipo == undefined){
        res.status(400).send("Seu tipo está undefined!");
    }else if(comentario == undefined){
        res.status(400).send("Seu comentario está undefined!");
    }else if(competicao == undefined ){
        res.status(400).send("Seu competicao está undefined!");
    }else if(jogador == undefined ){
        res.status(400).send("Seu jogador está undefined!");
    }else if(usuario == undefined){
        res.status(400).send("Seu usuario está undefined!");
    }else{
        cornetaModel.cadastrar(tipo, comentario, competicao, jogador, usuario)
            .then(function(resultado) {
                res.json(resultado)
            }).catch(function(erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}
module.exports = {
    listar,
    cadastrar,
    testar,
    listarCurtidos
}