export default function validation(form) {
  const errors = Object.values(form)
    .filter(item => item instanceof HTMLInputElement || item instanceof HTMLTextAreaElement)
    .map(element => {
      if (element.value !== '' && !element?.validationMessage) {
        element.classList.remove('container-input__text_not-valid');
        return element;
      }
      element.classList.add('container-input__text_not-valid');
      return element;
    })
    .filter(item => {
      if (Object.values(item.classList).includes('container-input__text_not-valid')) return true;
      return false;
    });

  if (errors.length > 0) return false;
  return true;
}
