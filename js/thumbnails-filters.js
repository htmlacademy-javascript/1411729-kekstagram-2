import {getImagesRandomSet, debounce} from './utils.js';
import {rendersThumbnails} from './rendering-thumbnails.js';

const RERENDER_DELAY = 500;
const filtersBar = document.querySelector('.img-filters');
const filtersButtons = filtersBar.querySelector('.img-filters__form');

const filterButtonClick = (...photos) => {
  filtersButtons.addEventListener('click', (evt) => {
    Array.from(filtersButtons).forEach((button) => {
      button.classList.remove('img-filters__button--active');

      if (button.id === evt.target.id) {
        button.classList.add('img-filters__button--active');
      }
    });

    let photosCustomSet = [];

    switch (evt.target.id) {
      case 'filter-random':
        photosCustomSet = getImagesRandomSet(photos, 10);
        break;

      case 'filter-discussed':
        photosCustomSet = photos
          .slice()
          .sort((a, b) => b.comments.length - a.comments.length);
        break;

      default:
        photosCustomSet = photos;
        break;
    }

    (debounce(
      () => rendersThumbnails(photosCustomSet),
      RERENDER_DELAY
    ))();
  });
};

export {filtersBar, filterButtonClick};
