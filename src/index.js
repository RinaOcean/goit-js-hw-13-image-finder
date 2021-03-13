import './styles.css';
import cardTemplate from './templates/card-item.hbs';

import ImagesApiService from './js/components/images-services';

const refs = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery-js'),
  loadMoreBtn: document.querySelector('.load-more-button'),
  observerItem: document.querySelector('.observer-item'),
};

const intersectionHandler = entries => {
  const { isIntersecting } = entries[0];
  if (isIntersecting) {
    renderMore();
  }
};

const imagesApiService = new ImagesApiService();
const observer = new IntersectionObserver(intersectionHandler);
observer.observe(refs.observerItem);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', renderMore);

function onSearch(event) {
  event.preventDefault();

  clearGallery();

  imagesApiService.query = event.currentTarget.elements.query.value;

  imagesApiService.resetPage();

  imagesApiService.fetchImages().then(renderImgs);
}

function renderImgs(images) {
  const markup = cardTemplate(images);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function renderMore() {
  imagesApiService.fetchImages().then(renderImgs);
}
