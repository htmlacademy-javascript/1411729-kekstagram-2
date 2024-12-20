import {getData} from './api.js';
import {filtersBar, filterButtonClick} from './thumbnails-filters.js';
import {removeChildrenByClass,
  createErrTemplateDataLoad} from './utils.js';

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

  removeChildrenByClass(picturesContainer, '.picture');
  picturesContainer.appendChild(fragment);
};

getData()
  .then((photos = []) => {
    rendersThumbnails(photos);
    filterButtonClick(...photos);
  })
  .then(() => {
    if (picturesContainer.contains(document.querySelector('a.picture'))) {
      filtersBar.classList.remove('img-filters--inactive');
    }
  })
  .catch(() => {
    createErrTemplateDataLoad('Не удалось загрузить данные. Попробуйте обновить страницу');
  });

export {picturesContainer, rendersThumbnails};
