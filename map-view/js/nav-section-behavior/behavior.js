const nav = document.getElementsByTagName('nav')[0];
const section = document.getElementsByTagName('section')[0];
const navButton = document.getElementById('toogle-nav');
const sectionButton = document.getElementById('toogle-section');

//add event listener cuando el dom esté cargado:
document.addEventListener("DOMContentLoaded", function() {
  // Listeners con condicional ternario
navButton.addEventListener('click', () => {
  nav.style.transform = nav.style.transform === 'translateX(-100%)' ? 'translateX(0px)' : 'translateX(-100%)';
});
sectionButton.addEventListener('click', () => {
  section.style.transform = section.style.transform === 'translateY(0px)' ? 'translateY(100%)' : 'translateY(0px)';
  });
});
