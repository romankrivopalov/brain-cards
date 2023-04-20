import { createElement } from "../helper/createElement.js";

export const createPairs = (app) => {
  const pairs = createElement('section', {
    className: 'card section-offset',
  });

  const container = createElement('div', {
    className: 'container card__container',
  });

  const buttonReturn = createElement('button', {
    className: 'card__return',
    ariaLabel: 'Возврат к категориям',
  });

  const buttonCard = createElement('button', {
    className: 'card__item',
  });

  const front = createElement('span', {
    className: 'card__front',
    textContent: 'улыбка',
  });

  const back = createElement('span', {
    className: 'card__back',
    textContent: 'smile',
  });

  buttonCard.append(front, back);
  container.append(buttonReturn, buttonCard);
  pairs.append(container);

  const mount = data => {
    app.append(pairs);
  };

  const unmount = () => {
    pairs.remove();
  };

  return { mount, unmount, buttonReturn }
};
