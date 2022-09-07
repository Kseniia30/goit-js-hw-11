
import { refs } from './refs';

function redrawInterface(images) {
  if (!images) {
    refs.gallery.innerHTML = '';
    return;
  }

  if (images) {
    refs.gallery.insertAdjacentHTML('beforeend', images.map(image => `<div class='photo-card'>
  <img
    src='${image.webformatURL}'
    alt='${image.tags}'
    loading='lazy'
    data-largeImageURL='${image.largeImageURL}'
  />
  <div class='info'>
    <p class='info-item'>
      <b>Likes</b>
      <span>${image.likes}</span>
    </p>
    <p class='info-item'>
      <b>Views</b>
      <span>${image.views}</span>
    </p>
    <p class='info-item'>
      <b>Comments</b>
      <span>${image.comments}</span>
    </p>
    <p class='info-item'>
      <b>Downloads</b>
      <span>${image.downloads}</span>
    </p>
  </div>
</div>`).join(''));
    return;
  }
}

export { redrawInterface };
