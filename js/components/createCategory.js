import { createElement } from "../helper/createElement.js"

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

    const categoryCardBtn = createElement('button', {
      className: 'category__card',
    });

    const categoryTitle = createElement('span', {
      className: 'category__title',
      textContent: data.title,
    });

    const categoryPairs = createElement('span', {
      className: 'category__pairs',
      textContent: data.length,
    });

    categoryCardBtn.append(categoryTitle, categoryPairs);

    const categoryCardEditBtn = createElement('button', {
      className: 'category__btn category__edit',
      ariaLabel: 'редактировать',
    });

    const categoryCardDelBtn = createElement('button', {
      className: 'category__btn category__del',
      ariaLabel: 'удалить',
    });

    li.append(categoryCardBtn, categoryCardEditBtn, categoryCardDelBtn);

    return li;
  }

  const mount = (data) => {
    categoryList.textContent = '';
    app.append(category);

    const cards = data.map(createCategoryCard);
    categoryList.append(...cards);
  };

  const unmount = () => {
    category.remove();
  }

  return{ mount, unmount, categoryList }
}
