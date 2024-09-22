import {bigPictureContainer, renderingBigPicture} from './rendering-photo-fullsize';

const bigPictureCloseButton = bigPictureContainer.querySelector('button[type="reset"]');

document.querySelector('.pictures').addEventListener('click', (evt) => {
  if (evt.target.classList.value === 'picture__img') {
    document.querySelector('body').classList.add('modal-open');

    bigPictureContainer.classList.remove('hidden');
    bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');

    bigPictureCloseButton.addEventListener('click', () => {
      document.querySelector('body').classList.remove('modal-open');
      bigPictureContainer.classList.add('hidden');
    });

    renderingBigPicture(evt);
  }
});
