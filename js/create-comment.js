// Модуль вызвращает случайный комментарий содержащий один или два сообщения. Количество сообщений определяется случайным образом
import {AVATARS_URL, MESSAGES, NAMES} from './data';
import {getRandomInteger, getRandomArrayElement} from './randomizers.js';

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

export {createComment};
