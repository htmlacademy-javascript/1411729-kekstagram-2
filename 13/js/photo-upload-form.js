import {isEscapeKey, setupFormForSubmit} from './utils.js';
import {pageContent} from './photo-modal.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imageUploadElement = document.querySelector('.img-upload__form');
setupFormForSubmit(imageUploadElement);

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

const image = imageUploadElement.querySelector('.img-upload__preview');
const imageChooser = imageUploadElement.querySelector('#upload-file');
const sliderElement = document.querySelector('.effect-level__slider');
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
});

const sliderField = imageUploadElement.querySelector('.effect-level');
sliderField.classList.add('hidden');

function openImageEditor() {
  pageContent.classList.add('modal-open');
  imageEditorModal.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeImageEditor() {
  pageContent.classList.remove('modal-open');
  imageEditorModal.classList.add('hidden');
  sliderField.classList.add('hidden');
  imageUploadElement.reset();
  image.style.filter = 'none';

  document.removeEventListener('keydown', onDocumentKeydown);
}

imageChooser.addEventListener('change', () => {
  const imageFile = imageChooser.files[0];
  const imageFileName = imageFile.name.toLowerCase();

  const match = FILE_TYPES.some((extension) => imageFileName.endsWith(extension));

  if (match) {
    image.querySelector('img').src = URL.createObjectURL(imageFile);
  }
});

imageUploadElement.addEventListener('change', openImageEditor);

imageEditorCloseButton.addEventListener('click', closeImageEditor);

export {imageUploadElement,
  sliderField,
  sliderElement,
  image,
  closeImageEditor};
