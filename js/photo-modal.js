import {bigPictureContainer,
  renderingBigPicture,
  buttonMoreComments,
  socialCommentsList,
  comentsShown,
  bigPictureUrl,
  bigPictureDescription} from './rendering-photo-fullsize.js';
import {picturesContainer} from './rendering-thumbnails.js';
import {isEscapeKey, getParent} from './utils.js';
import {getData} from './api.js';

const bigPictureCloseButton = bigPictureContainer.querySelector('button[type="reset"]');
const pageContent = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onThumbnailCloseModal();
  }
};

const onButtonMoreFiveNewComments = () => {
  const quantityComentsAll = socialCommentsList.childNodes;
  let count = 0;

  for (let i = Number(comentsShown.textContent); i < quantityComentsAll.length; i++) {
    if (quantityComentsAll[i].classList.contains('hidden')) {
      quantityComentsAll[i].classList.remove('hidden');
      count++;
      comentsShown.textContent++;
    }

    if (i === quantityComentsAll.length - 1) {
      buttonMoreComments.classList.add('hidden');
    }

    if (count === 5) {
      break;
    }
  }
};

const onThumbnailOpenModal = (evt) => {
  if (evt.target.matches('[class*=\'picture\']:not(.pictures)')) {
    evt.preventDefault();
    pageContent.classList.add('modal-open');
    bigPictureContainer.classList.remove('hidden');

    getData()
      .then((photos) => renderingBigPicture(getParent(evt.target).firstElementChild, photos));

    if (!buttonMoreComments.classList.contains('hidden')) {
      buttonMoreComments.addEventListener('click', onButtonMoreFiveNewComments);
    }
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

function onThumbnailCloseModal () {
  pageContent.classList.remove('modal-open');
  bigPictureContainer.classList.add('hidden');
  bigPictureUrl.children[0].src = '';
  bigPictureDescription.textContent = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

picturesContainer.addEventListener('click', onThumbnailOpenModal);

bigPictureCloseButton.addEventListener('click', onThumbnailCloseModal);

export {pageContent};
