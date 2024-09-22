import {libraryPhotos} from './data.js';

const bigPictureContainer = document.querySelector('.big-picture');

const bigPictureUrl = bigPictureContainer.querySelector('.big-picture__img');
const quantityLikes = bigPictureContainer.querySelector('.likes-count');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');

const quantityComentsShown = bigPictureContainer.querySelector('.social__comment-shown-count');
const quantityComentsAll = bigPictureContainer.querySelector('.social__comment-total-count');
const socialCommentsList = bigPictureContainer.querySelector('.social__comments');

const renderingBigPicture = (evt) => {
  // Наполнение данными о конкретной фотографии
  const parentElement = evt.target.parentElement;

  bigPictureUrl.children[0].src = evt.target.src;
  quantityLikes.textContent = parentElement.querySelector('.picture__likes').textContent;
  bigPictureDescription.textContent = evt.target.alt;

  quantityComentsShown.textContent = '5';
  quantityComentsAll.textContent = parentElement.querySelector('.picture__comments').textContent;

  // Создание списка комментариев
  let commentsData;

  const commentsTemplate = document.querySelector('.social__comment');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < libraryPhotos.length; i++) {
    if (evt.target.getAttribute('src') === libraryPhotos[i].url) {
      commentsData = libraryPhotos[i].comments;
    }
  }

  for (let i = 0; i < commentsData.length; i++) {
    const comment = commentsTemplate.cloneNode(true);

    comment.querySelector('.social__picture').src = commentsData[i].avatar;
    comment.querySelector('.social__picture').alt = commentsData[i].name;
    comment.querySelector('.social__text').textContent = commentsData[i].message;

    fragment.appendChild(comment);
  }

  socialCommentsList.innerHTML = '';
  socialCommentsList.appendChild(fragment);
};

export{bigPictureContainer, renderingBigPicture};
