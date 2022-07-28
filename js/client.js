const socket = io('http://localhost:8000')

let userName = prompt("Enter your name to connect to te server :")
socket.emit('new-user-joined', userName)