//BD
import { geodb } from '../db/geodb.js';

//Últimos 4 elementos del array en geobd y reversa
const recentUpdates = geodb.slice(-5).reverse();
const ultimosContent = document.getElementsByClassName('ultimos-content')[0];

//Iteración de los últimos 4 elementos
recentUpdates.forEach((update) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.backgroundImage = `url("${update.img}")`;
  card.innerHTML = `
    <div class="card-text">
      <h3>${update.titulo}</h3>
    </div>
  `;
  ultimosContent.appendChild(card);
});

//Card que invita a revisar más datos recientes:
const cardMore = document.createElement('div');
cardMore.classList.add('card-more');
cardMore.innerHTML = `
  <a href="#"></a>
  <h3>Últimas contribuciones</h3>
`;
ultimosContent.appendChild(cardMore);