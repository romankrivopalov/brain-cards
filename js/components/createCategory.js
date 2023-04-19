import { createElement } from "../helper/createElement.js"
import { declOfNum } from "../helper/declOfNum.js";

export const createCategory = (app) => {
  const category = createElement('section', {
    className: 'category section-offset',
  });

  const container = createElement('div', {
    className: 'container',
  });

  category.append(container);

  const categoryList = createElement('ul', {
    className: 'category__list',
  });

  container.append(categoryList);

  const createCategoryCard = (data) => {
    const li = createElement('li', {
      className: 'category__item',
    });

    li.dataset.id = data.id;

    const btnCard = createElement('button', {
      className: 'category__card',
    });

    const titleText = createElement('span', {
      className: 'category__title',
      textContent: data.title,
    });

    const countPairs = createElement('span', {
      className: 'category__pairs',
      textContent: declOfNum(data.length, ['пара', 'пары', 'пар']),
    });

    btnCard.append(titleText, countPairs);

    const btnEdit = createElement('button', {
      className: 'category__btn category__edit',
      ariaLabel: 'редактировать',
    });

    const btnDelete = createElement('button', {
      className: 'category__btn category__del',
      ariaLabel: 'удалить',
    });

    li.append(btnCard, btnEdit, btnDelete);

    return li;
  }

  const mount = (data) => {
    categoryList.textContent = '';
    const cards = data.map(createCategoryCard);
    categoryList.append(...cards);
    app.append(category);
  };

  const unmount = () => {
    category.remove();
  }

  return{ mount, unmount, categoryList }
}
