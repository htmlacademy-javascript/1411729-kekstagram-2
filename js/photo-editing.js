import {imageUploadElement,
  sliderField,
  sliderElement,
  image} from './photo-upload-form.js';

// Масштабирование изображения
const imageScaleSmaller = imageUploadElement.querySelector('.scale__control--smaller');
const imageScaleBigger = imageUploadElement.querySelector('.scale__control--bigger');
const imageScaleValue = imageUploadElement.querySelector('.scale__control--value');

const onButtonZoomOut = () => {
  const scaleValueNumbers = Number(imageScaleValue.value.slice(0, -1));

  if (scaleValueNumbers > 25) {
    imageScaleValue.value = scaleValueNumbers - 25;
    image.style.transform = `scale(${imageScaleValue.value / 100})`;
    imageScaleValue.value = `${imageScaleValue.value}%`;
  }
};

const onButtonZoomIn = () => {
  const scaleValueNumbers = Number(imageScaleValue.value.slice(0, -1));

  if (scaleValueNumbers < 100) {
    imageScaleValue.value = scaleValueNumbers + 25;
    image.style.transform = `scale(${imageScaleValue.value / 100})`;
    imageScaleValue.value = `${imageScaleValue.value}%`;
  }
};

imageScaleSmaller.addEventListener('click', onButtonZoomOut);

imageScaleBigger.addEventListener('click', onButtonZoomIn);

// Наложение эффекта на изображение
const effects = imageUploadElement.querySelector('.effects__list');
const effectLevelValue = imageUploadElement.querySelector('.effect-level__value');

const onEffectButtonChanging = (evt) => {
  if (evt.target.id === 'effect-none') {
    sliderField.classList.add('hidden');
  } else {
    sliderField.classList.remove('hidden');
  }

  switch (evt.target.id) {
    case 'effect-chrome':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });

      image.style.filter = 'grayscale(1)';
      effectLevelValue.value = 1;
      break;

    case 'effect-sepia':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });

      image.style.filter = 'sepia(1)';
      effectLevelValue.value = 1;
      break;

    case 'effect-marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });

      image.style.filter = 'invert(100%)';
      effectLevelValue.value = 100;
      break;

    case 'effect-phobos':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });

      image.style.filter = 'blur(3px)';
      effectLevelValue.value = 3;
      break;

    case 'effect-heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });

      image.style.filter = 'brightness(3)';
      effectLevelValue.value = 3;
      break;

    default:
      image.style.filter = 'none';
      effectLevelValue.value = '';
  }
};

effects.addEventListener('click', onEffectButtonChanging);

sliderElement.noUiSlider.on('update', () => {
  const effectName = effects.querySelector(':checked').id;
  effectLevelValue.value = sliderElement.noUiSlider.get();

  switch (effectName) {
    case 'effect-chrome':
      image.style.filter = `grayscale(${effectLevelValue.value})`;
      break;

    case 'effect-sepia':
      image.style.filter = `sepia(${effectLevelValue.value})`;
      break;

    case 'effect-marvin':
      image.style.filter = `invert(${effectLevelValue.value}%)`;
      break;

    case 'effect-phobos':
      image.style.filter = `blur(${effectLevelValue.value}px)`;
      break;

    case 'effect-heat':
      image.style.filter = `brightness(${effectLevelValue.value})`;
      break;
  }
});
