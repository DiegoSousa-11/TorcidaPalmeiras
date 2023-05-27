var database = require('../database/config');

function register(name, surname, email, password, imagePath) {
    const query = `INSERT INTO User (name, surname, email, password, profileImage) VALUES ('${name}', '${surname}', '${email}', '${password}', '${imagePath}')`;

    return database.execute(query);
}

function login(email, password) {
    const query = `SELECT * FROM User WHERE email='${email}' AND password='${password}'`;

    return database.execute(query);
}

function createPrediction(homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, matchDate, competition, idMatch, idUser) {
    const query = `INSERT INTO Guess (homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, matchDate, competition, idMatch, fkUser) 
    VALUES ('${homeTeam}', '${homeTeamLogo}', '${awayTeam}', '${awayTeamLogo}', '${homeGoals}', '${awayGoals}', '${matchDate}', '${competition}', '${idMatch}', '${idUser}')`;

    return database.execute(query);
}

function getLastPrediction(idUser) {
    const query = `SELECT * FROM Guess WHERE fkUser = ${idUser} ORDER BY idGuess DESC LIMIT 1`;

    return database.execute(query);
}

function getLastSixPredictions(idUser) {
    const query = `SELECT * FROM Guess WHERE fkUser = ${idUser} ORDER BY matchDate DESC LIMIT 6`;

    return database.execute(query);
}

function getAssertivenessRate(idUser) {
    const query = `SELECT (SELECT COUNT(guessIsRight) FROM Guess WHERE fkUser = ${idUser} AND guessIsRight = TRUE) AS rightGuesses, 
    (SELECT COUNT(guessIsRight) FROM Guess WHERE fkUser = ${idUser} AND guessIsRight = FALSE) AS wrongGuesses;`;

    return database.execute(query);
}

module.exports = {
    register,
    login,
    createPrediction,
    getLastPrediction,
    getLastSixPredictions,
    getAssertivenessRate
}