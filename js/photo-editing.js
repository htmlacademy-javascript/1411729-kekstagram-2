import { imageUploadElement } from './photo-upload-form.js';

const imageScaleSmaller = imageUploadElement.querySelector('.scale__control--smaller');
const imageScaleBigger = imageUploadElement.querySelector('.scale__control--bigger');
const imageScaleValue = imageUploadElement.querySelector('.scale__control--value');
const image = imageUploadElement.querySelector('.img-upload__preview');

const zoomOut = () => {
  const scaleValueNumbers = Number(imageScaleValue.value.slice(0, -1));

  if (scaleValueNumbers > 25) {
    imageScaleValue.value = scaleValueNumbers - 25;
    image.style.transform = `scale(${imageScaleValue.value / 100})`;
    imageScaleValue.value = `${imageScaleValue.value}%`;
  }
};

const zoomIn = () => {
  const scaleValueNumbers = Number(imageScaleValue.value.slice(0, -1));

  if (scaleValueNumbers < 100) {
    imageScaleValue.value = scaleValueNumbers + 25;
    image.style.transform = `scale(${imageScaleValue.value / 100})`;
    imageScaleValue.value = `${imageScaleValue.value}%`;
  }
};

imageScaleSmaller.addEventListener('click', zoomOut);

imageScaleBigger.addEventListener('click', zoomIn);
