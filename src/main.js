import Inputmask from 'inputmask';
import validation from './modules/validation.module';

import './styles/style.scss';

const phoneInput = document.getElementById('phone');

Inputmask({ mask: '(375)-99-999-99-99' }).mask(phoneInput);

const form = document.querySelector('.freeback-form');
const submit = document.querySelector('.freeback-form__submit');

form.addEventListener('submit', event => {
  event.preventDefault();
});

submit.addEventListener('click', event => {});
