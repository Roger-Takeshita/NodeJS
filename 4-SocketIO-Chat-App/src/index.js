const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/user');
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));

//! Listening for users to connect
io.on('connection', (socket) => {
    console.log('New Wesocket Connection');

    //+ acknowledgements, callback to send status
    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room });

        if (error) return callback(error);
        socket.join(user.room);
        socket.emit('message', generateMessage(user.username, 'Welcome'));
        socket.broadcast
            .to(user.room)
            .emit('message', generateMessage(user.username, `${user.username} has joined`));
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter();
        if (filter.isProfane(message)) return callback('Profanity is not allowed');
        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit(
            'locationMessage',
            generateLocationMessage(
                user.username,
                `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
            )
        );
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage(user.username, `${user.username} has left`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
