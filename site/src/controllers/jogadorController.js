var jogadorModel = require("../models/jogadorModel")

function listar(req, res) {
    jogadorModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
                console.log(resultado)
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
    jogadorModel.listarTop()
    .then(function(resultado) {
        if(resultado.length > 0){
            var top = []
            
           
            if(resultado.length == 1){
                top.push(resultado[0].nomeJogador)
               
            }else if(resultado.length == 2){
                top.push(resultado[0].nomeJogador)
                top.push(resultado[1].nomeJogador)
                
            }else{
                top.push(resultado[0].nomeJogador)
                top.push(resultado[1].nomeJogador)
                top.push(resultado[2].nomeJogador)
            }
            res.status(200).json(top)
            console.log(top)

        }else {
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
module.exports = {
    listar,
    listarTop
}
