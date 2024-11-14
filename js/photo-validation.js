import {imageUploadElement, closeImageEditor} from './photo-upload-form.js';
import {createErrTemplateDataLoad} from './utils.js';
import {sendData} from './api.js';

const pristine = new Pristine(imageUploadElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const userImageHashtags = imageUploadElement.querySelector('.text__hashtags');
const userImageDescription = imageUploadElement.querySelector('.text__description');

function checksCountTags (value) {
  return value.split(' ').length <= 5;
}

function checksUniquenessTags (value) {
  return (new Set(value.toLowerCase().split(' '))).size === value.split(' ').length;
}

function checksValidityTag (value) {
  const hashtagTemplate = /^#[a-zа-яё0-9]{1,19}$/i;

  if (!value) {
    return true;
  }

  return value.trim().split(' ').every((tag) => hashtagTemplate.test(tag));
}

function checksLengthDescription (value) {
  return value.length <= 140;
}

pristine.addValidator(
  userImageHashtags,
  checksCountTags,
  'Превышено количество хэштегов'
);

pristine.addValidator(
  userImageHashtags,
  checksUniquenessTags,
  'Хэштеги повторяются'
);

pristine.addValidator(
  userImageHashtags,
  checksValidityTag,
  'Введён невалидный хэштег'
);

pristine.addValidator(
  userImageDescription,
  checksLengthDescription,
  'Длина комментария больше 140 символов'
);

// ----------------------------------------------------
const submitButton = imageUploadElement.querySelector('button[type="submit"]');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

imageUploadElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();

    sendData(new FormData(evt.target))
      .then(closeImageEditor())
      .catch(
        (err) => {
          createErrTemplateDataLoad(err.message);
        }
      )
      .finally(unblockSubmitButton);
  }
});
