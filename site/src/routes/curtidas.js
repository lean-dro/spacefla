var express = require('express')
var router = express.Router()

var curtidaController = require("../controllers/curtidaController")

router.get("/verificar/:idUsuario/:idCorneta", function(req,res) {
    curtidaController.verificarCurtida(req,res)
})
module.exports = router