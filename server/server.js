const io = require("socket.io")(8000, {
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ["GET", "POST"]
    }
});

const online_users = {}

io.on('connection', (socket) => {
    socket.on('new-user-joined', (name, time) => {
        online_users[socket.id] = name
        socket.broadcast.emit('user-joined', {name: name, time: time})
    })

    socket.on('send', (message, time) => {
        socket.broadcast.emit('receive', online_users[socket.id], {message: message, time: time})
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', online_users[socket.id], new Date().toLocaleTimeString())
        delete online_users[socket.id]
    })
})