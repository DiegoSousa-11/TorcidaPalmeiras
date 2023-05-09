const main = document.getElementsByTagName('main')
const currentCard = document.getElementById('currentHistoryCard');
const nextCards = document.querySelector('#nextCards .cardsContainer');

var CURRENT_HISTORY_INDEX = 1;
var historyItems = [];

loadHistory();

async function loadHistory() {
    await fetch('../js/history.json').then((response) => response.json()).then((data) => {
        historyItems = data.items;
    });

    main.item(0).style.backgroundImage = 'url(' + historyItems[0].image + ')';
    currentCard.innerHTML = `
        <h4>${historyItems[0].year}</h4>
        <h1>${historyItems[0].title}</h1>
        <p>${historyItems[0].text}</p>
    `;

    for(var i = 1; i < CURRENT_HISTORY_INDEX + 4; i++) {
        nextCards.innerHTML += `
            <a onclick='openHistory(${i}, ${i - 1})' style="background-image: url('${historyItems[i].image}')" class="card">
                <h4>${historyItems[i].year}</h4>
                <h1>${historyItems[i].title}</h1>
            </a>
        `;
    }
}
