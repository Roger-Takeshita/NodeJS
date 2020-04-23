const express = require('express');
const path = require('path');
const hbs = require('hbs'); //! To load the partials

const app = express();
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));

app.use('', require('./routes/weather'));

app.get('*', (req, res) => {
    res.render('404', { title: '404', message: 'Page not found', name: 'Roger Takeshita' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
