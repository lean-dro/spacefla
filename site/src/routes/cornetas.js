var express = require('express');
var router = express.Router();

var cornetaController = require("../controllers/cornetaController");

router.get("/", function (req, res) {
    cornetaController.testar(req, res);
});

router.get("/listar", function (req, res) {
    cornetaController.listar(req, res);
});

router.post("/listarCurtidos", function (req, res) {
    cornetaController.listarCurtidos(req, res);
});


router.post("/cadastrar", function (req, res) {
    cornetaController.cadastrar(req, res);
})

module.exports = router;