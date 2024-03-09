import { match } from '../global-match-feature/global.js';
// Cambiar el título de la página según el parámetro de consulta
if (match) {
  document.title = match.titulo+' - Cartofy';
} else {
  document.title = 'Cartofy';
}

// Trigger por si no existe parámetro
const main = document.getElementsByTagName('main')[0];
if (!match || match == null) {
  main.innerHTML = `<h1 class="feature-error">No se encontraron resultados</h1>`;
}