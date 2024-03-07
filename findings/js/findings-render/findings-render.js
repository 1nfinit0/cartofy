// Usando la función que devuelve las conicidencias en un array de objetos:
import { filtrarPorKeyword } from '../../../js/search-bar/search-bar-history.js';

// Obtener el parámetro de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);
const parametroUrl = urlParams.get('key');

// Obtener las coincidencias de la base de datos
const matches = filtrarPorKeyword(parametroUrl);

//Renderizado de coincidencias en section
function renderMatches(matches) {
  const section = document.getElementsByTagName('section')[0];

  var ul = document.createElement('ul');
    ul.className = 'matches-list';

  matches.forEach(match => {
    var li = document.createElement('li');
      li.className = 'match-item';

    var a = document.createElement('a');
      a.className = 'match-link';
      a.href = '../../../map-view/map.html?key='+match.id;
      a.innerHTML = `<img src="${match.img}" alt="${match.titulo}" class="match-img">`+
                    `<div class="match-tittle"><h2 class="match-title">${match.titulo}</h2></div>`+
                    `<p class="match-description">${match.descripcion}</p>`;
      li.appendChild(a);
      ul.appendChild(li);
  });
  section.appendChild(ul);
};
renderMatches(matches);
