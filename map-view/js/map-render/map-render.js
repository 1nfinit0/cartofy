var boundary = [-81.3899688720703, -18.4412956237793, -68.5886001586914, 0.0298568718135357];

var map = L.map('map', {
    center: [(boundary[1] + boundary[3]) / 2, (boundary[0] + boundary[2]) / 2],
    zoom: 5,
    zoomControl: false,
    attributionControl: false,
});

var defaultLayer = L.tileLayer.provider('Stadia.AlidadeSmoothDark').addTo(map);

L.control.zoom({
  position: 'bottomright'
}).addTo(map);



var geojsonMarkerOptions = {
  fillColor: "#4444f54a",
  color: "#3388ffab",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

// Obtener el parámetro de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);
const parametroUrl = urlParams.get('key');

import { filtrarPorId } from '../meta-render/meta-render.js';

const match = filtrarPorId(parametroUrl);

if (match != null) {
  var data = match.data;

  async function obtenerJSONDesdeURL(url) {
    const response = await fetch(url); // Realizar solicitud HTTP
    const jsonData = await response.json(); // Convertir la respuesta en JSON
    // Devolver el objeto JSON
    return jsonData;
  }
  const feature = await obtenerJSONDesdeURL(data);
  var featureLayer = L.geoJson(feature, geojsonMarkerOptions).addTo(map);

  const loadingPage = document.getElementsByClassName('loading-page')[0];
  loadingPage.style.display = 'none';
}
