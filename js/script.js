import { createHeader } from "./components/createHeader.js";
import { createCategory } from "./components/createCategory.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories, fetchCreateCategory, fetchDeleteCategory, fetchEditCategory } from "./service/api.service.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createPairs } from "./components/createPairs.js";
import { showAlert } from "./components/showAlert.js";

const initApp = async () => {
  const headerParent = document.querySelector('.header'),
        app = document.querySelector('#app');

  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(app);
  const editCategoryObj = createEditCategory(app);
  const pairsObj = createPairs(app);

  const allSectionUnmount = () => {
    [categoryObj, editCategoryObj, pairsObj].forEach(obj => obj.unmount());
  };

  const postHandler = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchCreateCategory(data);

    if (dataCategories.error) {
      showAlert(dataCategories.error.message);
      return;
    }

    showAlert(`Новая категория ${data.title} была добавлена`);
    allSectionUnmount();
    headerObj.updateHeaderTitle('Категории');
    categoryObj.mount(dataCategories);
  }

  const patchHandler = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchEditCategory(editCategoryObj.btnSave.dataset.id, data);

    if (dataCategories.error) {
      showAlert(dataCategories.error.message);
      return;
    }

    showAlert(`Категория ${data.title} обновлена`);
    allSectionUnmount();
    headerObj.updateHeaderTitle('Категории');
    categoryObj.mount(dataCategories);
  }

  const cancelHandler = () => {
    if(confirm('Выйти без изменений')) {
      allSectionUnmount();

      renderIndex();

      editCategoryObj.btnCancel.removeEventListener('click', cancelHandler);
    }

    return;
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
    editCategoryObj.mount();
    editCategoryObj.btnSave.addEventListener('click', postHandler);
    editCategoryObj.btnSave.removeEventListener('click', patchHandler);
    editCategoryObj.btnCancel.addEventListener('click', cancelHandler);
  });

  categoryObj.categoryList.addEventListener('click', async ({ target }) => {
    const categoryItem = target.closest('.category__item');

    if (target.closest('.category__edit')) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle('Редактирование');
      editCategoryObj.mount(dataCards);
      editCategoryObj.btnSave.addEventListener('click', patchHandler);
      editCategoryObj.btnSave.removeEventListener('click', postHandler);
      editCategoryObj.btnCancel.addEventListener('click', cancelHandler);
      return;
    }

    if (target.closest('.category__del')) {
      if (confirm("Удалить категорию ?")) {
        const result = fetchDeleteCategory(categoryItem.dataset.id);

        if (result.error) {
          showAlert(result.error.message);
          return;
        }

        showAlert('Категория удалена');
        categoryItem.remove();
      }
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
