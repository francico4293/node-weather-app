const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#error');
const locationMessage = document.querySelector('#location');
const forecastMessage = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    errorMessage.textContent = '';
    locationMessage.textContent = 'Loading...';
    forecastMessage.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then(data => {
            if (data.error) {
                return errorMessage.textContent = data.error;
            }
            locationMessage.textContent = data.location + ':';
            forecastMessage.textContent = data.forecast;
        })
    });
});