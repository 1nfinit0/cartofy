import { match } from '../global-match-feature/global.js';
import { obtenerFeature } from '../global-match-feature/global.js'

var geojsonMarkerOptions = {
  fillColor: "#4444f54a",
  color: "#3388ffab",
  weight: 0.8,
  opacity: 1,
  fillOpacity: 0.5,
};

obtenerFeature(match.data).then((jsonData) => {
  var jsonLayer = L.geoJSON(jsonData, geojsonMarkerOptions);

  var boundary = jsonLayer.getBounds().getCenter();

  var map = L.map('map', {
    center: [boundary.lat, boundary.lng],
    zoomControl: false,
    attributionControl: false,
  });

  var defaultLayer = L.tileLayer.provider('Stadia.AlidadeSmoothDark');
  defaultLayer.addTo(map);

  L.control.zoom({
    position: 'topright'
  }).addTo(map);


  const loadingPage = document.getElementsByClassName('loading-page')[0];
  loadingPage.style.display = 'none';
  jsonLayer.addTo(map);
  map.fitBounds(jsonLayer.getBounds());

  let selectedFeature;

  jsonLayer.on('click', function (e) {
    //Seleccionando un elemento específico de jsonLayer
    selectedFeature = e.layer;
    var item = selectedFeature.feature.properties;
    console.log(item);

    var key = Object.keys(selectedFeature.feature.properties)

    //Cambiando estilos de acuerdo a la selección
    jsonLayer.setStyle(geojsonMarkerOptions)
    selectedFeature.setStyle({ opacity: 1, width: 3, fillColor: "#0080FF" });

    //Mostrando selección en la tabla atributiva:
    const table = document.getElementsByClassName('rwd-table')[0];
    const tBodyExist = document.getElementsByClassName('selected-tbody')[0];

    if (tBodyExist) {
      tBodyExist.remove();
    }

    const tbody = table.createTBody();
    tbody.classList.add('selected-tbody');
    const row = tbody.insertRow();

    key.forEach(key => {
      const cell = row.insertCell();
      cell.textContent = item[key];
    });
    
    table.prepend(tbody);    
  });




})
  .catch((error) => {
    console.error('Error:', error);
  });

if (match == null) {
  const loadingPage = document.getElementsByClassName('loading-page')[0];
  loadingPage.style.display = 'none';
}