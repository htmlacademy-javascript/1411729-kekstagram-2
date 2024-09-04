const PHOTOS_URL = [
  'photos/1.jpg',
  'photos/2.jpg',
  'photos/3.jpg',
  'photos/4.jpg',
  'photos/5.jpg',
  'photos/6.jpg',
  'photos/7.jpg',
  'photos/8.jpg',
  'photos/9.jpg',
  'photos/10.jpg',
  'photos/11.jpg',
  'photos/12.jpg',
  'photos/13.jpg',
  'photos/14.jpg',
  'photos/15.jpg',
  'photos/16.jpg',
  'photos/17.jpg',
  'photos/18.jpg',
  'photos/19.jpg',
  'photos/20.jpg',
  'photos/21.jpg',
  'photos/22.jpg',
  'photos/23.jpg',
  'photos/24.jpg',
  'photos/25.jpg'
];

const PHOTOS_DESCRIPTION = [
  'Пляж отеля',
  'Указатель на пляж',
  'Пляж на острове',
  'Пляжный фотограф',
  'Суп с рисовыми фигурками',
  'Черный Макларен',
  'Десерт. Клубника',
  'Кисель из ягод',
  'Пляж приветствует самолёт',
  'Ниша для обуви',
  'Дорога к морю',
  'Белый Ауди',
  'Салат',
  'Котуши',
  'Я валяюсь в кедах',
  'Горные вершины',
  'Репитиция хора',
  'Красный Шевроле',
  'Ночные тапочки',
  'Отель Лонг бич',
  'Завтрак в отеле',
  'Закат над морем',
  'Большой краб смотрит за тобой',
  'Концерт Jay-Z',
  'Бегемотова тропа'
];

const AVATARS_URL = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Александр',
  'Максим',
  'Мария',
  'Надежда',
  'Женька',
  'Шинкарёв'
];

import {getRandomInteger, getRandomArrayElement} from './randomizers.js';

// Создание одной фотографии с комментариями
let idComment = 0;

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

// Генерация библиотеки фотографий
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

const libraryPhotos = postPhotos();

export {libraryPhotos};
