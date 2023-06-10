var express = require('express');
var router = express.Router();

var escalacaoController = require('../controllers/escalacaoController')

router.get('/listar', function(req,res) {
    escalacaoController.listar(req,res)
});

router.get('/listarEscalacaoUsuario/:fkUsuario', function(req,res) {
    escalacaoController.listarEscalacaoUsuario(req,res)
});

router.post('/cadastrar',function(req,res) {
    escalacaoController.cadastrar(req,res)
});

module.exports = router

