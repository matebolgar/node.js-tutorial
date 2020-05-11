const state = {
  cars: [],
  selectedCarId: '',
};

window.onload = fetchAndRenderCars;

document.getElementById('create-car-component').onsubmit = async function (event) {
  event.preventDefault();
  const name = event.target.elements.name.value;
  const licenseNumber = event.target.elements.licenseNumber.value;
  const hourlyRate = parseFloat(event.target.elements.hourlyRate.value);

await fetch('/cars', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      licenseNumber: licenseNumber,
      hourlyRate: hourlyRate,
    }),
  });
  fetchAndRenderCars();
};

async function fetchAndRenderCars() {
  document.getElementById('car-list-component').innerHTML = `
                <div class="spinner-border m-auto" role="status">
                  <span class="sr-only">Loading...</span>
                </div>`;
  let cars;
  try {
    cars = await fetch('/cars').then((res) => (res.ok ? res.json() : Promise.reject()));
  } catch (e) {
    alert('Szerver hiba');
    return;
  }

  state.cars = cars;
  renderCars();
}

function renderCars() {
  let carsHTML = '';
  for (const car of state.cars) {
    carsHTML += `
        <li class="list-group-item cursor-pointer car-list-item ${state.selectedCarId === car._id ? 'active' : ''}" 
            data-carid="${car._id}"
        >
                <p>${car.name}</p>
                <p>${car.licenseNumber}</p>
                <p>${car.hourlyRate}</p>
        </li>
        `;
  }

  document.getElementById('car-list-component').innerHTML = `
      <ul
      class="list-group border"
      style="height: calc(100vh - 250px); overflow-y: scroll;"
      >
          ${carsHTML}
      </ul>
  `;

  const listItems = document.querySelectorAll('.car-list-item');
  for (const item of listItems) {
    item.onclick = function (event) {
      const listItem = event.target.closest('.car-list-item');

      const id = listItem.dataset.carid;
      const foundCarById = state.cars.find((car) => car._id === id);
      state.selectedCarId = id;
      renderTrips(foundCarById);
      Array.from(document.querySelectorAll('.car-list-item')).forEach((el) => {
        if (el.dataset.carid === state.selectedCarId) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    };
  }
}

function renderTrips(car) {
  document.getElementById('trip-list-component').innerHTML = `
        <h3>Trips:</h3>
        <ul style="height: calc(100vh - 250px); overflow-y: scroll;">
          ${car.trips.reduce(
            (aggregatedTemplate, trip) =>
              aggregatedTemplate +
              `
                <li class="list-group-item">
                    <h3>${moment(trip.date * 1000).format('YYYY-MM-DD, h:mm a')}</h3>
                    <p>${trip.numberOfMinutes}</p>
                </li>
            `,
            ''
          )}
          <li class="list-group-item">
              <form id="create-trip">
              <label class="w-100">
                  Menetidő (perc):
                  <input
                  type="number"
                  name="numberOfMinutes"
                  class="form-control"
                  />
              </label>
              <button class="btn btn-outline-success">Mentés</button>
              </form>
          </li>
        </ul>
    `;

  document.getElementById('create-trip').onsubmit = async function (event) {
    event.preventDefault();
    const numberOfMinutes = event.target.elements.numberOfMinutes.value;
    await fetch('/trips', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        numberOfMinutes: numberOfMinutes,
        carId: state.selectedCarId,
      }),
    });

    await fetchAndRenderCars();
    event.target.reset();
    const foundCarById = state.cars.find((car) => car._id === state.selectedCarId);
    renderTrips(foundCarById);
  };
}
