var database = require('../database/config');

function register(name, surname, email, password) {
    const query = `INSERT INTO User (name, surname, email, password) VALUES ('${name}', '${surname}', '${email}', '${password}')`;

    return database.execute(query);
}

function login(email, password) {
    const query = `SELECT * FROM User WHERE email='${email}' AND password='${password}'`;

    return database.execute(query);
}

function createPrediction(homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, matchDate, competition, idUser) {
    const query = `INSERT INTO Guess (homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, matchDate, competition, fkUser) 
    VALUES ('${homeTeam}', '${homeTeamLogo}', '${awayTeam}', '${awayTeamLogo}', '${homeGoals}', '${awayGoals}', '${matchDate}', '${competition}', '${idUser}')`;

    return database.execute(query);
}

function getLastPrediction(idUser) {
    const query = `SELECT * FROM Guess WHERE fkUser = ${idUser} ORDER BY idGuess DESC LIMIT 1`;

    return database.execute(query);
}

function getLastSixPredicitons(idUser) {
    const query = `SELECT * FROM Guess WHERE fkUser = 1 ORDER BY idGuess DESC LIMIT 6`;

    return database.execute(query);
}

module.exports = {
    register,
    login,
    createPrediction,
    getLastPrediction,
    getLastSixPredicitons
}