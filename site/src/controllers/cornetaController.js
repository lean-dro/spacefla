var cornetaModel = require("../models/cornetaModel");
var porcentagens = {
    porcentagemBem: [],
    porcentagemMal: []
}
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

function listarTop(req, res) {
    cornetaModel.listarTop().then(function(resultado) {
        if(resultado.length > 0){
            res.status(200).json(resultado)
        }else{
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
    var usuario = req.params.idUsuario;
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
function obterMaiorCompeticao(req,res) {
    cornetaModel.obterMaiorCompeticao().then(function(resultado) {
        res.status(200).json(resultado)
    })
}

function listarQtdPosicao(req,res) {
    cornetaModel.listarQtdPosicao().then(function(resultado) {
        res.status(200).json(resultado)
    }).catch(function(erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}

async function listarPorcentagens(req, res) {

    await cornetaModel.listarPorcentagemBem().then(function(resultado) {
        porcentagens.porcentagemBem.push(resultado)
    })
    await cornetaModel.listarPorcentagemMal().then(function(resultado) {
        porcentagens.porcentagemMal.push(resultado)
    })
    
    res.status(200).json(porcentagens)
    porcentagens.porcentagemBem = []
    porcentagens.porcentagemMal = []
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
    listarCurtidos,
    listarTop,
    listarPorcentagens,
    listarQtdPosicao,
    obterMaiorCompeticao
}