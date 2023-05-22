function loadUserAssertivenessRate() {
    const userID = sessionStorage.USER_ID;

    fetch(`/user/${userID}/assertivenessRate`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => response.json()).then((data) => {
        var assertivenessRateData = [ data[0].wrongGuesses, data[0].rightGuesses ];

        createUserAssertivenessChart(assertivenessRateData);
    }).catch((error) => {
        console.log(error);
        throw ("Houve um erro ao buscar os dados das estátisticas do usuário")
    })
}

function loadCrowdAssertivenessRate() {
    fetch('/crowd/assertivenessRate', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => response.json()).then((data) => {
        var assertivenessRateData = [ data[0].wrongGuesses, data[0].rightGuesses ];

        createAssertivenessChart(assertivenessRateData);
    }).catch((error) => {
        console.error(error);
        throw ("Houve um erro ao buscar os dados das estátisticas da torcida");
    });
}

function loadCrowdRanking() {
    fetch('/crowd/ranking', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => response.json()).then((data) => {
        var labels = [];
        var chartData = [];

        for(var i = 0; i < data.length; i++) {
            labels.push(`${i + 1} º`);
            chartData.push(data[i].rightGuesses);
        }

        createRankingChart(labels, chartData);
    }).catch((error) => {
        console.error(error);
        throw ("Houve um erro ao buscar o ranking da torcida");
    });
}
