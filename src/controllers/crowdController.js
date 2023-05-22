var crowdModel = require('../models/crowdModel');

function getAssertivenessRate(req, res) {
    crowdModel.getAssertivenessRate().then((result) => {
        res.json(result);
    }).catch((error) => {
        console.error(error);
        res.status(500).json(error.sqlMessage);
    })
}

function getCrowdRanking(req, res) {
    crowdModel.getCrowdRanking().then((result) => {
        res.json(result);
    }).catch((error) => {
        console.error(error);
        res.status(500).json(error.sqlMessage);
    })
}

module.exports = {
    getAssertivenessRate,
    getCrowdRanking
}
