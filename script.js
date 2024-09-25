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

// Show the first step content by default
function showStep(step) {
  // Remove active class from all steps
  var steps = document.querySelectorAll('.step');
  steps.forEach(function (stepItem) {
      stepItem.classList.remove('active');
  });

  // Hide all content sections
  var contents = document.querySelectorAll('.content');
  contents.forEach(function (contentItem) {
      contentItem.classList.remove('active');
  });

  // Add active class to the current step and show the corresponding content
  document.querySelector('.step:nth-child(' + step + ')').classList.add('active');
  document.getElementById('step-' + step).classList.add('active');
}

const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0, animationID, currentIndex = 0;
const totalItems = carousel.children.length;

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mouseup', dragEnd);
carousel.addEventListener('mouseleave', dragEnd);
carousel.addEventListener('touchend', dragEnd);

carousel.addEventListener('mousemove', dragMove);
carousel.addEventListener('touchmove', dragMove);

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    // Se estiver na primeira imagem, vai para a última
    currentIndex = totalItems - 1;
  }
  setPositionByIndex();
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < totalItems - 1) {
    currentIndex++;
  } else {
    // Se estiver na última imagem, volta para a primeira
    currentIndex = 0;
  }
  setPositionByIndex();
});

function dragStart(e) {
  isDragging = true;
  startPos = getPositionX(e);
  animationID = requestAnimationFrame(animation);
  carousel.style.cursor = 'grabbing';
}

function dragEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100 && currentIndex < totalItems - 1) {
    currentIndex++;
  } else if (movedBy > 100 && currentIndex > 0) {
    currentIndex--;
  }
  setPositionByIndex();
  carousel.style.cursor = 'grab';
}

function dragMove(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function animation() {
  setCarouselPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setCarouselPosition() {
  carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  // O valor de 620px inclui 600px de largura do item e 10px de margem em cada lado
  currentTranslate = currentIndex * -620;
  prevTranslate = currentTranslate;
  setCarouselPosition();
}

