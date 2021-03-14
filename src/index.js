import './styles.css';
import cardTemplate from './templates/card-item.hbs';

import ImagesApiService from './js/components/images-services';

import { onError, onFetchError } from './js/components/notifications';

import getRefs from './js/components/getRefs';
const refs = getRefs();

const imagesApiService = new ImagesApiService();

const observer = new IntersectionObserver(intersectionHandler);

import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', setLightbox);

function setLightbox(event) {
  const bigImgUrl = event.target.dataset.lightboxImg;
  console.log(bigImgUrl);
  const instance = basicLightbox.create(`
    <img src="${bigImgUrl}" width="800" height="600">
`);

  instance.show();
}

function onSearch(event) {
  event.preventDefault();

  clearGallery();

  const inputValue = event.currentTarget.elements.query.value;

  const str = new RegExp('[a-zA-Z]');

  if (!str.test(inputValue)) {
    return onError();
  }

  if (inputValue === '') {
    return onError();
  }

  imagesApiService.query = inputValue;

  imagesApiService.resetPage();

  imagesApiService.fetchImages().then(renderImgs).catch(onFetchError);
}

function renderImgs(images) {
  if (images.length === 0) {
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
  imagesApiService.fetchImages().then(renderImgs);
}

function intersectionHandler(entries) {
  const { isIntersecting } = entries[0];
  if (isIntersecting) {
    renderMore();
  }
}
