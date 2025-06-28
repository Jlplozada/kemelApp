export const loginControlador = () => {
  console.log('Controlador de inicio de sesión activado');

  const btnRegistro = document.querySelector('form button[type="button"]');
  if (btnRegistro) {
    btnRegistro.onclick = (e) => {
      e.preventDefault();
      if (window.location.hash === '#registro') {
        window.location.hash = '';
        setTimeout(() => {
          window.location.hash = 'registro';
        }, 10);
      } else {
        window.location.hash = 'registro';
      }
    };
  }
};