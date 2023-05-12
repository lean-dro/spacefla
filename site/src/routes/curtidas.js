var express = require('express')
var router = express.Router()

var curtidaController = require("../controllers/curtidaController")

router.post("/verificar-curtidas-usuario", function(req,res) {
    curtidaController.verificarCurtidasUsuario(req, res)
})
router.post("/verificar", function(req,res) {
    curtidaController.verificarCurtida(req,res)
})
module.exports = router