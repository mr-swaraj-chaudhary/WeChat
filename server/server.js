const io = require("socket.io")(8000, {
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
        console.log(`${name} joined the chat.`)
    })
})