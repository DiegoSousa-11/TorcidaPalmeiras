var database = require('../database/config');
var matchController = require('../controllers/matchController');

function getAssertivenessRate() {
    const query = `SELECT (SELECT COUNT(guessIsRight) FROM Guess WHERE guessIsRight = TRUE) AS rightGuesses, 
    (SELECT COUNT(guessIsRight) FROM Guess WHERE guessIsRight = FALSE) AS wrongGuesses`;

    return database.execute(query);
}

function getCrowdRanking() {
    const query = `SELECT idUser, name, surname, profileImage, COUNT(guessIsRight) as rightGuesses FROM User JOIN Guess
	ON idUser = fkUser WHERE guessIsRight = TRUE GROUP BY idUser ORDER BY COUNT(guessIsRight) DESC LIMIT 10`;

    return database.execute(query);
}

function checkGuesses() {
    const querySelect = `SELECT DISTINCT idMatch, idGuess, guessIsRight, matchDate FROM Guess ORDER BY idGuess DESC LIMIT 1`;

    database.execute(querySelect).then((selectResult) => {
        for(var i = 0; i < selectResult.length; i++) {
            const matchDate = new Date(selectResult[i].matchDate);
            const currentDate = new Date();

            if(selectResult[i].guessIsRight == null && currentDate > matchDate) {
                matchController.getMatchById(selectResult[i].idMatch).then((result) => {
                    if(result.status == 'FINISHED') {
                        var queryUpdate = `
                            UPDATE Guess SET guessIsRight = TRUE WHERE homeGoals = ${result.score.fullTime.home} AND awayGoals = ${result.score.fullTime.away} AND idMatch = ${result.id};
                        `;
                        
                        database.execute(queryUpdate);

                        queryUpdate = `
                            UPDATE Guess SET guessIsRight = FALSE WHERE homeGoals != ${result.score.fullTime.home} OR awayGoals != ${result.score.fullTime.away} AND idMatch = ${result.id};
                        `;

                        database.execute(queryUpdate);
                    }
                });
            }

            console.log('Verificado');
        }
    })
}

module.exports = {
    getAssertivenessRate,
    getCrowdRanking,
    checkGuesses
}