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

    async fetchImages() {
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

        try {
            const res = axios.get(BASE_URL, options)
            this.incrementPage()
            return res
        }

        catch (error) {
            console.log(error);
        }
    }

    incrementPage() {
        this._page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}
