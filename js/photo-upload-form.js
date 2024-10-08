import {isEscapeKey, setupFormForSubmit} from './utils.js';
import {pageContent} from './photo-modal';

const imageUploadElement = document.querySelector('.img-upload__form');
const imageEditorModal = imageUploadElement.querySelector('.img-upload__overlay');
const imageEditorCloseButton = imageUploadElement.querySelector('button[type="reset"]');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

setupFormForSubmit(imageUploadElement);

function openPhotoModal() {
  pageContent.classList.add('modal-open');
  imageEditorModal.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closePhotoModal() {
  pageContent.classList.remove('modal-open');
  imageEditorModal.classList.add('hidden');
  imageUploadElement.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

imageUploadElement.addEventListener('change', openPhotoModal);

imageEditorCloseButton.addEventListener('click', closePhotoModal);
