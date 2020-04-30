const express = require('express');
const path = require('path');
const hbs = require('hbs');
const http = require('http');
const socketio = require('socket.io');
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));

let count = 0;
//! Listening for users to connect
io.on('connection', (socket) => {
    console.log('New Wesocket Connection');
    socket.emit('countUpdate', count);
    socket.on('increment', () => {
        count++;
        io.emit('countUpdate', count);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
