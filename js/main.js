import {PHOTOS_URL} from './data.js';
import {createPhoto} from './create-photo.js';

const postPhotos = function (publishedPhotos = [], numberGeneratedPhotos = 25) {

  while (publishedPhotos.length < numberGeneratedPhotos) {
    const singlePhoto = createPhoto();

    if (!publishedPhotos.some((publishedPhoto) => publishedPhoto.id === singlePhoto.id)) {
      publishedPhotos.push(singlePhoto);
    }

    if (publishedPhotos.length === PHOTOS_URL.length) {
      break;
    }
  }

  return publishedPhotos;
};

postPhotos();
