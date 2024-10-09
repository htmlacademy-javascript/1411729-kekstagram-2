import {imageUploadElement} from './photo-upload-form';

const pristine = new Pristine(imageUploadElement);
imageUploadElement
  .querySelector('textarea[name="description"]')
  .setAttribute('maxlength', 140);

imageUploadElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
