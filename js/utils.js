// Функция для генерирования случайного числа в заданном диапазоне из проекта "Код и Магия"
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для получения случайного элемента из проекта "Код и Магия"
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция распознования нажатия клавиши <Escape>
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция перебора элементов для поиска указанного родителя по классу
function getParent(element) {
  while (element) {
    if (element.className === 'picture') {
      return element;
    }
    element = element.parentElement;
  }
  return null;
}

// Функция создания шаблона комментария
const createCommentTemplate = () => {
  const singleComment = document.createElement('li');
  const userAvatar = document.createElement('img');
  const userComment = document.createElement('p');

  singleComment.classList.add('social__comment');
  userAvatar.classList.add('social__picture');
  userComment.classList.add('social__text');

  userAvatar.src = '#';
  userAvatar.alt = 'Имя комментатора';
  userAvatar.width = 35;
  userAvatar.height = 35;
  userComment.textContent = '';

  singleComment.append(userAvatar, userComment);
  return singleComment;
};

// Функция для присваивания нужных значений для атрибутов формы
const setupFormForSubmit = (form) => {
  form.method = 'POST';
  form.enctype = 'multipart/form-data';
  form.action = ' https://31.javascript.htmlacademy.pro/kekstagram';
};

export {getRandomInteger,
  getRandomArrayElement,
  isEscapeKey,
  getParent,
  createCommentTemplate,
  setupFormForSubmit};
