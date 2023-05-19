const guessModel = require('../models/guessModel');

function createPrediction(req, res) {
    const { 
        homeTeam, 
        homeTeamLogo, 
        awayTeam, 
        awayTeamLogo, 
        homeGoals, 
        awayGoals, 
        matchDate,
        idUser 
    } = req.body;

    if(!homeTeam || !homeTeamLogo || !awayTeam || !awayTeamLogo || !homeGoals || !awayGoals || !matchDate || !idUser) {
        res.status(400).send('Alguns dados estão vazios');
    } else {
        guessModel.createPrediction(homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, matchDate, idUser).then((result) => {
            res.json(result);
        }).catch((error) => {
            console.log(error);
            res.status(500).json(error.sqlMessage)
        });
    }
}

function getLastPrediction(req, res) {
    guessModel.getLastPrediction().then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error.sqlMessage)
    });
}

module.exports = {
    createPrediction,
    getLastPrediction
}