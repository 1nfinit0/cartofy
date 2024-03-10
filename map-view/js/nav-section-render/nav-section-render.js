import { match } from '../global-match-feature/global.js';
import { obtenerFeature } from '../global-match-feature/global.js'

//Diccionario de datos para categorías
var categorias = {
  1: "Geografía Física",
  2: "Geografía Humana",
  3: "Geopolítica",
  4: "Recursos Naturales y Medio Ambiente",
  5: "Socioeconomía",
  6: "Transporte y Comunicaciones",
  7: "Cultural",  
}

obtenerFeature(match.data).then((jsonData) => {
  const nav = document.getElementsByTagName('nav')[0];
  const navContent = document.createElement('div');
  navContent.className = 'feature-info-container';
  navContent.innerHTML = `
      <h1 class="feature-info-tittle">${(match.titulo)}</h1>
      <div class="feature-info-img">
        <img src="${(match.img)}" alt="Feature image">
      </div>
      <p class="feature-info-description">${(match.descripcion)}</p>
      <h2 class="feature-info-general">Información general</h2>
      <div class="feature-info-hr"></div>
      <div class="feature-info-properties">
        <h3 class="feature-info-key">Categoría</h3>
        <p class="feature-info-key-value">${(categorias[match.categoria])}</p>
        <h3 class="feature-info-key">Fuente:</h3>
        <p class="feature-info-key-value">${(match.fuente)}</p>
        <h3 class="feature-info-key">SRC:</h3>
        <p class="feature-info-key-value">${(jsonData.crs.properties.name)}</p>
        <h3 class="feature-info-key">Tipo de Geometría:</h3>
        <p class="feature-info-key-value">${(jsonData.type)}</p>
        <h3 class="feature-info-key">Descarga:</h3>
        <a href="${(match.descarga.shp)}" class="feature-info-descarga">SHP</a>
      </div>`;
  nav.appendChild(navContent);

  const tableContainer = document.getElementsByClassName('table-container')[0];
  const tittleContainer = document.createElement('div');
  tittleContainer.className = 'feature-tittle';
  tittleContainer.innerHTML = `
    <h2>${(match.titulo)}</h2>`;
  tableContainer.appendChild(tittleContainer);

  const propertiesKeys = Object.keys(jsonData.features[0].properties);

  const table = document.createElement('table');
  table.className = 'rwd-table';
  const thead = table.createTHead();
  const row = thead.insertRow();

  propertiesKeys.forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    row.appendChild(th);
  });

  const tbody = table.createTBody();
  jsonData.features.forEach(feature => {
    const row = tbody.insertRow();
    propertiesKeys.forEach(key => {
      const cell = row.insertCell();
      cell.textContent = feature.properties[key];
    });
  });

  tableContainer.appendChild(table);
})
.catch((error) => {
  console.error('Error:', error);
});