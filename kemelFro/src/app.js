import './style.css';
import { header } from './components/header';
import { footer } from './components/footer';
import { router } from './routes/router';


const headerElement  = document.querySelector('#header');
const footerElement  = document.querySelector('#footer');
const main = document.querySelector('#main');

headerElement.appendChild(header());
// footerElement.appendChild(footer());


window.addEventListener('hashchange', () => {
  router(main)
});
window.addEventListener('DOMContentLoaded', () => {
  router(main)
});
// Ya no es necesario escuchar hashchange, el router escucha popstate


