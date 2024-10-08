const imageUploadElement = document.querySelector('.img-upload__form');

const setupFormForSubmit = (form) => {
  form.method = 'POST';
  form.enctype = 'multipart/form-data';
  form.action = ' https://31.javascript.htmlacademy.pro/kekstagram';
};

setupFormForSubmit(imageUploadElement);
