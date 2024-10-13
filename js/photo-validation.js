import {imageUploadElement} from './photo-upload-form';

const pristine = new Pristine(imageUploadElement);
const isPhotoHashtagsValid = () => {
  const userImageHashtags = imageUploadElement.querySelector('.text__hashtags');
  const hashtagsCollection = userImageHashtags.value.split(' ');
  const hashtagTemplate = /^#[a-zф-яё0-9]{1,19}$/i;

  if (!userImageHashtags.value) {
    return true;
  }

  if (hashtagsCollection.length > 5) {
    return false;
  }

  if ((new Set(hashtagsCollection)).size !== hashtagsCollection.length) {
    return false;
  }

  return hashtagsCollection.every((tag) => hashtagTemplate.test(tag));
};

imageUploadElement
  .querySelector('textarea[name="description"]')
  .setAttribute('maxlength', 140);

imageUploadElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }

  if (!isPhotoHashtagsValid()) {
    evt.preventDefault();
  }
});
