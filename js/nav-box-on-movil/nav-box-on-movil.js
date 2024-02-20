const navButton = document.getElementById('nav-button');
const navBox = document.getElementsByTagName('nav')[0];

navButton.addEventListener('click', () => {
  const computedStyle = window.getComputedStyle(navBox);
  const displayPropertyValue = computedStyle.getPropertyValue('display');

  if (displayPropertyValue === 'none') {
    navBox.style.display = 'block';
    navButton.style.backgroundImage = 'url(../../assets/img/close-svgrepo-com.svg)';
  } else {
    navBox.style.display = 'none';
    navButton.style.backgroundImage = 'url(../../assets/img/menu-svgrepo-com.svg)';
  }
});