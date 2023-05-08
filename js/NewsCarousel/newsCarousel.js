var CURRENT_PAGE = 0;

var carouselInterval;

generateControllers();

function generateControllers() {
    for(var amountPages = 0; amountPages < AMOUNT_NEWS/NEWS_PER_PAGE; amountPages++) {
        if(amountPages == 0) {
            controllersContainer.innerHTML += '<div class="currentPage"></div>';
        } else {
            controllersContainer.innerHTML += '<div></div>';
        }
    }

    carouselInterval = setInterval(() => startCarousel(), 10000);
}

controllersContainer.addEventListener('click', (event) => {
    const controllers = Array.from(controllersContainer.children);
    const selectedController = event.target;

    const selectedControllerIndex = controllers.indexOf(selectedController);

    if(selectedControllerIndex == -1) {
        return;
    }

    changeCurrentPage(selectedControllerIndex);
});

function changeCurrentPage(selectedControllerIndex) {
    const controllers = Array.from(controllersContainer.children);

    clearInterval(carouselInterval);

    controllersContainer.querySelector('.currentPage').classList.remove('currentPage');
    controllers[selectedControllerIndex].classList.add('currentPage');

    const currentPageNumber = selectedControllerIndex++;
    newsCarousel.style.marginLeft = `-${currentPageNumber*100}%`;
    
    CURRENT_PAGE = currentPageNumber;
    
    carouselInterval = setInterval(() => startCarousel(), 5000)
}

function startCarousel() {
    const lastPage = (AMOUNT_NEWS/NEWS_PER_PAGE) - 1;

    if(CURRENT_PAGE == lastPage) {
        changeCurrentPage(0);
    } else {
        changeCurrentPage(CURRENT_PAGE + 1)
    }
}
