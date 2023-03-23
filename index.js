const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

let users = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('moveLeft', () => {
        socket.broadcast.emit('moveLeft');
    });

    socket.on('moveRight', () => {
        socket.broadcast.emit('moveRight');
    });

    socket.on('moveUp', () => {
        socket.broadcast.emit('moveUp');
    });

    socket.on('moveDown', () => {
        socket.broadcast.emit('moveDown');
    });

    socket.on('moveLeaveUp', () => {
        socket.broadcast.emit('moveLeaveUp');
    });

    socket.on('moveLeaveDown', () => {
        socket.broadcast.emit('moveLeaveDown');
    });

    socket.on('shoot', () => {
        socket.broadcast.emit('shoot');
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        socket.broadcast.emit('newUserResponse', users);
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

