import { createHeader } from "./components/createHeader.js";

const initApp = () => {
  const headerParent = document.querySelector('.header'),
        app = document.querySelector('#app');

  createHeader(headerParent);
};

initApp();
