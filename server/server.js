// create an IO object
const io = require("socket.io")(8000, {
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ["GET", "POST"]
    }
});

// create a list of connected users
const online_users = {}

// trigger connection event
io.on('connection', (socket) => {
    // New User Joined Event : update online users & broadcast "joining message" to other users
    socket.on('new-user-joined', (data) => {
        online_users[socket.id] = data.name
        socket.broadcast.emit('user-joined', {name: data.name, time: data.time})
    })

    // Disconnect Event : delete user & broadcast "exit message" to other users
    socket.on('disconnect', () => {
        const time = new Date().toLocaleTimeString()
        socket.broadcast.emit('left', {name: online_users[socket.id], time: time})
        delete online_users[socket.id]
    })

    // Send Event : When the server receives a message, broadcast it to other users
    socket.on('send', (data) => {
        socket.broadcast.emit('receive', {name: online_users[socket.id], message: data.message, time: data.time})
    })
})