const main = document.getElementsByTagName('main')
const currentCard = document.getElementById('currentHistoryCard');
const nextCards = document.querySelector('#nextCards .cardsContainer');

var CURRENT_HISTORY_INDEX = 0;
var historyItems = [];

getHistory();

async function getHistory() {
    await fetch('../js/history.json').then((response) => response.json()).then((data) => {
        historyItems = data.items;
    });

    loadHistoryInCards(0);
}

function loadHistoryInCards(currentCard) {
    nextCards.innerHTML = '';
    
    for(var i = 0; i < historyItems.length; i++) {
        if(i !== currentCard)
            nextCards.innerHTML += `
                <a onclick='openHistory(${i})' style="background-image: url('${historyItems[i].image}')" class="card">
                    <h4>${historyItems[i].year}</h4>
                    <h1>${historyItems[i].title}</h1>
                </a>
            `;
    }
}
