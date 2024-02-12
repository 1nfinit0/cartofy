const cuerpo  = document.querySelector('body');

let keyToken = localStorage.getItem('keyToken');

cuerpo.textContent = keyToken;