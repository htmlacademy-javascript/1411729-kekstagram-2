import {PHOTOS_URL, PHOTOS_DESCRIPTION, AVATARS_URL, MESSAGES, NAMES} from './data.js';

// Функция для генерирования случайного числа в заданном диапазоне из проекта "Код и Магия"
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для получения случайного элемента из проекта "Код и Магия"
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция вызвращает случайный комментарий содержащий один или два сообщения. Количество сообщений определяется случайным образом
const getRandomMessage = function () {
  if (getRandomInteger(1, 2) === 2) {
    const firstMessage = getRandomArrayElement(MESSAGES);
    let secondMessage = getRandomArrayElement(MESSAGES);

    while (firstMessage === secondMessage) {
      secondMessage = getRandomArrayElement(MESSAGES);
    }

    return `${firstMessage} ${secondMessage}`;
  }

  return getRandomArrayElement(MESSAGES);
};

let idComment = 0;

const createComment = () => ({
  id: idComment++,
  avatar: getRandomArrayElement(AVATARS_URL),
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES)
});

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
