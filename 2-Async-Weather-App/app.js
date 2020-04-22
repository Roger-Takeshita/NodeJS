const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const city = process.argv[2];

if (!city) return console.log('Provide a city');

geocode(city, (err, { latitude, longitude, location }) => {
    if (err) return console.log('Error', err);
    forecast(latitude, longitude, (err, { temperature, feelslike }) => {
        if (err) return console.log('Error', err);
        console.log(
            `It's currently ${temperature} degress out. It feels like ${feelslike} degress out. In ${location}`
        );
    });
});
