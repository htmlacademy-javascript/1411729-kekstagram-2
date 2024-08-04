import {PHOTOS_URL, PHOTOS_DESCRIPTION} from './data.js';
import {getRandomInteger} from './randomizers.js';
import {createComment} from './create-comment.js';

const createPhoto = () => {
  const idPhoto = getRandomInteger(1, 25);

  return {
    id: idPhoto,
    url: PHOTOS_URL[idPhoto - 1],
    description: PHOTOS_DESCRIPTION[idPhoto - 1],
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
  };
};

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

console.table(postPhotos());
