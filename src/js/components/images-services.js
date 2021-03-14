const API_KEY = '20659430-8e33c69d8b4c60137606db57c';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    // this.loadMore = this.loadMore.bind(this);
  }

  async fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw response;
    }

    return response
      .json()
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch(err => {
        console.warn(err);
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  // loadMore() {
  //   this.incrementPage();
  //   this.fetchImages();
  // }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetQuery() {
    this.searchQuery = '';
  }
}
