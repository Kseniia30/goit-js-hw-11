function createInterface({hits}) {
    const markup = hits.map(({ largeImageURL, webformatURL, tags, likes, views,comments, downloads } ) => `<a class="link-card" href="${largeImageURL}" data-lightbox="lbox"  onclick="event.preventDefault()"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div></a>`).join("")
    
    return markup
    }

export { createInterface }


