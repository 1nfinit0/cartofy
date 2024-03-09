//Varibales que se necesitarán de forma global:
//Importando BD
import { geodb } from '../../../js/db/geodb.js';

// Obtener el parámetro de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);
const parametroUrl = urlParams.get('key');

// Función que devuelve el objeto que coincide con el parámetro de búsqueda
function filtrarPorId(id) {
  var obj = geodb.find(geodb => geodb.id == id);
  if (!obj) {
    return null;
  }
  return obj;
}

// Objeto que se obtiene de la BD
const match = filtrarPorId(parametroUrl);
export { match };

let jsonData;

// Función que obtiene el JSON de la URL
async function obtenerJSONDesdeURL(url) {
  const response = await fetch(url);
  jsonData = await response.json();
}

export async function obtenerFeature(url) {
  if (!jsonData) {
    await obtenerJSONDesdeURL(url);
  }
  return jsonData;
}