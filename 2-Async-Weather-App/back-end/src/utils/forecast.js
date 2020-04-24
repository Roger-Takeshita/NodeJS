const request = require('request');
require('dotenv').config();
class Options {
    constructor(url) {
        this.url = url;
        this.json = true;
    }
}

const forecast = (latitude, longitude, callback) => {
    const WEATHER_URL = `http://api.weatherstack.com/current?access_key=${process.env.API_WEATHER_KEY}&query=${latitude},${longitude}`;

    request(new Options(WEATHER_URL), (err, { body: { error, current } }) => {
        if (err) return callback('Unable to connect to location services!');
        if (error) return callback('Unable to find location, try another search');
        callback(undefined, {
            temperature: current.temperature,
            feelslike: current.feelslike
        });
    });
};

module.exports = forecast;
