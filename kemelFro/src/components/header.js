import { navigate } from '../routes/router';

export const header = () => {
    const barraNavegacion = document.createElement('div');
    const divLogo = document.createElement('div');
    const logo = document.createElement('img');
    const logoApi = document.createElement('a');
    const divMenu = document.createElement('div');
    const menuBtn = document.createElement('button');
    const menuIcon = document.createElement('img');

    const inicio = document.createElement('a');
    const catalogo = document.createElement('a');
    const carrito = document.createElement('a');
    const cuenta = document.createElement('a');

    logo.src = '../public/kemel.png';
    logo.alt = 'Logo Kemel';

    logoApi.href = 'https://api.kemel.online/';
    logoApi.appendChild(logo);

    inicio.textContent = 'Inicio';
    catalogo.textContent = 'Catálogo';
    carrito.textContent = 'Carrito';
    cuenta.textContent = 'Cuenta';

    inicio.setAttribute("href", 'inicio');
    catalogo.setAttribute("href", 'catalogo');
    carrito.setAttribute("href", 'carrito');
    cuenta.setAttribute("href", 'cuenta');

    divMenu.classList.add('nav-menu');
    divLogo.classList.add('nav-logo');

    divMenu.appendChild(inicio);
    divMenu.appendChild(catalogo);
    divMenu.appendChild(carrito);
    divMenu.appendChild(cuenta);
    divLogo.appendChild(logoApi); 

    menuBtn.classList.add('menu-hamburguesa');
    menuIcon.src = '../public/ico/menu-line.svg';
    menuIcon.alt = 'Menú';
    menuBtn.appendChild(menuIcon);

    menuBtn.addEventListener('click', () => {
        divMenu.classList.toggle('activo');
    });

    [ inicio, catalogo, carrito, cuenta ].forEach(link => {
      link.addEventListener('click', () => {
        divMenu.classList.remove('activo');
      });
    });

    barraNavegacion.appendChild(divLogo);
    barraNavegacion.appendChild(menuBtn);
    barraNavegacion.appendChild(divMenu);

    barraNavegacion.classList.add('header'); 
    return barraNavegacion; 
}