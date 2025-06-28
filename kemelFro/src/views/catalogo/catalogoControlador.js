export const catalogoControlador = async () => {
    const response = await fetch("https://api.kemel.online/productos");
    let data;
    try {
        data = await response.json();
    } catch (e) {
        data = {};
    }
    let productos = [];
    // La API retorna { productos: [...] }, así que solo validamos productos
    if (data && Array.isArray(data.productos)) {
        productos = data.productos;
    } else if (Array.isArray(data)) {
        // Si la respuesta es directamente un array
        productos = data;
    } else {
        console.error('La respuesta de productos no es un array:', data.productos ?? data);
        return;
    }
    const contenedor = document.getElementById('catalogo-productos');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'catalogo-card';

        const img = document.createElement('img');
        img.src = `/public/img/${producto.id}.png`;
        img.alt = producto.nombre;
        img.className = 'catalogo-img';
        img.onerror = () => { img.src = '/public/img/default.png'; };
        card.appendChild(img);

        // Nombre
        const nombre = document.createElement('h3');
        nombre.className = 'catalogo-nombre';
        nombre.textContent = producto.nombre;
        card.appendChild(nombre);

        // Descripción
        const descripcion = document.createElement('p');
        descripcion.className = 'catalogo-descripcion';
        descripcion.textContent = producto.descripcion;
        card.appendChild(descripcion);

        // Precio
        const precio = document.createElement('p');
        precio.className = 'catalogo-precio';
        precio.textContent = `$${parseFloat(producto.precio).toLocaleString('es-CO', {minimumFractionDigits: 2})}`;
        card.appendChild(precio);

        const btnCarrito = document.createElement('button');
        btnCarrito.textContent = 'Agregar al carrito';
        btnCarrito.className = 'catalogo-btn-carrito';
        btnCarrito.onclick = () => agregarAlCarrito(producto);
        card.appendChild(btnCarrito);

        contenedor.appendChild(card);
    });
};

function agregarAlCarrito(producto) {
    alert(`Producto agregado: ${producto.nombre}`);
}