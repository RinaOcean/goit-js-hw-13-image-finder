import './styles.css';
import cardTemplate from './templates/card-item.hbs';
// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

const refs = {
  searchForm: document.getElementById('search-form'),
  container: document.querySelector('.container'),
};

refs.searchForm.addEventListener('submit', onSearch);
function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.query.value;
  const API_KEY = '20659430-8e33c69d8b4c60137606db57c';
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=${API_KEY}`;

  fetch(url)
    .then(r => r.json())
    .then(renderImgs);
}

function renderImgs(images) {
  const markup = cardTemplate(images);
  console.log(markup);
  refs.container.insertAdjacentHTML('beforeend', markup);
}
