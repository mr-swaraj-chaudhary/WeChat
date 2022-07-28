const io = require("socket.io")(8000, {
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ["GET", "POST"]
    }
});

const online_users = {}

io.on('connection', (socket) => {
    socket.on('new-user-joined', (data) => {
        online_users[socket.id] = data.name
        socket.broadcast.emit('user-joined', {name: data.name, time: data.time})
    })

    socket.on('send', (data) => {
        socket.broadcast.emit('receive', {name: online_users[socket.id], message: data.message, time: data.time})
    })

    socket.on('disconnect', () => {
        const time = new Date().toLocaleTimeString()
        socket.broadcast.emit('left', {name: online_users[socket.id], time: time})
        delete online_users[socket.id]
    })
})