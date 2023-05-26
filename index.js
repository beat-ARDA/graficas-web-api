const express = require('express');
const bodyParser = require('body-parser');
const onePlayerRoutes = require('./routes/scoresOnePlayer');
const twoPlayerRoutes = require('./routes/scoresTwoPlayers');
const app = express();
const PORT = process.env.PORT || 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

    users.push(socket.id);

    socketIO.emit('socketId', { "socketId": socket.id, "posUser": users.length });

    if (users.length === 2)
        socketIO.emit('sessionReady');

    socket.on('newUser', (infoUser) => {
        socketIO.emit('newUser', infoUser);
    });

    socket.on('moveLeft', (socketId) => {
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

    socket.on('moveShoot', (socketId) => {
        console.log('🔻  moveShoot' + socketId);
        socketIO.emit('moveShoot', socketId);
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

    socket.on('moveLeaveShoot', (socketId) => {
        console.log('🔎  moveLeaveShoot' + socketId);
        socketIO.emit('moveLeaveShoot', socketId);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected' + users);
        users.splice(users.indexOf(socket.id), 1);
        socket.disconnect();
    });
});

app.use('/api', onePlayerRoutes);
app.use('/api', twoPlayerRoutes);

app.get('/', (req, res) => {
    res.json('datos');
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

