var TIME_TO_NEXT_HISTORY = 5000;
var TIME_TO_UPDATE_PROGRESS = 50;

var progress = document.querySelector('#progressBar .progress');
var progressBarWidth = 0;

var intervalHistoryController = setInterval(() => {
    if(CURRENT_HISTORY_INDEX == historyItems.length - 1) {
        openHistory(0);
    } else {
        openHistory(CURRENT_HISTORY_INDEX + 1);
    }
}, TIME_TO_NEXT_HISTORY);

var intervalProgressBar = setInterval(() => increaseProgress(), TIME_TO_UPDATE_PROGRESS);

function increaseProgress() {
    var progressCount = 100/(TIME_TO_NEXT_HISTORY/TIME_TO_UPDATE_PROGRESS)

    progressBarWidth += progressCount;

    progress.style.width = progressBarWidth + '%';
}

function openHistory(historyIndex) {
    if(historyIndex < 0) {
        historyIndex = historyItems.length - 1;
    } else if(historyIndex > historyItems.length - 1) {
        historyIndex = 0;
    }

    clearInterval(intervalHistoryController);
    progressBarWidth = 0;

    closeCurrentHistory();

    setTimeout(() => {
        main.item(0).style.backgroundImage = 'url(' + historyItems[historyIndex].image + ')';
        
        currentCard.querySelector('h1').innerHTML = historyItems[historyIndex].title;
        currentCard.querySelector('h4').innerHTML = historyItems[historyIndex].year;
        currentCard.querySelector('p').innerHTML = historyItems[historyIndex].text;
        currentCard.style.transform = 'scale(1)';
        
        main.item(0).style.backgroundSize = '100%';

        if(nextCards.querySelector('.selectedCard')) {
            nextCards.querySelector('.selectedCard').classList.remove('selectedCard');
        }
    
        nextCards.children[historyIndex].classList.add('selectedCard');

        updateCardsList(historyIndex);
    }, 500);

    CURRENT_HISTORY_INDEX = historyIndex;

    intervalHistoryController = setInterval(() => {
        if(CURRENT_HISTORY_INDEX == historyItems.length - 1) {
            openHistory(0);
        } else {
            openHistory(CURRENT_HISTORY_INDEX + 1);
        }
    }, TIME_TO_NEXT_HISTORY);

    historyNumber.innerHTML = CURRENT_HISTORY_INDEX + 1;
}

function closeCurrentHistory() {
    main.item(0).style.backgroundSize = '150%';

    currentCard.style.transform = 'scale(1.2)';

    setTimeout(() => {
        currentCard.children[0].style.transform = 'scaleY(0)';
        currentCard.children[1].style.transform = 'scaleY(0)';
        currentCard.children[2].style.transform = 'scaleY(0)';
    }, 400)
    
    setTimeout(() => {
        currentCard.style.zIndex = '5';

        currentCard.children[0].style.transform = `scaleY(1)`;
        currentCard.children[1].style.transform = `scaleY(1)`;
        currentCard.children[2].style.transform = `scaleY(1)`;
    }, 800)
}

function updateCardsList(historyIndex) {
    if(historyIndex !== historyItems.length) {
        const cardWidth = (nextCards.children[historyIndex].clientWidth + 24) * historyIndex;

        nextCards.style.marginLeft = `-${cardWidth}px`;
    } else {
        nextCards.style.marginLeft = `0`;
    }
}

openHistory(0);
