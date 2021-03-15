export default function getRefs() {
  return {
    searchForm: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery-js'),
    observerItem: document.querySelector('.observer-item'),
    loader: document.getElementById('loader'),
  };
}
