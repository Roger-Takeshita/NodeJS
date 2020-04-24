const express = require('express');
const router = express.Router();
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

router.get('', (req, res) => {
    res.render('index', { title: 'Weather', name: 'Roger Takeshita' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About', name: 'Roger Takeshita' });
});

router.get('/help', (req, res) => {
    res.render('help', { helpText: 'This is some helpful text.', title: 'Help', name: 'Roger Takeshita' });
});

router.get('/help/*', (req, res) => {
    res.render('404', { title: '404', message: 'Helper page not found', name: 'Roger Takeshita' });
});

router.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({ error: 'Your must provide an address' });
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({ error });
            res.send({ forecast: forecastData, address: req.query.address, location });
        });
    });
});

module.exports = router;
