import { createElement } from "../helper/createElement.js";

export const showAlert = (text, time = 3000) => {
  const alertBlock = createElement('div', {
    className: 'alert',
  });

  const alertText = createElement('p', {
    className: 'alert__text',
    textContent: text,
  });

  alertBlock.append(alertText);
  document.body.append(alertBlock);

  setTimeout(() => {
    alertBlock.classList.add('alert_show');
  }, 0);

  setTimeout(() => {
    alertBlock.classList.remove('alert_show');

    setTimeout(() => {
      alertBlock.remove()
    }, 200)
  }, time);
};
