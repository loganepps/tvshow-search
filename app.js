const form = document.querySelector('#searchForm');
const display = document.querySelector('#displayDiv');
const refresh = document.querySelector('#refresh');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    display.innerHTML = '';
    const searchTerm = form.elements.query.value;
    const config = { params: {q: searchTerm} } 
    const res = await axios.get('http://api.tvmaze.com/search/shows', config);
    getImages(res.data);
    form.elements.query.value = '';
});

const getImages = (shows) => {
    for(let result of shows) {
        if(result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            display.append(img);
        }
    }
}

const clearImages = () => {
    const imgs = document.querySelectorAll('img');
    for(let img of imgs) {
        img.remove();
    }
}

refresh.addEventListener('click', clearImages);
