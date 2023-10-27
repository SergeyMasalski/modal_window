import Inputmask from 'inputmask';
import validation from './modules/validation.module';
import sendRequest from './modules/ajax.module';
import createElementAlert from './modules/createAlertElement';

import './styles/style.scss';

const phoneInput = document.getElementById('phone');

Inputmask({ mask: '(375)-99-999-99-99' }).mask(phoneInput);

const form = document.querySelector('.freeback-form');
const submit = document.querySelector('.freeback-form__submit');
const inputs = Object.values(form).filter(item => item instanceof HTMLInputElement || item instanceof HTMLTextAreaElement);

form.addEventListener('submit', event => {
  event.preventDefault();
});

submit.addEventListener('click', event => {
  if (validation(form)) {
    const bodyRequest = {};
    inputs.forEach(item => {
      bodyRequest[`${item.id}`] = item.value;
    });

    sendRequest('http://localhost:3000', bodyRequest)
      .then(response => {
        const responseObject = JSON.parse(response);

        const msg = responseObject.msg;
        const container = document.createElement('div');
        const divMessage = document.createElement('div');
        container.classList.add('container-message');
        container.classList.add('success');

        divMessage.classList.add('container-message__success');
        divMessage.innerText = msg;
        container.append(divMessage);

        form.append(container);
        setInterval(() => {
          container.remove();
        }, 1500);
        inputs.forEach(item => (item.value = ''));
      })
      .catch(error => {
        const errorObject = JSON.parse(error);
        const errors = errorObject.fields;

        const container = document.createElement('div');
        container.classList.add('container-message');
        container.classList.add('alert');
        const info = document.createElement('div');
        info.classList.add('container-message__alert');
        info.innerText = 'Неверно введены данные:';
        container.append(info);

        for (const field in errors) {
          if (errors.hasOwnProperty(field)) {
            switch (field) {
              case 'email':
                container.append(createElementAlert(field, errors[field]));
                break;
              case 'message':
                container.append(createElementAlert('сообщение', errors[field]));
                break;
              case 'name':
                container.append(createElementAlert('имя', errors[field]));
                break;
              case 'phone':
                container.append(createElementAlert('телефон', errors[field]));
                break;

              default:
                break;
            }
          }
        }
        form.append(container);

        setTimeout(() => container.remove(), 4000);
      });
  }
});
