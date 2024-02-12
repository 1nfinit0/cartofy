// Coportamiento de la barra de búsqueda con respecto al historial de búsquedas
const searchBar = document.querySelector('.search-bar');
const boton = document.getElementById('boton');
const searchContainer = document.querySelector('.search-container');

//BD
import { geodb } from '../db/geodb.js';


const searchHistoryKey = '';

let searchHistory = JSON.parse(localStorage.getItem(searchHistoryKey)) || [];

//Función que guarda la búsqueda en el historial
function guardarBusqueda(busqueda) {
  searchHistory.unshift(busqueda);
  localStorage.setItem(searchHistoryKey, JSON.stringify(searchHistory));
}

//Función que acorta el historial a 7 elementos
function recorteHistorial() {
  var newHistory = searchHistory.slice(0, 7); 
  return newHistory; 
}

//Guardado de la búsqueda al hacer enter
searchBar.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      const busqueda = this.value.trim();
      if (busqueda !== '') {
          guardarBusqueda(busqueda);
          let keyToken = localStorage.getItem('keyToken');
          keyToken = busqueda;
          localStorage.setItem('keyToken', keyToken);
          window.location.href = "../../findings/findings.html";
        }
  }
});

//Guardado de la búsqueda al hacer click en el botón
boton.addEventListener('click', function() {
  const busqueda = searchBar.value.trim();
      if (busqueda !== '') {
          guardarBusqueda(busqueda);
          let keyToken = localStorage.getItem('keyToken');
          keyToken = busqueda;
          localStorage.setItem('keyToken', keyToken);
          window.location.href = "../../findings/findings.html";
      }
  }
);

//Desplazamiento al hacer focus en la barra de búsqueda
searchBar.addEventListener('focus', function() {
  var posicionDesplazamiento = searchBar.getBoundingClientRect().top + window.scrollY - 170;
  window.scrollTo({ top: posicionDesplazamiento, behavior: 'smooth' });
});

//Función que busca coincidencias en la base de datos
function filtrarPorKeyword(valorInput) {
  // Normalizar el valor del input (quitar tildes, signos de puntuación y espacios)
  const valorNormalizado = valorInput
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .toLowerCase();

  // Convertir el valor del input en un array de palabras
  const palabras = valorNormalizado.split(/\s+/);

  // Filtrar el array geodb basado en las keywords
  const resultados = geodb.filter(objeto => {
    // Normalizar las keywords del objeto actual y buscar coincidencias
    const coincidencias = objeto.keyword.reduce((total, keyword) => {
      const keywordNormalizada = keyword
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "")
        .toLowerCase();
      return total + palabras.reduce((count, palabra) => {
        return count + (keywordNormalizada.includes(palabra) ? 1 : 0);
      }, 0);
    }, 0);

    return coincidencias > 0; // Retornar objetos que tienen al menos una coincidencia
  });

  // Ordenar los resultados por número de coincidencias
  resultados.sort((a, b) => {
    const coincidenciasA = a.keyword.reduce((total, keyword) => {
      return total + palabras.reduce((count, palabra) => {
        const keywordNormalizada = keyword
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s]/g, "")
          .toLowerCase();
        return count + (keywordNormalizada.includes(palabra) ? 1 : 0);
      }, 0);
    }, 0);

    const coincidenciasB = b.keyword.reduce((total, keyword) => {
      return total + palabras.reduce((count, palabra) => {
        const keywordNormalizada = keyword
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s]/g, "")
          .toLowerCase();
        return count + (keywordNormalizada.includes(palabra) ? 1 : 0);
      }, 0);
    }, 0);

    return coincidenciasB - coincidenciasA; // Orden descendente por coincidencias
  });

  return resultados;
}

