'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

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

//////////////////////////////////
//

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// Selecting elements:

const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // Returns an HTML collection (changes dynamically)

console.log(document.getElementsByClassName('btn')); // also returns html collection

// Creating and inserting elements

// .insertAdjacentHTML ** TO ADD ELEMENTS VERY USEFUL

const message = document.createElement('div'); // This is not in the page its a dom element to be inserted into the page.

// its like when we queryselect its from (page -> code). when createElement (code -> page)

// To add a class
message.classList.add('cookie-message');

// To Change text of element
// message.textContent = 'We use cookies for improved functionality and analytics';

// To insert HTML
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it </button>';

// Append on top as a first child
//header.prepend(message);

// Append as a last child
header.prepend(message);
//header.append(message.cloneNode(true));

// We can use append and prepend to move elements

//header.before(message); // insert before the header elm

//header.after(message); // insert after header elm

// To Delete Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });
