var curtidaModel = require("../models/curtidaModel")
function testar(req,res) {
    console.log("Dentro da curtidaController")
}
function verificarCurtida(req, res) {
    var usuario = req.body.usuarioServer;
    var corneta = req.body.cornetaServer;
    if(usuario == undefined){
        res.status(400).send("Usuário indefinido")
    }else if(corneta == undefined){
        res.status(400).send("Corneta indefnida")
    }else{
        curtidaModel.verificarCurtida(usuario, corneta).then(function(resultado) {
            if(resultado.length > 0){
                
                if(resultado[0].curtidas>0){
                    curtidaModel.removerCurtida(usuario, corneta).then(function() {
                        curtidaModel.listarCurtidasCornetas(corneta).then(
                            function(curtidas) {
                                res.status(200).json(curtidas)
                            }
                        ).catch(function(erro) {
                            console.log(erro.sqlMessage)
                        })
                    }
                    )                   
                }else{
                    curtidaModel.curtir(usuario, corneta).then(function() {
                        curtidaModel.listarCurtidasCornetas(corneta).then(
                            function(curtidas) {
                                res.status(200).json(curtidas)
                            }
                        ).catch(function(erro) {
                            console.log(erro.sqlMessage)
                        })
                    }
                    )
                }
                
            }else{
                res.status(500).json("Sem resultados!")
            }
        })
    }

}

module.exports = {
    testar,
    verificarCurtida,
}