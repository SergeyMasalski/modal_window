const createElementAlert = (fieldName, message) => {
  const element = document.createElement('div');
  element.innerText = message;
  const infoField = document.createElement('span');
  infoField.classList.add('container-message__bold');
  infoField.innerText = `Поле ${fieldName}: `;
  element.prepend(infoField);

  return element;
};

export default createElementAlert;
