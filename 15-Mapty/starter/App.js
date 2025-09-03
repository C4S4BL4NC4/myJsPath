import Running from './models/Running.js';
import Cycling from './models/Cycling.js';

export default class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoom = 13;
  #selectedWorkout;

  constructor(
    form,
    containerWorkouts,
    inputType,
    inputDistance,
    inputDuration,
    inputCadence,
    inputElevation,
    editButton,
    deleteButton,
    sortButton,
    purgeButton,
    buttonsContainer
  ) {
    this.form = form;
    this.containerWorkouts = containerWorkouts;
    this.inputType = inputType;
    this.inputDistance = inputDistance;
    this.inputDuration = inputDuration;
    this.inputCadence = inputCadence;
    this.inputElevation = inputElevation;
    this.editButton = editButton;
    this.deleteButton = deleteButton;
    this.sortButton = sortButton;
    this.purgeButton = purgeButton;
    this.buttonsContainer = buttonsContainer;

    this._getPosition();
    this._getLocalStorage();

    // Event handlers
    this.form.addEventListener('submit', this._newWorkout.bind(this));
    this.inputType.addEventListener(
      'change',
      this._toggleElevationField.bind(this)
    );
    this.containerWorkouts.addEventListener(
      'click',
      this._moveToPopup.bind(this)
    );
    this.editButton.addEventListener('click', this._editWorkout.bind(this));
    this.deleteButton.addEventListener('click', this._deleteWorkout.bind(this));
    this.sortButton.addEventListener('click', this._sortWorkout.bind(this));

    this.purgeButton.addEventListener('click', this.reset.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),

        function () {
          alert('Check your internet access');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach(work => this._renderWorkoutMarker(work));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    this.form.classList.remove('hidden');
    this.inputDistance.focus();
  }

  _hideForm() {
    // Empty input fields
    this.inputDistance.value =
      this.inputDuration.value =
      this.inputCadence.value =
      this.inputElevation.value =
        '';
    this.form.style.display = 'none';
    this.form.classList.add('hidden');
    setTimeout(() => (this.form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    this.inputElevation
      .closest('.form__row')
      .classList.toggle('form__row--hidden');
    this.inputCadence
      .closest('.form__row')
      .classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    const type = this.inputType.value;
    const distance = +this.inputDistance.value;
    const duration = +this.inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    if (type === 'running') {
      const cadence = +this.inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs must be positive numbers.');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevation = +this.inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Distance and duration must be positive numbers.');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    this.#workouts.push(workout);
    this._renderWorkoutMarker(workout);
    this._renderWorkout(workout);
    this._hideForm();
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon" title="${
            workout.type === 'running' ? 'Running' : 'Cycling'
          }">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon" title="Duration">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
          </div>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon" title="Speed">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon" title="Steps">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon" title="Speed">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon" title="Elevation">⛰</span>
          <span class="workout__value">${workout.elevation}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;

    this.form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workout = this._selectWorkout(e);
    if (!workout || !this.#map) return;
    this.#map.setView(workout.coords, this.#mapZoom, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    this.buttonsContainer.classList.remove('inactive');
  }

  _selectWorkout(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    console.log(workoutEl);
    this.#selectedWorkout = workout;
    return workout;
  }

  _editWorkout() {
    console.log('edit');
    const workout = this.#selectedWorkout;
    if (!workout) return;
    console.log(workout);
  }
  _sortWorkout() {
    console.log('sort');
  }

  _deleteWorkout() {
    console.log('delete');
    const element = document.getElementsByClassName('workout');

    console.log(element);

    // Remove HTML workout containers
    // Remove Marker
    // Remove workout from storage
    // Update UI

    this.#selectedWorkout = {};
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => this._renderWorkout(work));
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}
