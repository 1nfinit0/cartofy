// Obtener el parámetro de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);
const parametroUrl = urlParams.get('key');

// Cambiar el título de la página según el parámetro de consulta
if (parametroUrl) {
  document.title = parametroUrl+' - Cartofy';
} else {
  document.title = 'Cartofy';
}

// Cambiando el contenido de las estadísticas según el parámetro de consulta
const spanKey = document.getElementsByClassName('key')[0];
spanKey.innerHTML = parametroUrl;

//Función que cuenta la cantida de coincidencias en la bd
import { filtrarPorKeyword } from '../../../js/search-bar/search-bar-history.js';
const matches = filtrarPorKeyword(parametroUrl);

//Cambiando el contenido de la cantidad de coincidencias de acuerdo al parámetro de consulta
const spanDataCount = document.getElementsByClassName('data-count')[0];
spanDataCount.innerHTML = matches.length;


