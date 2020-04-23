const request = require('request');
require('dotenv').config();

class Options {
    constructor(url) {
        this.url = url;
        this.json = true;
    }
}

const geocode = (address, callback) => {
    const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=${process.env.API_MAPBOX_KEY}`;

    request(new Options(MAPBOX_URL), (err, { body: { features } }) => {
        if (err) return callback('Unable to connect to location services!');
        if (features.length === 0) return callback('Unable to find location, try another search');
        callback(undefined, {
            longitude: features[0].center[0],
            latitude: features[0].center[1],
            location: features[0].place_name
        });
    });
};

module.exports = geocode;
