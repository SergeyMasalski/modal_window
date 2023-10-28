function createAlertContainer(message) {
  const container = document.createElement('div');
  container.classList.add('container-message');
  container.classList.add('alert');
  const info = document.createElement('div');
  info.classList.add('container-message__alert');
  info.innerText = message;
  container.append(info);
  return container;
}

export default createAlertContainer;
