import{a as m,i as l,S as g}from"./assets/vendor-eaddd480.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const p="https://pixabay.com/api/?",n={key:"34369155-5d93acadffc22e75da017de5a",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:1};async function u(e){n.q!==e&&(n.q=e,n.page=1);const a=new URLSearchParams(n);try{const o=await m.get(`${p}${a}`);return n.page+=1,o}catch(o){console.log(o)}}const s={searchForm:document.querySelector(".search-form"),searchFormInput:document.querySelector(".search-form input"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};s.searchForm.addEventListener("submit",y);s.loadMoreBtn.addEventListener("click",w);let i="";function y(e){e.preventDefault(),s.gallery.innerHTML="",s.loadMoreBtn.classList.add("is-hidden");const{elements:{searchQuery:a}}=e.currentTarget;i=a.value.trim().toLowerCase(),i.length!==0&&u(i).then(L).catch(f)}function L(e){if(e.data.total===0){l.error({message:"Sorry, there are no images matching your search query. Please try again."}),s.searchFormInput.value="";return}else l.success({title:"Hooray!",message:`We found ${e.data.totalHits} images.`});h(e.data.hits)}function f(e){console.log(e)}function h(e){const a=e.map(o=>`<a class="item" href="${o.largeImageURL}">
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
</div></a>`).join("");b(a)}function b(e){s.gallery.insertAdjacentHTML("beforeend",e),s.loadMoreBtn.classList.remove("is-hidden"),new g(".gallery a").refresh()}function w(){u(i).then(S).catch(f)}function S(e){if(e.data.hits.length===0){l.warning({message:"We're sorry, but you've reached the end of search results."}),s.loadMoreBtn.classList.add("is-hidden");return}h(e.data.hits)}
//# sourceMappingURL=commonHelpers.js.map
