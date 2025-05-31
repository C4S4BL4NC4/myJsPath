'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelectorAll('.show-modal');

// Why do we need a for loop for that?
// Loop through buttons and attach a listner to the queue

for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener('click', function () {
    console.log('Open Clicked!');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });

  btnCloseModal.addEventListener('click', function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  });
}

// Keypressed

document.addEventListener('keypress', function (e) {
  console.log('Keypressed!');
  console.log(e.key);
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
    }
  }
});
