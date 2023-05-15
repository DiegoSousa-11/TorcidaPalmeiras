const ENVIRONMENT = 'DEVELOPMENT'; //'DEVELOPMENT' || 'PRODUCTION'

const NEWS_PER_PAGE = 5;
const AMOUNT_NEWS = 30;

const SEARCH_KEY = 'palmeiras';
const API_KEY = 'AIzaSyBwKy7x_dM10MUxsQ7kQirIqN0HhnHdYyk';
const SEARCH_ENGINE = '057530d35dc9a43f6';

const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE}&q=${SEARCH_KEY}&sort=date`;
const mock = 'js/newsMock.json'; //Utilizado para não ultrapassar o limite de requisições da API

const newsCarousel = document.querySelector('#news .newsCarousel');
const controllersContainer = document.querySelector('#news .pageControllerContainer');

const newsWidth = document.querySelector('#news .newsContainer').offsetWidth/NEWS_PER_PAGE;

for(var amountNews = 0; amountNews <= AMOUNT_NEWS; amountNews+=10) {
    var urlRequest;
    if(ENVIRONMENT === 'DEVELOPMENT') {
        urlRequest = mock;
    } else {
        urlRequest = `${url}&start=${amountNews}`;
    }

    getAllNews(urlRequest);
}

async function getAllNews(urlRequest) {
    await fetch(urlRequest).then((response) => response.json()).then((data) => {
        for(var i = 0; i < data.items.length; i++) {
    
            const news = data.items[i];
    
            const author = news.displayLink;
            const date = news.snippet.split('...')[0];
            const title = news.title;
            const url = news.link;
            const image = news.pagemap.cse_image;
    
            if(author && title && url && image) {
                newsCarousel.innerHTML += `
                    <div class="newsItemContainer" style="width: ${newsWidth}px">
                        <a class="newsItem" href=${url} style="background-image: url('${image[0].src}')">
                            <span class="iconify" data-icon="mdi:cards-heart-outline"></span>
    
                            <div>
                                <p>${author} • ${date}</p>
                                <h3>${title}</h3>
                            </div>
                        </a>
                    </div>
                `;
            }
        }
    });
}
