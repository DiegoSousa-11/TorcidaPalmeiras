const newsContainer = document.querySelector('#news .newsContainer');

const search = 'palmeiras';
const API_KEY = 'AIzaSyBwKy7x_dM10MUxsQ7kQirIqN0HhnHdYyk';
const searchEngine = '057530d35dc9a43f6';

const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=057530d35dc9a43f6&q=${search}`;
const mock = 'http://127.0.0.1:5500/js/newsMock.json'; //Utilizado para não ultrapassar o limite de requisições da API

fetch(mock).then((response) => response.json()).then((data) => {
    console.log(data);

    var limit = 6;
    var newsCont = 0;
    for(var i = 0; i < limit; i++) {
        const news = data.items[i];
        const author = news.displayLink;
        const date = news.pagemap.newsarticle;
        const title = news.title;
        const url = news.link;
        const image = news.pagemap.imageobject;

        if(author && title && url && image && date && newsCont < 5) {
            newsContainer.innerHTML += `
                <a class="newsItem" href=${url} style="background-image: url('${image[0].url}')">
                    <span class="iconify" data-icon="mdi:cards-heart-outline"></span>
    
                    <div>
                        <p>${author} • ${new Date(date[0].datepublished).toLocaleDateString()}</p>
                        <h3>${title}</h3>
                    </div>
                </a>
            `;
            newsCont++;
        } else {
            if(limit < data.items.length) {
                limit++;
            }
        }

    }
});
