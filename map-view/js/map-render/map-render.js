var boundary = [-81.3899688720703, -18.4412956237793, -68.5886001586914, 0.0298568718135357];

var map = L.map('map', {
    center: [(boundary[1] + boundary[3]) / 2, (boundary[0] + boundary[2]) / 2],
    zoom: 5,
    zoomControl: false,
    attributionControl: false,
});

var defaultLayer = L.tileLayer.provider('Stadia.AlidadeSmoothDark').addTo(map);

L.control.zoom({
  position: 'topright'
}).addTo(map);


var geojsonMarkerOptions = {
  fillColor: "#4444f54a",
  color: "#3388ffab",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

import { match } from '../global-match-feature/global.js';
import { obtenerFeature } from '../global-match-feature/global.js'
obtenerFeature(match.data).then((jsonData) => {
  var layer = L.geoJSON(jsonData, geojsonMarkerOptions);
  layer.addTo(map);
  const loadingPage = document.getElementsByClassName('loading-page')[0];
  loadingPage.style.display = 'none';
})
.catch((error) => {
  console.error('Error:', error);
});

if (match == null) {
  const loadingPage = document.getElementsByClassName('loading-page')[0];
  loadingPage.style.display = 'none';
}
