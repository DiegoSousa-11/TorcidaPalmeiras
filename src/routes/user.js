var express = require("express");
var router = express.Router();

var userController = require('../controllers/userController');

router.post('/register', (req, res) => {
    userController.register(req, res);
});

router.post('/authenticate', (req, res) => {
    userController.login(req, res);
});

router.post('/:idUser/createPrediction', (req, res) => {
    userController.createPrediction(req, res);
});

router.get('/:idUser/lastPrediction', (req, res) => {
    userController.getLastPrediction(req, res);
});

router.get('/:idUser/lastPredictions', (req, res) => {
    userController.getLastSixPredictions(req, res);
});

router.get('/:idUser/assertivenessRate', (req, res) => {
    userController.getAssertivenessRate(req, res);
});

module.exports = router;