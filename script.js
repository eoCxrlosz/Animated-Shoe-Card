const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const shoes = document.querySelectorAll('.shoe');
const gradients = document.querySelector('.gradients');
const shoeBg = document.querySelector('.shoeBackground');

let prevColor = "blue";
let animationEnd = true;

function changeSize() {
  sizes.forEach(size => size.classList.remove('active'));
  this.classList.add('active');
}

function changeColor(e) {
  if (!animationEnd) return;
  animationEnd = false;
  let primary = e.target.getAttribute('primary');
  let color = e.target.getAttribute('color');
  let gradient = document.querySelector(`.gradient[color="${color}"]`);
  let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);
  let shoes = document.querySelectorAll(`.shoe[color="${color}"]`);
  let prevShoes = document.querySelectorAll(`.shoe[color="${prevColor}"]`);

  if (color == prevColor) {
    animationEnd = true;
    return;
  }

  prevGradient.classList.remove('second');
  gradient.classList.add('second');

  shoes.forEach((shoe) => {
    prevShoes.forEach((prevShoe) => {
      let prevSrc = prevShoe.getAttribute('src');
      let src = shoe.getAttribute('src');
      prevShoe.setAttribute('src', src);
      shoe.setAttribute('src', prevSrc);
    });
  });

  gradients.style.background = primary;
  prevColor = color;

  setTimeout(() => {
    animationEnd = true;
  }, 500);
}

sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(color => color.addEventListener('click', changeColor));

function changeHeight() { 
  let shoeHeight = shoes[0].offsetHeight; 
  shoeBg.style.height = `${shoeHeight * 0.9}px`;
}

changeHeight(); 
window.addEventListener('resize', changeHeight);

shoes.forEach(shoe => shoe.addEventListener('click', function() {
  const color = this.getAttribute('color');
  shoeBg.style.backgroundColor = color;
  shoeBg.style.backgroundImage = `url(${this.getAttribute('src')})`;
  animationEnd = true;
}));
