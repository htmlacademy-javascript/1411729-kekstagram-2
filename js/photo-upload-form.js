import {isEscapeKey, setupFormForSubmit} from './utils.js';
import {pageContent} from './photo-modal.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imageUploadElement = document.querySelector('.img-upload__form');
setupFormForSubmit(imageUploadElement);

const imageEditorModal = imageUploadElement.querySelector('.img-upload__overlay');
const imageEditorCloseButton = imageUploadElement.querySelector('button[type="reset"]');

const pristine = new Pristine(imageUploadElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onDocumentKeydown = (evt) => {
  if (document.activeElement.name === 'hashtags' ||
    document.activeElement.name === 'description') {
    return evt;
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    onFormClose();
  }
};

const image = imageUploadElement.querySelector('.img-upload__preview').querySelector('img');
const buttonsFilterSwitching = imageUploadElement.querySelectorAll('.effects__preview');
const imageChooser = imageUploadElement.querySelector('#upload-file');
const sliderElement = document.querySelector('.effect-level__slider');
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const sliderField = imageUploadElement.querySelector('.effect-level');
sliderField.classList.add('hidden');

function onUploadButtonOpenForm() {
  pageContent.classList.add('modal-open');
  imageEditorModal.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function onFormClose() {
  pageContent.classList.remove('modal-open');
  imageEditorModal.classList.add('hidden');
  sliderField.classList.add('hidden');
  imageUploadElement.reset();
  image.style.filter = 'none';
  image.style.transform = 'scale(1)';
  pristine.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

imageChooser.addEventListener('change', () => {
  const imageFile = imageChooser.files[0];
  const imageFileName = imageFile.name.toLowerCase();

  const match = FILE_TYPES.some((extension) => imageFileName.endsWith(extension));

  if (match) {
    image.src = URL.createObjectURL(imageFile);
    buttonsFilterSwitching.forEach((button) => {
      button.style.backgroundImage = `url(${URL.createObjectURL(imageFile)})`;
    });
  }
});

imageUploadElement.addEventListener('change', onUploadButtonOpenForm);

imageEditorCloseButton.addEventListener('click', onFormClose);

export {imageUploadElement,
  pristine,
  sliderField,
  sliderElement,
  image,
  onFormClose};
