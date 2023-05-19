var express = require("express");
var router = express.Router();

var guessController = require('../controllers/guessController');

router.post('/createPrediction', (req, res) => {
    guessController.createPrediction(req, res);
});

router.get('/lastPrediction', (req, res) => {
    guessController.getLastPrediction(res, res);
});

module.exports = router;