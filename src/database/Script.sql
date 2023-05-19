CREATE DATABASE TorcidaPalmeiras;

USE TorcidaPalmeiras;

CREATE TABLE User (
	idUser INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45),
	surname VARCHAR(45),
    email VARCHAR(100),
    password VARCHAR(45)
);

CREATE TABLE Guess (
	idGuess INT PRIMARY KEY AUTO_INCREMENT,
    matchDate VARCHAR(45),
	homeTeam VARCHAR(45),
    homeTeamLogo VARCHAR(255),
    awayTeam VARCHAR(45),
	awayTeamLogo VARCHAR(255),
    homeGoals VARCHAR(45),
    awayGoals VARCHAR(45),
    guessIsRight TINYINT,
    fkUser INT,
    CONSTRAINT fkUser FOREIGN KEY (fkUser) REFERENCES User(idUser)
);

SELECT * FROM Guess;

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
