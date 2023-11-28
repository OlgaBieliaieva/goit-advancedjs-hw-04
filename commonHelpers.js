import{a as g,S as y,i}from"./assets/vendor-eaddd480.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const p="https://pixabay.com/api/?",n={key:"34369155-5d93acadffc22e75da017de5a",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:1};async function h(e){n.q!==e&&(n.q=e,n.page=1);const t=new URLSearchParams(n),o=await g.get(`${p}${t}`);return n.page+=1,o.data}const a={searchForm:document.querySelector(".search-form"),searchFormInput:document.querySelector(".search-form input"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};a.searchForm.addEventListener("submit",b);a.loadMoreBtn.addEventListener("click",w);const L=new y(".gallery a");let l="",f=40,u=0;function b(e){e.preventDefault();const{elements:{searchQuery:t}}=e.currentTarget;if(t.value.length!==0)if(t.value.trim().toLowerCase()===l){i.warning({message:"Search results are already displayed."});return}else u=0,a.gallery.innerHTML="",a.loadMoreBtn.classList.add("is-hidden"),l=t.value.trim().toLowerCase(),m(l)}async function m(e){try{const t=await h(e);u+=1,S(t)}catch{q()}}async function w(e){m(l)}function S(e){if(e.totalHits===0){i.error({message:"Sorry, there are no images matching your search query. Please try again."}),a.searchFormInput.value="";return}else v(e.hits),u===1?(i.success({title:"Hooray!",message:`We found ${e.totalHits} images.`}),e.totalHits>f&&a.loadMoreBtn.classList.remove("is-hidden")):e.hits.length<f&&(a.loadMoreBtn.classList.add("is-hidden"),i.warning({message:"We're sorry, but you've reached the end of search results."}))}function v(e){const t=e.map(o=>`<a class="item" href="${o.largeImageURL}">
      <div class="photo-card">
  <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${o.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${o.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${o.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${o.downloads}</b>
    </p>
  </div>
</div></a>`).join("");M(t)}function M(e){a.gallery.insertAdjacentHTML("beforeend",e),L.refresh()}function q(e){console.log(e),i.error({message:"Sorry, something went wrong... Please try again."})}
//# sourceMappingURL=commonHelpers.js.map
