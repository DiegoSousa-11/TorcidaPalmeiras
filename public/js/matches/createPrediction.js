function createPrediction() {
    const predictionHome = document.getElementById('homeGoals').value;
    const predictionAway = document.getElementById('awayGoals').value;

    var userID = sessionStorage.USER_ID;

    if(!predictionHome || !predictionAway) {
        return alert('Preencha os resultados!');
    }

    if(!userID) {
        return alert('É necessário estar logado no nosso sistema para palpitar!');
    }

    fetch(`/user/${userID}/createPrediction`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            homeTeam: nextMatch.homeTeam.shortName,
            homeTeamLogo: nextMatch.homeTeam.crest,
            awayTeam: nextMatch.awayTeam.shortName,
            awayTeamLogo: nextMatch.awayTeam.crest,
            homeGoals: predictionHome,
            awayGoals: predictionAway,
            competition: nextMatch.competition.name,
            matchDate: nextMatch.utcDate,
            idMatch: nextMatch.id
        })
    }).then((result) => {
        console.log(result);
        
        if(result.ok) {
            hiddenPredictionOption();
            notification("Palpite realizado com sucesso!");
        } else {
            throw ("Houve um erro ao tentar realizar o palpite!")
        }
    }).catch((error) => {
        console.log(error);
        throw ("Houve um erro ao tentar realizar o palpite!")
    })
}
