const rankingList = document.getElementById('rankingList');

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
        var images = [];
        var userNames = [];

        for(var i = 0; i < data.length; i++) {
            labels.push(`${i + 1} º`);
            chartData.push(data[i].rightGuesses);

            var image = new Image();

            image.src = `../uploads/${data[i].profileImage}`;
            image.style.borderRadius = '100%';

            images.push(image);
            userNames.push(`${data[i].name} ${data[i].surname}`)
        }

        createRankingChart(labels, chartData, images, userNames);

        if(rankingList) 
            generateRankingList(labels, images, userNames);

        if(document.getElementById("lastGuessesContainer"))
            setTimeout(() => getLastPredictions(), 800)

    }).catch((error) => {
        console.error(error);
        throw ("Houve um erro ao buscar o ranking da torcida");
    });
}

function generateRankingList(labels, images, userNames) {
    var limit = labels.length > 5 ? 5 : labels.length;

    for(var i = 0; i < limit; i++) {
        rankingList.innerHTML += `
            <div class="rankingListItem">
                <h1>${labels[i]}</h1>
                <div>
                    <img src="${images[i].src}" alt="profileImage">
                    <strong>${userNames[i]}</strong>
                </div>
            </div>
        `;
    }
}   
