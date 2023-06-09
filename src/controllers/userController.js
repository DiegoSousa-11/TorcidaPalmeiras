const userModel = require('../models/userModel');

function register(req, res) {
    const imagePath = req.file?.filename;
    const { name, surname, email, password } = req.body;

    if(!name || !surname || !email || !password) {
        res.status(400).send('Preencha todos os dados');
    } else {
        userModel.register(name, surname, email, password, imagePath).then((result) => {
            res.json(result);
        }).catch((error) => {
            console.log(error);
            res.status(500).json(error.sqlMessage)
        });
    }
}

function login(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).send('Alguns dados estão vazios');
    } else {
        userModel.login(email, password).then((result) => {
            res.json(result);
        }).catch((error) => {
            console.log(error);
            res.status(500).json(error.sqlMessage)
        });
    }
}

function createPrediction(req, res) {
    const { 
        homeTeam, 
        homeTeamLogo, 
        awayTeam, 
        awayTeamLogo, 
        homeGoals, 
        awayGoals, 
        matchDate,
        competition,
        idMatch
    } = req.body;

    const { idUser } = req.params;

    if(!homeTeam || !homeTeamLogo || !awayTeam || !awayTeamLogo || !homeGoals || !awayGoals || !matchDate || !idUser || !competition || !idMatch) {
        res.status(400).send('Alguns dados estão vazios');
    } else {
        userModel.createPrediction(homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, matchDate, competition, idMatch, idUser).then((result) => {
            res.json(result);
        }).catch((error) => {
            console.log(error);
            res.status(500).json(error.sqlMessage)
        });
    }
}

function getLastPrediction(req, res) {
    const { idUser } = req.params;

    userModel.getLastPrediction(idUser).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error.sqlMessage)
    });
}

function getLastSixPredictions(req, res) {
    const { idUser } = req.params;

    userModel.getLastSixPredictions(idUser).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error.sqlMessage)
    });
}

function getAssertivenessRate(req, res) {
    const { idUser } = req.params;

    userModel.getAssertivenessRate(idUser).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error.sqlMessage);
    });
}

function checkGuesses(req, res) {
    userModel.checkGuesses().then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
    register,
    login,
    createPrediction,
    getLastPrediction,
    getLastSixPredictions,
    getAssertivenessRate,
    checkGuesses
}