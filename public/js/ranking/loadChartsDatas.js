function loadUserAssertivenessRate() {
    const userID = sessionStorage.USER_ID;

    fetch(`/user/${userID}/assertivenessRate`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => response.json()).then((data) => {
        var assertivenessRateData = [ data[0].wrongGuesses, data[0].rightGuesses ];

        updateAssertivenessChart(assertivenessRateData);
    }).catch((error) => {
        console.log(error);
        throw ("Houve um erro ao tentar realizar o cadastro!")
    })
}