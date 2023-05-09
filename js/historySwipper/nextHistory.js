function openHistory(historyIndex, indexInContainer) {
    closeCurrentHistory();

    setTimeout(() => {
        main.item(0).style.backgroundImage = 'url(' + historyItems[historyIndex].image + ')';
        currentCard.innerHTML = `
            <h4>${historyItems[historyIndex].year}</h4>
            <h1>${historyItems[historyIndex].title}</h1>
            <p>${historyItems[historyIndex].text}</p>
        `;

        main.item(0).style.backgroundSize = '100%';
        main.item(0).style.transform = 'scale(1)';
        main.item(0).style.opacity = '1';
    }, 500);

    updateCardList();

    CURRENT_HISTORY_INDEX++;
}

function closeCurrentHistory() {
    main.item(0).style.backgroundSize = '150%';
    main.item(0).style.transform = 'scale(1.2)';
    main.item(0).style.opacity = '0';
}

function updateCardList() {
    nextCards.children[0].style.width += '10vw';
    nextCards.innerHTML += `
        <a onclick='openHistory(${CURRENT_HISTORY_INDEX + 4}, ${(CURRENT_HISTORY_INDEX + 4) - 1})' style="background-image: url('${historyItems[CURRENT_HISTORY_INDEX + 4].image}')" class="card">
            <h4>${historyItems[CURRENT_HISTORY_INDEX + 4].year}</h4>
            <h1>${historyItems[CURRENT_HISTORY_INDEX + 4].title}</h1>
        </a>
    `;
}