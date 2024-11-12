import {getData} from './api.js';
import {filtersBar, filterButtonClick} from './thumbnails-filters.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const rendersThumbnails = (arrayPhotos) => {
  const fragment = document.createDocumentFragment();

  arrayPhotos.forEach((photo) => {
    const thumbnail = pictureTemplate.cloneNode(true);

    thumbnail.querySelector('.picture__img').src = photo.url;
    thumbnail.querySelector('.picture__img').alt = photo.description;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;

    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

getData()
  .then((photos) => {
    rendersThumbnails(photos);
    filtersBar.classList.remove('img-filters--inactive');
    filterButtonClick(...photos);
  });

export {picturesContainer, rendersThumbnails};
