import "./css/style.css"
import { refs } from "./js/refs";
import { createInterface } from "./js/createInterface";
import LoadMoreBtn from "./js/loadMoreF";
import PixabayAPI from "./js/fetchInfo";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix';

const pixabayAPI = new PixabayAPI()
const loadMoreBTN = new LoadMoreBtn({
    ref: refs.loadMoreBtn,
    hide: true,
})

refs.formField.addEventListener("submit", onSearch)
refs.loadMoreBtn.addEventListener("click", onLoadMore)

function onSearch(evt) {
    evt.preventDefault()

    const formData = new FormData(refs.formField)
    pixabayAPI.query = formData.get("searchQuery")
    pixabayAPI.resetPage();

    createInterface()

    if (!pixabayAPI.query) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return
    }

    pixabayAPI.fetchImages()
        .then(picData => {
            if (picData.images.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.")
                return
            }
            pixabayAPI.totalIMGS = picData.totalImages

            Notify.success(`Hooray! We found ${pixabayAPI.totalIMGS} images.`)

            createInterface(picData.images);
            const simpleLightBox = new SimpleLightbox('.link-card')
            simpleLightBox.refresh();
            endOfSearch()
        }
        )
        .catch(error => {
            getError(error)
        })
}

function onLoadMore(evt) {
    evt.preventDefault()

    pixabayAPI.fetchImages()
        .then(picData => {
            createInterface(picData.images)
            endOfSearch()
        })
        .catch(error => {
        getError(error)
    })
}

function endOfSearch() {
    loadMoreBTN.show()

    const overPic = pixabayAPI.totalIMGS > pixabayAPI.perPage * pixabayAPI.page ? false : true
    
    if (overPic) {
        Notify.failure("We're sorry, but you've reached the end of search results.")
        loadMoreBTN.hide()
        return
    }

    pixabayAPI.incrementPage()
}

function getError(error) {
    console.error(error)
}

// const lightbox = new SimpleLightbox('.link-card', { 
//     navText: "<>",
//     captionsData: "alt",
//     captionDelay: 250,
// }).refresh()