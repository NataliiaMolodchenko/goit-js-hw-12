import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector(".gallery");
const loaderEl = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

let lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      (img) => `
      <li class="gallery-item">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <b>Likes</b>
            <span>${img.likes}</span>
          </div>
          <div class="info-item">
            <b>Views</b>
            <span>${img.views}</span>
          </div>
          <div class="info-item">
            <b>Comments</b>
            <span>${img.comments}</span>
          </div>
          <div class="info-item">
            <b>Downloads</b>
            <span>${img.downloads}</span>
          </div>
        </div>
      </li>`
    )
    .join("");
  galleryEl.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = "";
}

export function showLoader() {
  loaderEl.classList.add("visible");
}

export function hideLoader() {
  loaderEl.classList.remove("visible");
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.add("visible");
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.remove("visible");
}