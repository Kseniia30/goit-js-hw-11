import axios from "axios";

const BASE_URL = "https://pixabay.com/api/"
const key = "29746553-1bca6bd490352bbcaa49de9e7"
const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';

export default class PixabayAPI {
    constructor() {
        this._perPage = 40;
        this.searchQuery = '';
        this._page = 1;
        this.totalImages = 0;
    }

    fetchImages() {
        const options = {
            params: {
                key,
                q: this.searchQuery,
                image_type: imageType,
                orientation,
                safesearch,
                page: this._page,
                per_page: this._perPage,
            }
        }

        return axios.get(BASE_URL, options).then(res => {
            const images = res.data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
                return {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
            })

            const totalImages = res.data.totalHits;
            const result = { totalImages, images }
            return result
        })
    }

    incrementPage() {
        this._page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery.trim().split(' ').join('+');
    }

    get totalIMGS() {
        return this.totalImages;
    }

    set totalIMGS(newTotalImages) {
        this.totalImages = newTotalImages
    }

    get perPage() {
        return this._perPage
    }

    set perPage(newPerPage) {
        this._perPage = newPerPage
    }

    
}
