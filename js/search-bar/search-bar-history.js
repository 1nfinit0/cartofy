// Coportamiento de la barra de búsqueda con respecto al historial de búsquedas
const searchBar = document.querySelector('.search-bar');
const boton = document.getElementById('boton');
const searchContainer = document.querySelector('.search-container');
const searchSection = document.querySelector('.search');

const searchHistoryKey = '';

let searchHistory = JSON.parse(localStorage.getItem(searchHistoryKey)) || [];

function guardarBusqueda(busqueda) {
  searchHistory.unshift(busqueda);
  localStorage.setItem(searchHistoryKey, JSON.stringify(searchHistory));
}

searchBar.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      const busqueda = this.value.trim();
      if (busqueda !== '') {
          guardarBusqueda(busqueda);
          // TODO: borrar la siguiente linea cuando se implemente la funcionalidad de búsqueda
          searchBar.value = '';
          console.log(searchHistory);
      }
  }
});
boton.addEventListener('click', function() {
  const busqueda = searchBar.value.trim();
      if (busqueda !== '') {
          guardarBusqueda(busqueda);
          // TODO: borrar la siguiente linea cuando se implemente la funcionalidad de búsqueda
          searchBar.value = '';
          console.log(searchHistory);
      }
  }
);


//Contenido del historial:
searchBar.addEventListener('focus', function() {
  //Comportamiento de desplazammiento
  var posicionDesplazamiento = searchBar.getBoundingClientRect().top + window.scrollY - 170;
  window.scrollTo({ top: posicionDesplazamiento, behavior: 'smooth' });

  //Coportamiento del historial
  var nuevoDivExistencia = document.getElementsByClassName("search-history")[0];
  var newHistory = searchHistory.slice(0, 7);  

  if (searchBar.value === '' && !nuevoDivExistencia) {

    var nuevoDiv = document.createElement("div");
    nuevoDiv.className = "search-history";

    searchContainer.appendChild(nuevoDiv);

    var recentSearches = document.createElement("p");
    recentSearches.className = "recent-searches";
    recentSearches.textContent = "BÚSQUEDAS RECIENTES";

    nuevoDiv.appendChild(recentSearches);

    newHistory.forEach(element => {
      var nuevoPContenedor = document.createElement("div");
      nuevoPContenedor.className = "search-history-item";

      var itemLogo = document.createElement("img");
      itemLogo.className = "search-history-item-logo";
      itemLogo.src = "../../assets/history-svgrepo-com.svg";

      var nuevoP = document.createElement("a");
      nuevoP.className = "search-history-item-text";
      nuevoP.textContent = element;
      nuevoP.href = "#";
      nuevoPContenedor.appendChild(itemLogo);
      nuevoPContenedor.appendChild(nuevoP);
      nuevoDiv.appendChild(nuevoPContenedor);
    });
  } else {
    console.log("hay texto");
  }
});

searchBar.addEventListener('focusout', function() {
  var nuevoDiv = document.getElementsByClassName("search-history")[0];
  if (nuevoDiv) {
    nuevoDiv.remove();
  }
});