const https = require('https');
require('dotenv').config();
const address = 'Mississauga';

const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
)}.json?access_token=${process.env.API_MAPBOX_KEY}`;

const request = https.request(MAPBOX_URL, (response) => {
    let data = '';

    //! We receive the data in chunks
    response.on('data', (chunk) => {
        data = data + chunk.toString();
        // console.log(chunk);
    });

    //! After we receive all the chunks we parse as a JSON
    response.on('end', () => {
        console.log(JSON.parse(data));
    });
});

request.on('error', (error) => {
    console.log('An error', error);
});

request.end();
