const lastGuessesContainer = document.getElementById("lastGuessesContainer");

function getLastPredictions() {
  const userID = sessionStorage.USER_ID;

  fetch(`/user/${userID}/lastPredictions`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .then((data) => {
        for (var i = 0; i < data.length; i++) {
            const match = data[i];
            const matchDay = new Date(match.matchDate).getDate() >= 9 ? new Date(match.matchDate).getDate() : '0' + new Date(match.matchDate).getDate();
            const matchMonth = new Date(match.matchDate).getMonth() >= 9 ? new Date(match.matchDate).getMonth() : '0' + new Date(match.matchDate).getMonth();

            const matchHour = new Date(match.matchDate).getHours() >= 9 ? new Date(match.matchDate).getHours() : '0' + new Date(match.matchDate).getHours();
            const matchMinutes = new Date(match.matchDate).getMinutes() >= 9 ? new Date(match.matchDate).getMinutes() : '0' + new Date(match.matchDate).getMinutes();
            
            const matchDate = matchDay + '/' + matchMonth;
            const matchTime = matchHour + ':' + matchMinutes;

            var guessStatus;

            if(match.guessIsRight == null) {
                guessStatus = `
                    <div style='color: #00000060' class="guessStatus">
                        <span class="iconify" data-icon="uil:clock"></span>
                        Aguardando resultado
                    </div>
                `;
            } else if(!match.guessIsRight) {
                guessStatus = `
                    <div style='color: #E7584F' class="guessStatus">
                        <span class="iconify" data-icon="uil:times"></span>
                        Incorreto
                    </div>
                `;
            } else {
                guessStatus = `
                    <div style='color: var(--green)' class="guessStatus">
                        <span class="iconify" data-icon="uil:check"></span>
                        Correto
                    </div>
                `;

            }

            lastGuessesContainer.innerHTML += `
                <div class="guess">
                    <div class="header">
                        <p>${match.competition}</p>
                        <p>${matchDate} • ${matchTime}</p>
                    </div>

                    <div class="teams">
                        <div class="teamContainer">
                            <div class="team">
                                <img src="${match.homeTeamLogo}" alt="">
                                <h3>${match.homeTeam}</h3>
                            </div>
                            <h3>${match.homeGoals}</h3>
                        </div>

                        <div class="teamContainer">
                            <div class="team">
                                <img src="${match.awayTeamLogo}" alt="">
                                <h3>${match.awayTeam}</h3>
                            </div>
                            <h3>${match.awayGoals}</h3>
                        </div>
                    </div>

                    <div class="footer">
                        <hr>
                        ${guessStatus}
                    </div>
                </div>
            `;
        }
    }).catch((error) => {
        console.log(error);
        throw ("Houve um erro ao tentar realizar o cadastro!")
    });
}
