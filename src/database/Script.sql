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

-- Palpites corretos
INSERT INTO Guess VALUES
	(null, '2023-05-21T00:00:00Z', 'Santos', 'https://crests.football-data.org/6685.png', 'Palmeiras', 'https://crests.football-data.org/1769.png', 0, 0, null, 1, 432383, 'Campeonato Brasileiro Série A'),
	(null, '2023-05-24T22:00:00Z', 'Cerro Porteño', 'https://crests.football-data.org/9373.png', 'Palmeiras', 'https://crests.football-data.org/1769.png', 1, 3, null, 1, 433672, 'Copa Libertadores'),
	(null, '2023-05-28T21:30:00Z', 'Mineiro', 'https://crests.football-data.org/1766.png', 'Palmeiras', 'https://crests.football-data.org/1769.png', 1, 1, null, 1, 432371, 'Campeonato Brasileiro Série A'),
	(null, '2023-06-04T21:30:00Z', 'Palmeiras', 'https://crests.football-data.org/1769.png', 'Coritiba', 'https://crests.football-data.org/4241.png', 3, 1, null, 1, 432357, 'Campeonato Brasileiro Série A');
    
-- Palpite correto (Simulação)
INSERT INTO Guess VALUES
	(null, '2023-06-04T21:30:00Z', 'Palmeiras', 'https://crests.football-data.org/1769.png', 'Coritiba', 'https://crests.football-data.org/4241.png', 3, 1, null, 1, 432357, 'Campeonato Brasileiro Série A');