//Función que renderiza el historial de búsquedas
function mostrarHistorial() {
  var nuevoDivExistencia = document.getElementsByClassName("search-respuesta")[0];
    if (nuevoDivExistencia) {
      nuevoDivExistencia.remove();
    }
  var newHistory = recorteHistorial();
  //Creación de la estructura del historial
  var nuevoDiv = document.createElement("div");
    nuevoDiv.className = "search-respuesta";
    searchContainer.appendChild(nuevoDiv);
  //Etiqueta de bíusquedas recientes
  var recentSearches = document.createElement("p");
    recentSearches.className = "recent-searches";
    recentSearches.textContent = "BÚSQUEDAS RECIENTES";

    nuevoDiv.appendChild(recentSearches);

    newHistory.forEach(element => {
      var nuevoPContenedor = document.createElement("div");
      nuevoPContenedor.className = "search-respuesta-item";

      var itemLogo = document.createElement("img");
      itemLogo.className = "search-respuesta-item-logo";
      itemLogo.src = "../../assets/history-svgrepo-com.svg";

      var nuevoP = document.createElement("a");
      nuevoP.className = "search-respuesta-item-text";
      nuevoP.textContent = element;
      nuevoP.href = "#";

      nuevoPContenedor.appendChild(itemLogo);
      nuevoPContenedor.appendChild(nuevoP);
      nuevoDiv.appendChild(nuevoPContenedor);
    });
};

//Función para renderizar coincidencias de búsqueda
function mostrarCoincidencias(coincidencias) {
  var nuevoDivExistencia = document.getElementsByClassName("search-respuesta")[0];
  if (nuevoDivExistencia) {
    nuevoDivExistencia.remove();
  }
  //Creación de la estructura de las coincidencias
  var nuevoDiv = document.createElement("div");
    nuevoDiv.className = "search-respuesta";
    searchContainer.appendChild(nuevoDiv);  

    coincidencias.forEach(element => {
      var nuevoPContenedor = document.createElement("div");
      nuevoPContenedor.className = "search-respuesta-item";

      var itemLogo = document.createElement("img");
      itemLogo.className = "search-respuesta-item-logo";
      itemLogo.src = "../../assets/search-svgrepo-com.svg";

      var nuevoP = document.createElement("a");
      nuevoP.className = "search-respuesta-item-text";
      nuevoP.textContent = element.titulo;
      nuevoP.href = "#";

      nuevoPContenedor.appendChild(itemLogo);
      nuevoPContenedor.appendChild(nuevoP);
      nuevoDiv.appendChild(nuevoPContenedor);
    });
};

//Listener para renderizar hisotiral o las coincidencias al hacer focus en la barra de búsqueda
searchBar.addEventListener('focus', function() {
  this.setSelectionRange(this.value.length, this.value.length);
  var newHistory = recorteHistorial();
  //Renderizado del historial de búsquedas
  if (searchBar.value === '' && newHistory.length > 0) {
    mostrarHistorial();
  }
  else {
    const busquedaRealTime = searchBar.value;
    var coincidencias = filtrarPorKeyword(busquedaRealTime);
    mostrarCoincidencias(coincidencias);
  }
});

//Listener para renderizar coincidencias al escribir en la barra de búsqueda
searchBar.addEventListener('keyup', function(event) {  
  var newHistory = recorteHistorial();
  if (searchBar.value === '' && newHistory.length > 0 && event.key !== 'Escape'){
    mostrarHistorial();
  }
  else if (event.key === 'Escape'){
    var nuevoDiv = document.getElementsByClassName("search-respuesta")[0];
    if (nuevoDiv) {
      nuevoDiv.remove();
    } 
  }
  else {
    const busquedaRealTime = searchBar.value;
    var coincidencias = filtrarPorKeyword(busquedaRealTime);
    mostrarCoincidencias(coincidencias);
  }
});

//remove del historial y coincidencias en la barra de búsqueda
searchBar.addEventListener('focusout', function() {
  var nuevoDiv = document.getElementsByClassName("search-respuesta")[0];
  if (nuevoDiv) {
    nuevoDiv.remove();
  }
});

//Remove del historial al presionar escape
searchBar.addEventListener('keydown', function(event) {
  var nuevoDiv = document.getElementsByClassName("search-respuesta")[0];
  if (nuevoDiv && event.key === 'Escape') {
    nuevoDiv.remove();
  }
});