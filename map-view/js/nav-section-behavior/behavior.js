const nav = document.getElementsByTagName('nav')[0];
const section = document.getElementsByTagName('section')[0];
const navButton = document.getElementById('toogle-nav');
const sectionButton = document.getElementById('toogle-section');

navButton.addEventListener('click', () => {
  nav.style.transform = nav.style.transform === 'translateX(0px)' ? 'translateX(-100%)' : 'translateX(0px)';
});
sectionButton.addEventListener('click', () => {
  section.style.transform = section.style.transform === 'translateY(0px)' ? 'translateY(100%)' : 'translateY(0px)';
});