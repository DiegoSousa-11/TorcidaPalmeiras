var express = require("express");
var router = express.Router();

var matchesController = require('../controllers/matchController');

router.get('/lastMatches', (req, res) => {
    matchesController.listLastMatches(req, res);
});

router.get('/nextMatch', (req, res) => {
    matchesController.getNextMatch(req, res);
});

module.exports = router;