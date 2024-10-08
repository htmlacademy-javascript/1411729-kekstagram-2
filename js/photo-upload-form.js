import {pageContent} from './photo-modal';

const imageUploadElement = document.querySelector('.img-upload__form');
const imageEditorModal = imageUploadElement.querySelector('.img-upload__overlay');
const imageCloseButton = imageUploadElement.querySelector('button[type="reset"]');

const setupFormForSubmit = (form) => {
  form.method = 'POST';
  form.enctype = 'multipart/form-data';
  form.action = ' https://31.javascript.htmlacademy.pro/kekstagram';
};

setupFormForSubmit(imageUploadElement);

imageUploadElement.addEventListener('change', () => {
  pageContent.classList.add('modal-open');
  imageEditorModal.classList.remove('hidden');

  // document.addEventListener('keydown', onDocumentKeydown);
});
