'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////

//smooth Scrolling

const btnScorllTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScorllTo.addEventListener('click', function (e) {
  const s1codes = section1.getBoundingClientRect();
  // console.log(s1coodes);
  // window.scrollTo({
  //   left: s1codes.left + window.pageXOffset,
  //   top: s1codes.top + window.pageYOffset,
  //   behaviour: 'smooth',
  // });
  section1.scrollIntoView({ behaviour: 'smooth' });
});

////Evenet Delegation///

// 1.add eventListener to common parent element
// 2.Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behaviour: 'smooth' });
  }
});

///////////////////////////////////////
//Tabbed component//
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Gard class
  if (!clicked) return;

  //tabs moving
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //active tab
  clicked.classList.add('operations__tab--active');

  //active content area
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////
//Pass arguments in EvetHandlers//////
const nav = document.querySelector('.nav');
const handHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseout', handHover.bind(0.5));
nav.addEventListener('mouseout', handHover.bind(1));
///////////////////////////////
//Stciky navigatio//
const header = document.querySelector('.header');
const navigator = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (entry.isIntersecting) {
    nav.classList.add('sticky');
  }
  // } else {
  //   nav.classList.remove('sticky');
  // }
};
const hederObderver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navigator}px`,
});
hederObderver.observe(section1);
///////////////////////////////

//Ravealing  Elements on scroll using IntresectionOnsderver
const allSections = document.querySelectorAll('.section');

const revelScetion = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObderver = new IntersectionObserver(revelScetion, {
  rooot: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObderver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////
// Image loading
const imageTarget = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '+200px',
});
imageTarget.forEach(function (img) {
  imageObserver.observe(img);
});

///////////////////////////////
//Building slider///

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curslider = 0;
const maxSlider = slides.length;
// const slider = document.querySelector('.slider');
// slider.style.trasform = `scale(0.4) translatx(-800px)`;
// slider.style.overflow = 'visible';

//goto slide
const gotoSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curslider)}%)`)
  );
};
gotoSlide(0);
//Next slider
const nextSlide = function () {
  if (curslider === maxSlider - 1) {
    curslider = 0;
  } else {
    curslider++;
  }
  gotoSlide(curslider);
  activateDot(curslider);
};
const prevSlide = function () {
  if (curslider === 0) {
    curslider === maxSlider - 1;
  } else {
    curslider--;
  }
  gotoSlide(curslider);
  activateDot(curslider);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
///////////////////////////////
//Arraow keys
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
//circular Dots
const dots = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (_, i) {
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class ="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"`)
    .classList.add('dots__dot--active');
};
activateDot(0);

dots.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activateDot(slide);
  }
});

