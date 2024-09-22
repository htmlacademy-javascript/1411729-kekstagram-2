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
  const urlTargetPhoto = evt.target.getAttribute('src') || evt.target.firstElementChild.getAttribute('src');
  let commentsData;

  for (let i = 0; i < libraryPhotos.length; i++) {
    if (urlTargetPhoto === libraryPhotos[i].url) {
      bigPictureUrl.children[0].src = libraryPhotos[i].url;
      bigPictureDescription.textContent = libraryPhotos[i].description;
      quantityLikes.textContent = libraryPhotos[i].likes;
      commentsData = libraryPhotos[i].comments;
      quantityComentsAll.textContent = commentsData.length;
    }
  }

  quantityComentsShown.textContent = '5';

  // Создание списка комментариев
  const commentsTemplate = document.querySelector('.social__comment');
  const fragment = document.createDocumentFragment();

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
