export const registroControlador = ()=> {
  console.log('Controlador del Registro activado');
  const btnSesion = document.querySelector('form button[type="button"]');
  if (btnSesion) {
    btnSesion.onclick = (e) => {
      e.preventDefault();
      window.location.hash = 'cuenta';
    };
  }
}