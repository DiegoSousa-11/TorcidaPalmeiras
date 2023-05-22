CREATE DATABASE TorcidaPalmeiras;

USE TorcidaPalmeiras;

CREATE TABLE User (
	idUser INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45),
	surname VARCHAR(45),
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
    competition VARCHAR(200),
    CONSTRAINT fkUser FOREIGN KEY (fkUser) REFERENCES User(idUser)
);

SELECT * FROM Guess;

INSERT INTO Guess (matchDate, homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, homeGoals, awayGoals, guessIsRight, fkUser, competition)
VALUES
    ('2023-05-02 19:00:00', 'Palmeiras', 'https://crests.football-data.org/1769.png', 'Flamengo', 'https://logodownload.org/wp-content/uploads/2016/09/flamengo-logo-escudo-novo.png', '2', '1', false, 1, 'Campeonato Brasileiro Série A'),
    ('2023-05-10 18:30:00', 'Palmeiras', 'https://crests.football-data.org/1769.png', 'São Paulo', 'https://upload.wikimedia.org/wikipedia/pt/4/4b/S%C3%A3o_Paulo_Futebol_Clube.png', '1', '1', true, 1, 'Campeonato Brasileiro Série A'),
    ('2023-05-05 21:00:00', 'Palmeiras', 'https://crests.football-data.org/1769.png', 'Internacional', 'https://logodetimes.com/times/internacional/logo-internacional-4096.png', '2', '0', false, 1, 'Campeonato Brasileiro Série A'),
    ('2023-05-15 19:30:00', 'Palmeiras', 'https://crests.football-data.org/1769.png', 'Grêmio', 'https://seeklogo.com/images/G/Gr__mio_Porto_Alegre-logo-709819E2D9-seeklogo.com.png', '2', '2', true, 1, 'Campeonato Brasileiro Série A');

SELECT (SELECT COUNT(guessIsRight) FROM Guess WHERE fkUser = 1 AND guessIsRight = TRUE) AS rightGuesses, 
(SELECT COUNT(guessIsRight) FROM Guess WHERE fkUser = 1 AND guessIsRight = FALSE) AS wrongGuesses;

SELECT (SELECT COUNT(guessIsRight) FROM Guess WHERE guessIsRight = TRUE) AS rightGuesses, 
(SELECT COUNT(guessIsRight) FROM Guess WHERE guessIsRight = FALSE) AS wrongGuesses;

SELECT idUser, name, surname, COUNT(guessIsRight) FROM User JOIN Guess
	ON idUser = fkUser WHERE guessIsRight = TRUE GROUP BY idUser, guessIsRight LIMIT 10;

CREATE TABLE News (
idNews INT PRIMARY KEY AUTO_INCREMENT,
author VARCHAR(45),
title VARCHAR(45),
link VARCHAR(45),
imageURL VARCHAR(45),
publishedAt VARCHAR(45)
);

CREATE TABLE NewsLike (
fkNews INT,
fkUser INT,
CONSTRAINT fkNews FOREIGN KEY (fkNews) REFERENCES News(idNews),
CONSTRAINT fkUserLike FOREIGN KEY (fkUser) REFERENCES User(idUser),
CONSTRAINT pkComposed PRIMARY KEY (fkNews, fkUser)
);

SELECT * FROM Guess WHERE fkUser = 1 ORDER BY idGuess DESC LIMIT 1;
