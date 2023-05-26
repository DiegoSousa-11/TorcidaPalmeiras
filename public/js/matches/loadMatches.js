const API_KEY_FOOTBALL = '1e4d938cb1f04831a6d062265501e775';
const AMOUNT_MATCHES = 4;

var lastMatchesContainer = document.querySelector('#matches .lastMatches');
var nextMatchContainer = document.querySelector('#matches .nextMatch');

var nextMatch = {};

async function getLastMatches() {
    const request = `http://localhost:3333/match/lastMatches?limit=${AMOUNT_MATCHES}`;

    await fetch(request).then((response) => response.json()).then((data) => {
        var matches = data.matches;

        console.log(matches)

        for(var i = 0; i < matches.length; i++) {
            var match = matches[i];

            lastMatchesContainer.innerHTML += `
                <div class="match">
                    <p>${new Date(match.utcDate).toLocaleDateString()} • ${match.competition.name}</p>
                    <div class="matchResult">
                        <div class="teamScore">
                            <div class="team">
                                <img src="${match.homeTeam.crest}" alt="${match.awayTeam.shortName}">
                                <h4>${match.homeTeam.shortName}</h4>
                            </div>

                            <h1>${match.score.fullTime.home}</h1>
                        </div>

                        <div class="teamScore">
                            <h1>${match.score.fullTime.away}</h1>

                            <div class="team">
                                <img src="${match.awayTeam.crest}" alt="${match.awayTeam.shortName}">
                                <h4>${match.awayTeam.shortName}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }).catch((error) => console.log(error))
}

async function getNextMatch() {
    const request = `http://localhost:3333/match/nextMatch`;

    await fetch(request).then((response) => response.json()).then((data) => {
        var match = data.matches[0];
        nextMatch = match;

        var hour = new Date(match.utcDate).getHours();
        var minutes = new Date(match.utcDate).getMinutes() <= 9 ? '0' + new Date(match.utcDate).getMinutes() : new Date(match.utcDate).getMinutes();

        nextMatchContainer.innerHTML = `
            <div class="match">
                <p>${new Date(match.utcDate).toLocaleDateString()} • ${match.competition.name}</p>
                <div class="matchResult">
                    <div class="teamScore">
                        <div class="team">
                            <img src="${match.homeTeam.crest}" alt="${match.homeTeam.shortName}">
                            <h4>${match.homeTeam.shortName}</h4>
                        </div>

                    </div>
                    
                    <div class="scoreboard">
                        <input id='homeGoals' maxlength="1" type="text">

                        <div class="timetable">
                            <h3>${hour}h${minutes}</h3>
                        </div>

                        <input id='awayGoals' maxlength="1" type="text">
                    </div>

                    <div class="teamScore">
                        <div class="team">
                            <img src="${match.awayTeam.crest}" alt="${match.awayTeam.shortName}">
                            <h4>${match.awayTeam.shortName}</h4>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).then(() => verifyPrediction()).catch((error) => console.log(error))
}

function verifyPrediction() {
    if(sessionStorage.USER_ID) {
        fetch(`/user/${sessionStorage.USER_ID}/lastPrediction`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => response.json()).then((data) => {
            if(data.length === 0)
                return;
    
            if(nextMatch.utcDate == data[0].matchDate) {
                document.getElementById('homeGoals').value = data[0].homeGoals;
                document.getElementById('awayGoals').value = data[0].awayGoals;
    
                hiddenPredictionOption();
            }
        })
    }
}

function hiddenPredictionOption() {
    document.getElementById('homeGoals').disabled = true;
    document.getElementById('awayGoals').disabled = true;
    document.querySelector('#matches .rightContent').querySelector('button').remove()
    document.querySelector('#matches .alerts').innerHTML = `
        <p style='color: var(--green)'>
            <span class="iconify" data-icon="ic:round-check"></span>
            Você já efetuou seu palpite para esse jogo!
        </p>
    `;
}

getLastMatches();
getNextMatch();
