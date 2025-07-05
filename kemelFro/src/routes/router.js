import { loadView } from "../helpers/loadView";
import { inicioControlador } from "../views/inicio/inicioControlador.js";
import { catalogoControlador } from "../views/catalogo/catalogoControlador.js";
import { carritoControlador } from "../views/carrito/carritoControlador.js";
import { registroControlador } from "../views/sesion/registroControlador.js";
import { loginControlador } from "../views/sesion/loginControlador.js";


const routes = {
   "":{
    "template": "../views/inicio/inicio.html",
    controlador: inicioControlador
   },
   inicio:{
    "template": "../views/inicio/inicio.html",
    controlador: inicioControlador
   },
   catalogo: {
    "template": "../views/catalogo/catalogo.html",
    controlador: catalogoControlador
   },
   carrito: {
    "template": "../views/carrito/carrito.html",
    controlador: carritoControlador
   },
   registro: {
    "template": "../views/sesion/registro.html",
    controlador:registroControlador
   },
   login: {
    "template": "../views/sesion/login.html",
    controlador: loginControlador
   },
   cuenta: {
    "template": "../views/sesion/login.html",
    controlador: loginControlador
   },
   gestorcatalogo:{
    "template": "../views/gestorCatalogo/gestorCatalogo.html",
    controlador: gestorCatalogoControlador
   }
};

export const router = async (body) => {
    if (!body) return;
    // Obtiene la ruta de la URL (sin el símbolo '#')
    let path = location.pathname.replace(/^\//, '');
    // Si está vacío, usa 'inicio' como ruta por defecto
    if (path === '') path = 'inicio';
    const [ rutas, params ] = matchRoute(path)
    if (!rutas || !rutas.template) {
      body.innerHTML = '<h2>Página no encontrada</h2>';
      return;
    }
    await loadView(body, rutas.template);
    rutas.controlador(params);
};

const matchRoute = (hash) => {  
  // Divide el hash en partes usando '/' como separador
  const arreglo = hash.split('/') ;  
  // Itera sobre cada ruta definida en el objeto 'routes'
  for (const route in routes) {
    // Divide la ruta definida en partes
    const b = route.split('/');   
    // Si la cantidad de partes no coincide, pasa a la siguiente ruta
    if (b.length !== arreglo.length) continue
    // Objeto para almacenar los parámetros extraídos de la URL
    const params = {}
    // Compara cada parte de la ruta con la parte correspondiente del hash
    const matched = b.every((parte, i) => {      
      // Si la parte de la ruta es un parámetro (ej: ':id')
      if (parte.startsWith(":")) {   
        // Extrae el nombre del parámetro (sin ':')
        const partName = parte.slice(1);
        // Toma el valor correspondiente de la URL
        const value = arreglo[i];
        // Guarda el valor en el objeto de parámetros
        params[partName] = value;
        return true
      }
      // Si la parte de la ruta coincide exactamente con la parte de la URL
      if (parte === arreglo[i]){
        return true
      }
      // Si no coincide, retorna undefined (falso) y termina el every
    }); 

    // Si todas las partes coinciden, retorna la ruta y los parámetros extraídos
    if (matched) {      
      return [routes[route], params]
    }
  }
  // Si no se encontró coincidencia, retorna [null, null]
  return [null, null]
}

// Función para navegación programática (en vez de location.hash = ...)
export function navigate(path) {
  window.history.pushState({}, "", `/${path}`);
  router(document.getElementById("app"));
}

// Escucha el evento popstate para navegación con botones del navegador
window.addEventListener("popstate", () => {
  router(document.getElementById("app"));
});