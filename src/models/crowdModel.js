var database = require('../database/config');

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

module.exports = {
    getAssertivenessRate,
    getCrowdRanking
}