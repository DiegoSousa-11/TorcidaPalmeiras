var progressBar = document.querySelector('#progressBar .progress');

setInterval(() => {
    openHistory(CURRENT_HISTORY_INDEX + 1);
}, 5000)

// var intervalProgressBar = setInterval(() => increaseProgress(5000), 100);

// function increaseProgress(timeToFinish) {
    
// }

function openHistory(historyIndex) {
    if(historyIndex !== 0)    
        closeCurrentHistory();

    setTimeout(() => {
        main.item(0).style.backgroundImage = 'url(' + historyItems[historyIndex].image + ')';
        
        currentCard.querySelector('h1').innerHTML = historyItems[historyIndex].title;
        currentCard.querySelector('h4').innerHTML = historyItems[historyIndex].year;
        currentCard.querySelector('p').innerHTML = historyItems[historyIndex].text;
        currentCard.style.transform = 'scale(1)';
        
        main.item(0).style.backgroundSize = '100%';
        
        setTimeout(() => {
            loadHistoryInCards(historyIndex);
        }, 200)
    }, 500);
    

    CURRENT_HISTORY_INDEX = historyIndex;

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

openHistory(0);
