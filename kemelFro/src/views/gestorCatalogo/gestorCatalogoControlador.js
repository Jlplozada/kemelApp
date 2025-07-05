const API_URL = "http://localhost:4000/productos";

const tabla = document.getElementById("tablaProductos").querySelector("tbody");
const modal = document.getElementById("modalProducto");
const form = document.getElementById("formProducto");
const btnAgregar = document.getElementById("btnAgregar");
const btnCancelar = document.getElementById("btnCancelar");
const modalTitulo = document.getElementById("modalTitulo");
const inputId = document.getElementById("productoId");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputImagen = document.getElementById("imagen");

let productos = [];

function mostrarModal(editar = false, producto = null) {
    modal.style.display = "flex";
    if (editar && producto) {
        modalTitulo.textContent = "Editar Producto";
        inputId.value = producto.id;
        inputNombre.value = producto.nombre;
        inputPrecio.value = producto.precio;
    } else {
        modalTitulo.textContent = "Agregar Producto";
        form.reset();
        inputId.value = "";
    }
}

function ocultarModal() {
    modal.style.display = "none";
}

function renderTabla() {
    tabla.innerHTML = "";
    productos.forEach(producto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.imagen ? `<img src="${producto.imagen}" width="50">` : ''}</td>
            <td class="acciones">
                <button onclick="editarProducto(${producto.id})">Editar</button>
                <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(tr);
    });
}

async function cargarProductos() {
    const res = await fetch(API_URL);
    productos = await res.json();
    renderTabla();
}

window.editarProducto = function(id) {
    const producto = productos.find(p => p.id === id);
    mostrarModal(true, producto);
};

window.eliminarProducto = async function(id) {
    if (confirm("¿Eliminar producto?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarProductos();
    }
};

btnAgregar.addEventListener("click", () => mostrarModal(false));
btnCancelar.addEventListener("click", ocultarModal);

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = inputId.value;
    const nombre = inputNombre.value;
    const precio = inputPrecio.value;
    const imagen = inputImagen.files[0];
    let productoData = new FormData();
    productoData.append("nombre", nombre);
    productoData.append("precio", precio);
    if (imagen) productoData.append("imagen", imagen);

    if (id) {
        // Editar
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            body: productoData
        });
    } else {
        // Agregar
        await fetch(API_URL, {
            method: "POST",
            body: productoData
        });
    }
    ocultarModal();
    cargarProductos();
});

// Inicializar
cargarProductos();