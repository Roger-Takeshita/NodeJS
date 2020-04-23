const express = require('express');
const router = express.Router();

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

module.exports = router;
