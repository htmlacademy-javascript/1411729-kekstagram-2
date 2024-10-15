import {isEscapeKey, setupFormForSubmit} from './utils.js';
import {pageContent} from './photo-modal';

const imageUploadElement = document.querySelector('.img-upload__form');
const imageEditorModal = imageUploadElement.querySelector('.img-upload__overlay');
const imageEditorCloseButton = imageUploadElement.querySelector('button[type="reset"]');

const onDocumentKeydown = (evt) => {
  if (document.activeElement.name === 'hashtags' ||
    document.activeElement.name === 'description') {
    return evt;
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditor();
  }
};

setupFormForSubmit(imageUploadElement);

function openImageEditor() {
  pageContent.classList.add('modal-open');
  imageEditorModal.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeImageEditor() {
  pageContent.classList.remove('modal-open');
  imageEditorModal.classList.add('hidden');
  imageUploadElement.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

imageUploadElement.addEventListener('change', openImageEditor);

imageEditorCloseButton.addEventListener('click', closeImageEditor);

export {imageUploadElement};
