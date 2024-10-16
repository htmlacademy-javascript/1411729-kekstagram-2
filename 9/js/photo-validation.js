import {imageUploadElement} from './photo-upload-form.js';

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
  return (new Set(value.split(' '))).size === value.split(' ').length;
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

imageUploadElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
