import{a as w,S,i as a}from"./assets/vendor-BNibzuFn.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const E="52793899-4a5f0ec6d72e6751efee977ec",q="https://pixabay.com/api/",P=15;async function f(s,r){try{return(await w.get(q,{params:{key:E,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:P,page:r}})).data}catch(e){throw e}}const m=document.querySelector(".gallery"),y=document.querySelector(".loader"),h=document.querySelector(".load-more");let $=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(s){const r=s.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <b>Likes</b>
            <span>${e.likes}</span>
          </div>
          <div class="info-item">
            <b>Views</b>
            <span>${e.views}</span>
          </div>
          <div class="info-item">
            <b>Comments</b>
            <span>${e.comments}</span>
          </div>
          <div class="info-item">
            <b>Downloads</b>
            <span>${e.downloads}</span>
          </div>
        </div>
      </li>`).join("");m.insertAdjacentHTML("beforeend",r),$.refresh()}function B(){m.innerHTML=""}function p(){y.classList.add("visible")}function v(){y.classList.remove("visible")}function b(){h.classList.add("visible")}function c(){h.classList.remove("visible")}const L=document.querySelector(".form"),M=document.querySelector(".load-more");let d="",i=1,n=0;L.addEventListener("submit",A);M.addEventListener("click",I);async function A(s){s.preventDefault();const r=L.elements["search-text"].value.trim();if(!r){a.error({title:"Error",message:"Please enter a search term!"});return}d=r,i=1,B(),p(),c();try{const e=await f(d,i);if(n=e.totalHits,e.hits.length===0){a.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}g(e.hits),a.success({title:"Success",message:`Found ${n} images.`}),e.hits.length<n&&b()}catch{a.error({title:"Error",message:"Something went wrong. Please try again."})}finally{v()}}async function I(){i+=1,c(),p();try{const s=await f(d,i);g(s.hits),O(),document.querySelectorAll(".gallery-item").length>=n?(a.info({title:"End",message:"We're sorry, but you've reached the end of search results."}),c()):b()}catch{a.error({title:"Error",message:"Failed to load more images."})}finally{v()}}function O(){const r=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
