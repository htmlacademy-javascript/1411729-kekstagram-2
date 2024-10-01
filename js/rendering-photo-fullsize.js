import {libraryPhotos} from './data.js';
import {createCommentTemplate} from './utils.js';

const bigPictureContainer = document.querySelector('.big-picture');

const bigPictureUrl = bigPictureContainer.querySelector('.big-picture__img');
const quantityLikes = bigPictureContainer.querySelector('.likes-count');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');

const comentsShown = bigPictureContainer.querySelector('.social__comment-shown-count');
const quantityComentsShown = 5;
const quantityComentsAll = bigPictureContainer.querySelector('.social__comment-total-count');
const socialCommentsList = bigPictureContainer.querySelector('.social__comments');
const buttonMoreComments = bigPictureContainer.querySelector('.comments-loader');

const renderingBigPicture = (imageElement) => {
  const urlTargetPhoto = imageElement.getAttribute('src');
  let commentsData;

  // Наполнение данными о конкретной фотографии
  bigPictureUrl.children[0].src = imageElement.getAttribute('src');
  bigPictureDescription.textContent = imageElement.getAttribute('alt');

  for (let i = 0; i < libraryPhotos.length; i++) {
    if (urlTargetPhoto === libraryPhotos[i].url) {
      quantityLikes.textContent = libraryPhotos[i].likes;
      commentsData = libraryPhotos[i].comments;
    }
  }

  // Создание списка комментариев
  const commentTemplate = createCommentTemplate();
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsData.length; i++) {
    const comment = commentTemplate.cloneNode(true);

    comment.querySelector('.social__picture').src = commentsData[i].avatar;
    comment.querySelector('.social__picture').alt = commentsData[i].name;
    comment.querySelector('.social__text').textContent = commentsData[i].message;

    if (i > (quantityComentsShown - 1)) {
      comment.classList.add('hidden');
    }

    fragment.appendChild(comment);
  }

  quantityComentsAll.textContent = commentsData.length;
  if (commentsData.length <= quantityComentsShown) {
    comentsShown.textContent = commentsData.length;
    buttonMoreComments.classList.add('hidden');
  } else {
    comentsShown.textContent = quantityComentsShown;
    buttonMoreComments.classList.remove('hidden');
  }

  socialCommentsList.innerHTML = '';
  socialCommentsList.appendChild(fragment);
};

export{bigPictureContainer, renderingBigPicture, buttonMoreComments};
