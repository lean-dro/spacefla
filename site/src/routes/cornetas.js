var express = require('express');
var router = express.Router();

var cornetaController = require("../controllers/cornetaController");

router.get("/", function (req, res) {
    cornetaController.testar(req, res);
});

router.get("/listar", function (req, res) {
    cornetaController.listar(req, res);
});

router.get("/listar-top", function (req, res) {
    cornetaController.listarTop(req, res);
});

router.get("/listarCurtidos/:idUsuario", function (req, res) {
    cornetaController.listarCurtidos(req, res);
});

router.get("/listarPorcentagens", function (req, res) {
    cornetaController.listarPorcentagens(req, res);
});
router.get("/listarQtdPosicao", function (req,res) {
    cornetaController.listarQtdPosicao(req,res)
})
router.get("/maiorCompeticao", function (req,res) {
    cornetaController.obterMaiorCompeticao(req,res)
})

router.post("/cadastrar", function (req, res) {
    cornetaController.cadastrar(req, res);
})

module.exports = router;