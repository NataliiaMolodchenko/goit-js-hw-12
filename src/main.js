import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, hideLoadMoreButton, showLoadMoreButton } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let currentQuery = "";
let currentPage = 1;
let totalHits = 0;

form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);
    
async function onSearch(event) {
    event.preventDefault();
    const query = form.elements["search-text"].value.trim();

    if (!query) {
        iziToast.error({ title: "Error", message: "Please enter a search term!" });
        return;
    }

    currentQuery = query;
    currentPage = 1;
    clearGallery();
    showLoader();
    hideLoadMoreButton();
    
    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.info({
                title: "No results",
                message: "Sorry, there are no images matching your search query. Please try again!"
            });
            return;
        }
   
        createGallery(data.hits);
        iziToast.success({ title: "Success", message: `Found ${totalHits} images.` });
    
        if (data.hits.length < totalHits) {
            showLoadMoreButton();
        }
    } catch {
        iziToast.error({ title: "Error", message: "Something went wrong. Please try again." });
    } finally {
        hideLoader();
    }
}

async function onLoadMore() {
    currentPage += 1;
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        createGallery(data.hits);
        smoothScroll();

        const loadedImages = document.querySelectorAll(".gallery-item").length;
        if (loadedImages >= totalHits) {
            iziToast.info({
                title: "End",
                message: "We're sorry, but you've reached the end of search results.",
            });
            hideLoadMoreButton();
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.error({ title: "Error", message: "Failed to load more images." });
    } finally {
        hideLoader();
    }
}

function smoothScroll() {
    const firstCard = document.querySelector(".gallery-item");
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}