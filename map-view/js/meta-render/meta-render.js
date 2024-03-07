// Obtener el parámetro de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);
const parametroUrl = urlParams.get('key');

//Importando BD
import { geodb } from '../../../js/db/geodb.js';

//Función que devuelve el objeto que coincide con el parámetro de búsqueda
export function filtrarPorId(id) {
  const obj = geodb.find(geodb => geodb.id == id);
  if (!obj) {
    return null;
  }
  return obj;
}

//Obteniendo el objeto que coincide con el parámetro de búsqueda
const match = filtrarPorId(parametroUrl);

// Cambiar el título de la página según el parámetro de consulta
if (match) {
  document.title = match.titulo+' - Cartofy';
} else {
  document.title = 'Cartofy';
}

// Trigger por si no existe parámetro
const main = document.getElementsByTagName('main')[0];
if (!match || match == null) {
  main.innerHTML = `<h1>No se encontraron resultados</h1>`;
}