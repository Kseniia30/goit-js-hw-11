import { refs } from "./js/refs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import Notiflix from 'notiflix';

const BASE_URL = "https://pixabay.com/api/"
const key = "29746553-1bca6bd490352bbcaa49de9e7"
const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';

class PixabayAPI {
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
            },
        };

        const imagesData = axios.get(BASE_URL, options)
            .then(res => {
                const images = res.data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
                    console.log({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })

                    return { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
                })
        })
            return imagesData
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

const pixabayAPI = new PixabayAPI()

refs.formField.addEventListener("submit", onSearch)

function onSearch(evt) {
    evt.preventDefault()

    pixabayAPI.fetchImages()
}




