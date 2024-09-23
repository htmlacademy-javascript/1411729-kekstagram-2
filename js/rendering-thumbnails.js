import {libraryPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const fragment = document.createDocumentFragment();

for (let i = 0; i < libraryPhotos.length; i++) {
  const thumbnail = pictureTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = libraryPhotos[i].url;
  thumbnail.querySelector('.picture__img').alt = libraryPhotos[i].description;
  thumbnail.querySelector('.picture__comments').textContent = libraryPhotos[i].comments.length;
  thumbnail.querySelector('.picture__likes').textContent = libraryPhotos[i].likes;

  fragment.appendChild(thumbnail);
}

picturesContainer.appendChild(fragment);
export {picturesContainer};
