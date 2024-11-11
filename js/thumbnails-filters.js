import {getData} from './api.js';
import {removeChildrenByClass, getImagesRandomSet} from './utils.js';
import {picturesContainer, rendersThumbnails} from './rendering-thumbnails.js';

const filtersBar = document.querySelector('.img-filters');
const filtersButtons = filtersBar.querySelector('.img-filters__form');

filtersButtons.addEventListener('click', (evt) => {
  Array.from(filtersButtons).forEach((button) => {
    button.classList.remove('img-filters__button--active');

    if (button.id === evt.target.id) {
      button.classList.add('img-filters__button--active');
    }
  });

  removeChildrenByClass(picturesContainer, '.picture');

  switch (evt.target.id) {
    case 'filter-random':
      getData()
        .then((photos) => rendersThumbnails(getImagesRandomSet(photos, 10)));
      break;
    case 'filter-discussed':
      getData()
        .then((photos) => {
          rendersThumbnails(photos
            .slice()
            .sort((a, b) => b.comments.length - a.comments.length));
        });
      break;
    default:
      getData()
        .then((photos) => {
          rendersThumbnails(photos);
        });
      break;
  }
});

export {filtersBar};
