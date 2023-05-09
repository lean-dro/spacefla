var express = require('express');
var router = express.Router();

var jogadorController = require("../controllers/jogadorController");


router.get("/", function (req, res) {
    jogadorController.testar(req, res);
});

router.get("/listar", function (req, res) {
    jogadorController.listar(req, res);
});

module.exports = router;