import './css/styles.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './get-images';

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchFormInput: document.querySelector('.search-form input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const lightbox = new SimpleLightbox('.gallery a');

let queryValue = '';
let perPage = 40;
let page = 0;

function onSearch(event) {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  if (searchQuery.value.length === 0) {
    return;
  } else if (searchQuery.value.trim().toLowerCase() === queryValue) {
    iziToast.warning({
      message: 'Search results are already displayed.',
    });
    return;
  } else {
    page = 0;
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');
    queryValue = searchQuery.value.trim().toLowerCase();
    getImagesByQuery(queryValue);
  }
}

async function getImagesByQuery(query) {
  try {
    const data = await getImages(query);
    page += 1;
    checkResult(data);
  } catch (error) {
    showError();
  }
}

async function onLoadMore(e) {
  getImagesByQuery(queryValue);
}

function checkResult(data) {
  if (data.totalHits === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again.',
    });
    refs.searchFormInput.value = '';
    return;
  } else {
    createGalleryMarkup(data.hits);

    if (page === 1) {
      iziToast.success({
        title: 'Hooray!',
        message: `We found ${data.totalHits} images.`,
      });

      if (data.totalHits > perPage) {
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
    } else if (data.hits.length < perPage) {
      refs.loadMoreBtn.classList.add('is-hidden');
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  }
}

function createGalleryMarkup(hits) {
  const galleryMarkup = hits
    .map(
      element => `<a class="item" href="${element.largeImageURL}">
      <div class="photo-card">
  <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${element.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${element.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${element.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${element.downloads}</b>
    </p>
  </div>
</div></a>`
    )
    .join('');
  showGallery(galleryMarkup);
}

function showGallery(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function showError(error) {
  console.log(error);
  iziToast.error({
    message: 'Sorry, something went wrong... Please try again.',
  });
}
