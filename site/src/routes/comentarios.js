var express = require('express');
var router = express.Router();

var comentarioController = require('../controllers/comentarioController')

router.get("/listar/:fkUsuario", function(req,res) {
    comentarioController.listar(req,res)
})

router.post("/comentar", function(req,res) {
    comentarioController.comentar(req,res)
})

module.exports = router