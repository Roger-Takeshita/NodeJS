const express = require('express');

const app = express();

require('./config/database');

app.use(express.json());

app.use('/users', require('./routes/user'));
app.use('/tasks', require('./routes/task'));

module.exports = app;
