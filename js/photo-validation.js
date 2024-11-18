import {imageUploadElement, closeImageEditor, pristine} from './photo-upload-form.js';
import {createErrTemplateDataLoad} from './utils.js';
import {sendData} from './api.js';

const userImageHashtags = imageUploadElement.querySelector('.text__hashtags');
const userImageDescription = imageUploadElement.querySelector('.text__description');

const transformTagsSet = (value) => {
  const transformedTags = value
    .toLowerCase()
    .trim()
    .split(' ')
    .filter((tag) => tag !== '');
  return transformedTags;
};

function checksCountTags (value) {
  return transformTagsSet(value).length <= 5;
}

function checksUniquenessTags (value) {
  const transformedTags = transformTagsSet(value);
  return (new Set(transformedTags)).size === transformedTags.length;
}

function checksValidityTag (value) {
  const hashtagTemplate = /^#[a-zа-яё0-9]{1,19}$/i;
  return transformTagsSet(value).every((tag) => hashtagTemplate.test(tag));
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
