import { refs } from "./refs";

function createInterface(images) {


    if (!images) {
        refs.gallery.innerHTML = "";
        return
    }

  if (images) {
    const markup = images.map(image => `<a class="link-card" href="${image.largeImageURL} data-lightbox="lbox" onclick="event.preventDefault()"><div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${image.downloads}</b>
    </p>
  </div>
</div></a>`).join("")

      refs.gallery.insertAdjacentHTML("beforeend", markup)
    }
}

export {createInterface}