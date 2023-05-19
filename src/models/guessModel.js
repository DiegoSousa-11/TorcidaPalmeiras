var database = require('../database/config'); 

function createPrediction(homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, matchDate, idUser) {
    const query = `INSERT INTO guess (homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, matchDate, fkUser) 
    VALUES ('${homeTeam}', '${homeTeamLogo}', '${awayTeam}', '${awayTeamLogo}', '${homeGoals}', '${awayGoals}', '${matchDate}', '${idUser}')`;

    return database.execute(query);
}

function getLastPrediction() {
    const query = `SELECT * FROM guess ORDER BY idGuess DESC LIMIT 1`;

    return database.execute(query);
}

module.exports = {
    createPrediction,
    getLastPrediction
}
