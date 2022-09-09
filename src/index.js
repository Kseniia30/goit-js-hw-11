import "./css/style.css"
import PixabayAPI from "./js/fetchInfo";
import { refs } from "./js/refs";
import LoadMoreBtn from "./js/loadMoreF";
import { createInterface } from "./js/createInterface";


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix';

const pixabayAPI = new PixabayAPI()
const loadMoreBTN = new LoadMoreBtn({
    ref: refs.loadMoreBtn,
    hide: true,
})
const lightbox = new SimpleLightbox(".gallery a", {
    navText: "<>",
    captionDelay: 250,
})

refs.formField.addEventListener("submit", onSearch)
refs.loadMoreBtn.addEventListener("click", fetchImages)

function onSearch(evt) {
    evt.preventDefault();

    const currentStatus = evt.currentTarget.elements.searchQuery.value.trim()

    if (currentStatus === "") {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }

    pixabayAPI.searchQuery = currentStatus;
    loadMoreBTN.show()
    pixabayAPI.resetPage()
    clearContainer()
    fetchImages()
}

function clearContainer() {
    refs.gallery.innerHTML = "";
}

function fetchImages() {
    loadMoreBTN.hide()
    pixabayAPI.fetchImages()
        .then(({ data }) => {
            if (data.total === 0 && data.hits.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.")
                return
            }
            appendMarkup(data)
            onScrolling()

            const { totalHits } = data;

            if (refs.gallery.children.length === totalHits) {
                Notify.failure("We're sorry, but you've reached the end of search results.")
            }
            else {
                loadMoreBTN.show()
                Notify.success(`Hooray! We found ${totalHits} images.`)
            }
    }).catch(error => console.log(error))
}

function appendMarkup(data) {
    refs.gallery.insertAdjacentHTML("beforeend", createInterface(data))
    lightbox.refresh()
}

function onScrolling() {
    const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}





