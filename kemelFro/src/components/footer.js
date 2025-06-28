import { navigate } from '../routes/router';

export const footer = () => {
    const barraFooter = document.createElement('footer');
    const divLogo = document.createElement('div');
    const logo = document.createElement('img');
    const logoApi = document.createElement('a');
    const divMenu = document.createElement('div');

    const inicio = document.createElement('a');
    const catalogo = document.createElement('a');
    const carrito = document.createElement('a');
    const cuenta = document.createElement('a');

    logo.src = '../public/kemel.png';
    logo.alt = 'Logo Kemel';
    logo.style.height = '40px';

    logoApi.href = 'https://api.kemel.online/';
    logoApi.appendChild(logo);
    logoApi.target = '_blank';

    inicio.textContent = 'Inicio';
    catalogo.textContent = 'Catálogo';
    carrito.textContent = 'Carrito';
    cuenta.textContent = 'Cuenta';

    inicio.setAttribute('href', '#inicio');
    catalogo.setAttribute('href', '#catalogo');
    carrito.setAttribute('href', '#carrito');
    cuenta.setAttribute('href', '#cuenta');

    divMenu.classList.add('footer-menu');
    divLogo.classList.add('footer-logo');

    divMenu.appendChild(inicio);
    divMenu.appendChild(catalogo);
    divMenu.appendChild(carrito);
    divMenu.appendChild(cuenta);
    divLogo.appendChild(logoApi);

    barraFooter.appendChild(divLogo);
    barraFooter.appendChild(divMenu);
    barraFooter.classList.add('footer');

    // Navegación SPA
    [inicio, catalogo, carrito, cuenta].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(link.getAttribute('href').replace('#', ''));
        });
    });

    // Pie de página legal
    const legal = document.createElement('div');
    legal.className = 'footer-legal';
    legal.textContent = '© 2025 Kemel. Todos los derechos reservados.';
    barraFooter.appendChild(legal);

    return barraFooter;
};