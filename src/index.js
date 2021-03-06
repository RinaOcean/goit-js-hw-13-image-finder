import './styles.css';
import cardTemplate from './templates/card-item.hbs';

import ImagesApiService from './js/components/apiService';

import { onError, onFetchError } from './js/components/notifications';

import getRefs from './js/components/getRefs';
const refs = getRefs();

const imagesApiService = new ImagesApiService();

const observer = new IntersectionObserver(intersectionHandler);

import setLightbox from './js/components/lightbox';

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', setLightbox);

function onSearch(event) {
  event.preventDefault();

  clearGallery();
  refs.loader.classList.remove('hide-loader');

  const inputValue = event.currentTarget.elements.query.value;

  const str = new RegExp('[a-zA-Z]');

  if (!str.test(inputValue) || inputValue === '') {
    hideLoader();
    return onError();
  }

  imagesApiService.query = inputValue;

  imagesApiService.resetPage();

  imagesApiService.fetchImages().then(renderImgs).catch(onFetchError);
}

function renderImgs(images) {
  if (images.length === 0) {
    hideLoader();
    return onError();
  }

  const markup = cardTemplate(images);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  observer.observe(refs.observerItem);
}

function clearGallery() {
  refs.gallery.innerHTML = '';

  observer.unobserve(refs.observerItem);
}

function renderMore() {
  imagesApiService
    .fetchImages()
    .then(renderImgs)
    .then(hideLoader)
    .catch(onFetchError);
}

function intersectionHandler(entries) {
  const { isIntersecting } = entries[0];
  if (isIntersecting) {
    renderMore();
  }
}

function hideLoader() {
  refs.loader.classList.add('hide-loader');
}

// прокрутка
refs.scrollElem.addEventListener('click', goUp);

window.addEventListener('scroll', function () {
  if (pageYOffset > 100) {
    refs.scrollElem.style.opacity = '1';
  } else {
    refs.scrollElem.style.opacity = '0';
  }
});

function goUp() {
  window.scrollTo(0, 0);
}
