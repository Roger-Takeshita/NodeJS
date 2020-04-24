console.log('Client side is loading');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) => {
        response.json().then(({ error, location, forecast }) => {
            if (error) {
                messageOne.textContent = error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = location;
                messageTwo.textContent = `The temperature now is ${forecast.temperature} and feels like ${forecast.feelslike}`;
            }
        });
    });
});
