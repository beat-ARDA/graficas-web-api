const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let users = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socketIO.emit('socketId', socket.id);

    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });

    socket.on('newUser', (data) => {
        users.push(data);
        socketIO.emit('newUserResponse', users);
    });

    socket.on('moveLeft', (socketId) => {
        console.log('🤛 moveLeft: ' + socketId);
        socketIO.emit('moveLeft', socketId);
    });

    socket.on('moveLeaveLeft', (socketId) => {
        console.log('🛅  moveLeaveLeft: ' + socketId);
        socketIO.emit('moveLeaveLeft', socketId);
    });

    socket.on('moveRight', (socketId) => {
        console.log('🤜 moveRight' + socketId);
        socketIO.emit('moveRight', socketId);
    });

    socket.on('moveUp', (socketId) => {
        console.log('🔺  moveUp' + socketId);
        socketIO.emit('moveUp', socketId);
    });

    socket.on('moveDown', (socketId) => {
        console.log('🔻  moveDown' + socketId);
        socketIO.emit('moveDown', socketId);
    });

    socket.on('moveLeaveUp', (socketId) => {
        console.log('🔼  moveLeaveUp' + socketId);
        socketIO.emit('moveLeaveUp', socketId);
    });

    socket.on('moveLeaveDown', (socketId) => {
        console.log('🔽  moveLeaveDown' + socketId);
        socketIO.emit('moveLeaveDown', socketId);
    });

    socket.on('moveLeaveRight', (socketId) => {
        console.log('🔎  moveLeaveRight' + socketId);
        socketIO.emit('moveLeaveRight', socketId);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter((user) => user.socketID !== socket.id);
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

