CREATE DATABASE TorcidaPalmeiras;

USE TorcidaPalmeiras;

CREATE TABLE User (
	idUser INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45),
	surname VARCHAR(45),
    profileImage VARCHAR(150),
    email VARCHAR(100),
    password VARCHAR(45)
);

SELECT * FROM User;

CREATE TABLE Guess (
	idGuess INT PRIMARY KEY AUTO_INCREMENT,
    matchDate VARCHAR(45),
	homeTeam VARCHAR(45),
    homeTeamLogo VARCHAR(255),
    awayTeam VARCHAR(45),
	awayTeamLogo VARCHAR(255),
    homeGoals INT,
    awayGoals INT,
    guessIsRight TINYINT,
    fkUser INT,
    idMatch INT,
    competition VARCHAR(200),
    CONSTRAINT fkUser FOREIGN KEY (fkUser) REFERENCES User(idUser)
);

SELECT * FROM Guess;

SELECT guessIsRight FROM Guess ORDER BY idGuess DESC LIMIT 1;

INSERT INTO Guess (matchDate, homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, guessIsRight, fkUser, competition, idMatch)
VALUES
    ('2023-05-24T22:00:00Z', 'Cerro Porteño', 'https://crests.football-data.org/9373.png', 'Palmeiras', 'https://crests.football-data.org/1769.png', '0', '1', null, 1, 'Copa Libertadores', 433672);

INSERT INTO Guess (matchDate, homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, guessIsRight, fkUser, competition)
VALUES
    ('2023-05-02 19:00:00', 'Palmeiras', 'https://crests.football-data.org/1769.png', 'Flamengo', 'https://logodownload.org/wp-content/uploads/2016/09/flamengo-logo-escudo-novo.png', '2', '1', true, 1, 'Campeonato Brasileiro Série A'),
    ('2023-05-10 18:30:00', 'Palmeiras', 'https://crests.football-data.org/1769.png', 'São Paulo', 'https://upload.wikimedia.org/wikipedia/pt/4/4b/S%C3%A3o_Paulo_Futebol_Clube.png', '1', '1', true, 1, 'Campeonato Brasileiro Série A'),
    ('2023-05-05 21:00:00', 'Palmeiras', 'https://crests.football-data.org/1769.png', 'Internacional', 'https://logodetimes.com/times/internacional/logo-internacional-4096.png', '2', '0', false, 1, 'Campeonato Brasileiro Série A'),
    ('2023-05-15 19:30:00', 'Palmeiras', 'https://crests.football-data.org/1769.png', 'Grêmio', 'https://seeklogo.com/images/G/Gr__mio_Porto_Alegre-logo-709819E2D9-seeklogo.com.png', '2', '2', true, 1, 'Campeonato Brasileiro Série A');

SELECT (SELECT COUNT(guessIsRight) FROM Guess WHERE fkUser = 1 AND guessIsRight = TRUE) AS rightGuesses, 
(SELECT COUNT(guessIsRight) FROM Guess WHERE fkUser = 1 AND guessIsRight = FALSE) AS wrongGuesses;

SELECT (SELECT COUNT(guessIsRight) FROM Guess WHERE guessIsRight = TRUE) AS rightGuesses, 
(SELECT COUNT(guessIsRight) FROM Guess WHERE guessIsRight = FALSE) AS wrongGuesses;
    
SELECT idUser, name, surname, profileImage, 
COUNT(CASE WHEN guessIsRight = TRUE THEN 1 END) AS correctGuesses
FROM User
LEFT JOIN Guess ON idUser = fkUser
GROUP BY idUser
ORDER BY COUNT(guessIsRight) DESC
LIMIT 10;

UPDATE Guess SET guessIsRight = (CASE WHEN homeGoals = 0 AND awayGoals = 3 THEN TRUE ELSE FALSE END) WHERE idMatch = 433672;
UPDATE Guess SET guessIsRight = TRUE WHERE homeGoals = 0 AND awayGoals = 3 AND idMatch = 433672;

SELECT * FROM Guess WHERE fkUser = 1 ORDER BY idGuess DESC LIMIT 1;
