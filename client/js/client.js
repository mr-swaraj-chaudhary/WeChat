const socket = io('http://localhost:8000')

let userName = prompt('Enter your name to connect to te server :')
const title = document.getElementById('title')
const chat = document.querySelector('.chat-section')
const form = document.getElementById('send-form')
const input = document.getElementById('messageInput')

if (userName != null) {
    title.innerText = userName
}

const createMessage = (message, position, time) => {
    const element = document.createElement('div')
    element.innerHTML = message + `<sub class='time'>${time}</sub>`
    element.classList.add("message")
    element.classList.add(position)
    chat.append(element)
}

let time = new Date().toLocaleTimeString()
socket.emit('new-user-joined', { name: userName, time: time })

socket.on('user-joined', (data) => {
    createMessage(`${data.name} joined the chat`, 'left', data.time)
})

socket.on('receive', (data) => {
    createMessage(`${data.name}: ${data.message}`, 'left', data.time)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = input.value
    time = new Date().toLocaleTimeString()
    createMessage(`You: ${message}`, 'right', time)
    socket.emit('send', { message: message, time: time })
    input.value = ""
})

socket.on('left', (data) => {
    createMessage(`${data.name} left the chat`, 'left', data.time)
})