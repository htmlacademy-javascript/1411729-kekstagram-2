const filtersBar = document.querySelector('.img-filters');
const filtersButtons = filtersBar.querySelector('.img-filters__form');

filtersButtons.addEventListener('click', (evt) => {

  Array.from(filtersButtons).forEach((button) => {
    button.classList.remove('img-filters__button--active');

    if (button.id === evt.target.id) {
      button.classList.add('img-filters__button--active');
    }
  });
});

export {filtersBar};
