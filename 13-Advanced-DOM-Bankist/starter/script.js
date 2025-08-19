'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});
// Test Commit
//////////////////////////////////
//
//
// --------Page Navigation--------

// Inefficient

/*
document.querySelectorAll('.nav__link').forEach(function (elm) {
  elm.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// Efficient (Event Delegation)
// 1. addEventListner to comomon parent element i.e nav__links
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//
//
//
//////////////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// // Selecting elements:

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons); // Returns an HTML collection (changes dynamically)

// console.log(document.getElementsByClassName('btn')); // also returns html collection

// Creating and inserting elements

// .insertAdjacentHTML ** TO ADD ELEMENTS VERY USEFUL

// const message = document.createElement('div'); // This is not in the page its a dom element to be inserted into the page.

// its like when we queryselect its from (page -> code). when createElement (code -> page)

// To add a class
// message.classList.add('cookie-message');

// To Change text of element
// message.textContent = 'We use cookies for improved functionality and analytics';

// To insert HTML
/* message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it </button>'; 
  */

// Append on top as a first child
//header.prepend(message);

// Append as a last child
// header.prepend(message);
//header.append(message.cloneNode(true));

// We can use append and prepend to move elements

//header.before(message); // insert before the header elm

//header.after(message); // insert after header elm

// To Delete Elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });

// // Styles, attributes and classes

// // Styles

// // To set a style on element (inline styles)
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height); // Doesn't return anything because its not an inline style.

// console.log(message.style.backgroundColor); // rgb(55, 56, 61) set above as an inline style

// // To get a style inline or not
// console.log(getComputedStyle(message).height); // 171px (fun fact I get 0px because some cookie addon is removing the bar completely. Regardless, I get a result in some other browsers that has no addons)

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// // CSS variables/property
// // document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes

// const logo = document.querySelector('.nav__logo');
// // Standard Attributes
// console.log(logo.alt); // Bankist logo
// console.log(logo.src); // Absolute Path
// console.log(logo.className);
// // Custom attributes are not added automatically because they are not standard properties

// // Non-standard
// console.log(logo.designer); // undefined

// console.log(logo.getAttribute('designer')); // Jonas

// // Set attribs

// logo.alt = 'Swag like ohio';
// console.log(logo.designer);

// logo.setAttribute('company', 'Bankist');

// console.log(logo.getAttribute('src')); // Relative path

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // Absulote Path
// console.log(link.getAttribute('href')); // Relative Path

// // // Data Attributes (has to start with data in the HTML)

// // console.log(logo.dataset.versionNumber); // 3

// // // Classes
// // logo.classList.add('c', 'j');
// // logo.classList.remove('c', 'j');
// // logo.classList.toggle('c', 'j');
// // logo.classList.contains('c', 'j');

// // // Don't use because it will overwrite the entire class
// // // logo.className = 'Jonas';

// const btnScrollTo = document.querySelector('.btn--scroll-to');

// const section1 = document.querySelector('#section--1');

//btnScrollTo.addEventListener('click', function (e) {
// const s1coords = section1.getBoundingClientRect();

// console.log(s1coords);
// // console.log(e.target.getBoundingClientRect());
// console.log(
//   `Window Current XY Scroll offsets: ${window.pageXOffset} / ${window.pageYOffset}`
// );
// console.log(
//   `Client height/width viewport: ${document.documentElement.clientHeight} ${document.documentElement.clientWidth}`
// );

// Scrolling

// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.pageYOffset
// )

// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

// Newschool to do it

// section1.scrollIntoView({ behavior: 'smooth' });
//});

// Events: An event is a signal generated by a DOMNode

// const h1 = document.querySelector('h1');

// const alerth1 = function (e) {
//   alert('Skibidi');
//   h1.removeEventListener('mouseenter', alerth1);
// };

// h1.addEventListener('mouseenter', alerth1);

// // h1.onmouseenter = alerth1;

// Event Propagation: Capturing, Targeting, Bubbling

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1 + min));
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//

//  An event first move from root down to capturing the target then starts to bubble back up to the root triggering the parent handlers on its way.

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('Link');
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('Link');
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log('Link');
// });

// To stop event propagation
// inside the event block put
// e.stopPropagation();
// in general its not a good idea to stop propagation like this

// Capture Phase Listening: Event handlers only listen to events in bubble phase (Default Behaviour) To listen to events in capture phase we need a third parameter in addEventListner('click', function(e){}, ture) true = use capture Traveling order revrses from top to bottom because its in capture phase top-down, unlike bubbling down-up.

// Event Delegation
// Test2

// const h1 = document.querySelector('h1');

// // Going Downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going Upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var (--gradient-secondary)'; // USED ALOT FOR EVENT DELEGATION if no close elm exist return itself
// // Opposite of querySelector finds children while closest finds parents no matter how far up in dom tree

// // Going Sideways: siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5';
// });

// Tabbed Components

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB'))); // BAD PRACTICE

// EVENT DELEGATION
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause

  if (!clicked) return;

  // Remove Active Classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate Content Area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Passing Arguments to event handlers

// Menu fade animations
const handleHover = function (e) {
  console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5)); // mouseover X mouseout (bubbles)

nav.addEventListener('mouseout', handleHover.bind(1)); // mouseover X mouseout (bubbles)
