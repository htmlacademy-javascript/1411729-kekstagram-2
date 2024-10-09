import {imageUploadElement} from './photo-upload-form';

const pristine = new Pristine(imageUploadElement);

imageUploadElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
