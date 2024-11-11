import {getData} from './api.js';
import {picturesContainer, rendersThumbnails} from './rendering-thumbnails.js';

const filtersBar = document.querySelector('.img-filters');
const filtersButtons = filtersBar.querySelector('.img-filters__form');

filtersButtons.addEventListener('click', (evt) => {
  const picturesSet = picturesContainer.querySelectorAll('.picture');

  Array.from(filtersButtons).forEach((button) => {
    button.classList.remove('img-filters__button--active');

    if (button.id === evt.target.id) {
      button.classList.add('img-filters__button--active');
    }
  });

  switch (evt.target.id) {
    case 'filter-random':
      console.log('Random');
      break;
    case 'filter-discussed':
      picturesSet.forEach((picture) => picture.remove());

      getData()
        .then((photos) => {
          rendersThumbnails(photos
            .slice()
            .sort((a, b) => b.comments.length - a.comments.length));
        });
      break;
    default:
      picturesSet.forEach((picture) => picture.remove());

      getData()
        .then((photos) => {
          rendersThumbnails(photos);
        });
      break;
  }
});

export {filtersBar};
