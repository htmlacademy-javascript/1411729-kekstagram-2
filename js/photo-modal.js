import {bigPictureContainer, renderingBigPicture, buttonMoreComments} from './rendering-photo-fullsize.js';
import {picturesContainer} from './rendering-thumbnails.js';
import {isEscapeKey, getParent} from './utils.js';

const bigPictureCloseButton = bigPictureContainer.querySelector('button[type="reset"]');
const pageContent = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const showsMoreComments = () => {};

const openPhotoModal = (evt) => {
  if (evt.target.matches('[class*=\'picture\']:not(.pictures)')) {
    evt.preventDefault();
    pageContent.classList.add('modal-open');
    bigPictureContainer.classList.remove('hidden');

    renderingBigPicture(getParent(evt.target).firstElementChild);

    if (!buttonMoreComments.classList.contains('hidden')) {
      buttonMoreComments.addEventListener('click', showsMoreComments);
    }
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

function closePhotoModal () {
  pageContent.classList.remove('modal-open');
  bigPictureContainer.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

picturesContainer.addEventListener('click', openPhotoModal);

bigPictureCloseButton.addEventListener('click', closePhotoModal);
