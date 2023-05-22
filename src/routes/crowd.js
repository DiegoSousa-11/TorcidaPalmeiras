var express = require('express');
var router = express.Router();

var crowdController = require('../controllers/crowdController');

router.get('/assertivenessRate', (req, res) => {
    crowdController.getAssertivenessRate(req, res);
});

router.get('/ranking', (req, res) => {
    crowdController.getCrowdRanking(req, res);
});

module.exports = router;
