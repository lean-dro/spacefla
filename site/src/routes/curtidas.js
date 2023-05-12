var express = require('express')
var router = express.Router()

var curtidaController = require("../controllers/curtidaController")

router.post("/verificar", function(req,res) {
    curtidaController.verificarCurtida(req,res)
})
module.exports = router