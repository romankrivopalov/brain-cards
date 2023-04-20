import { createHeader } from "./components/createHeader.js";
import { createCategory } from "./components/createCategory.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories } from "./service/api.service.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createPairs } from "./components/createPairs.js";

const initApp = async () => {
  const headerParent = document.querySelector('.header'),
        app = document.querySelector('#app');

  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(app);
  const editCategory = createEditCategory(app);
  const pairsObj = createPairs(app);

  const allSectionUnmount = () => {
    [categoryObj, editCategory, pairsObj].forEach(obj => obj.unmount());
  }

  const renderIndex = async e => {
    e?.preventDefault();

    allSectionUnmount();

    const categories = await fetchCategories();
    headerObj.updateHeaderTitle('Категории');

    if (categories.error) {
      app.append(createElement('p', {
        className: 'server-error',
        textContent: 'Ошибка сервера, попробуйте зайти позже'
      }))

      return;
    }

    categoryObj.mount(categories);
  };

  renderIndex();

  headerObj.headerLogoLink.addEventListener('click', renderIndex);

  headerObj.headerBtn.addEventListener('click', () => {
    allSectionUnmount();
    headerObj.updateHeaderTitle('Новая категория');
    editCategory.mount();
  });

  categoryObj.categoryList.addEventListener('click', async ({ target }) => {
    const categoryItem = target.closest('.category__item');

    if (target.closest('.category__edit')) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle('Редактирование');
      editCategory.mount(dataCards);
      return;
    }

    if (target.closest('.category__del')) {
      console.log('удалить');
      return;
    }

    if (categoryItem) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle(dataCards.title);
      pairsObj.mount(dataCards);
    }
  });

  pairsObj.buttonReturn.addEventListener('click', renderIndex);
};

initApp();
