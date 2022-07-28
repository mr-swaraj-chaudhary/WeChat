const io = require("socket.io")(8000, {
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ["GET", "POST"]
    }
});

const online_users = {}

io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
        online_users[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { name: online_users[socket.id], message: message })
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', online_users[socket.id])
        delete online_users[socket.id]
    })
})