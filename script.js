window.onscroll = function() {toggleNavbar()};

const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;  // Posição da barra no topo

function toggleNavbar() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("fixed");  // Adiciona 'fixed' quando rolar
  } else {
    navbar.classList.remove("fixed");  // Remove 'fixed' quando voltar ao topo
  }
}

const menuToggle = document.querySelector('.fa-bars');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});

function showStep(step) {
  var stepContent = document.getElementById('step-' + step);

  if (!stepContent.classList.contains('active')) {
      var steps = document.querySelectorAll('.step');
      steps[step - 1].classList.add('active');

      stepContent.classList.add('active');
  }
}

// Show the first step content by default
document.getElementById('step-1').classList.add('active');

let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide img");
const dots = document.querySelectorAll(".dot");

function showSlides(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
    updateDots();
}

function moveSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides(slideIndex);
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndex].classList.add("active");
}

// Inicia o carrossel automaticamente
let autoSlide = setInterval(() => moveSlide(1), 4000);

// Pausa o carrossel ao clicar nos botões
document.querySelector('.prev').addEventListener('click', () => clearInterval(autoSlide));
document.querySelector('.next').addEventListener('click', () => clearInterval(autoSlide));

// Exibe o primeiro slide ao carregar a página
showSlides(slideIndex);
