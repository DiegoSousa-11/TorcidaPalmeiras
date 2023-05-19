const lastGuessesContainer = document.getElementById("lastGuessesContainer");

function getLastPredictions() {
  const userID = sessionStorage.USER_ID;

  fetch(`/user/${userID}/lastPredictions`)
    .then((response) => response.json())
    .then((data) => {
        
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            const match = data[i];

            lastGuessesContainer.innerHTML += `
                <div class="guess">
                    <div class="header">
                        <p>${match.competition}</p>
                        <p>10/05 • 21:30</p>
                    </div>

                    <div class="teams">
                        <div class="teamContainer">
                            <div class="team">
                                <img src=".${match.homeTeamLogo}" alt="">
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
                        <div class="guessStatus">
                            <span class="iconify" data-icon="iconamoon:close-bold"></span>
                            Incorreto
                        </div>
                    </div>
                </div>
            `;
        }
    });
}
