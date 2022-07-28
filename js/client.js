const socket = io('http://localhost:8000')

let userName = prompt('Enter your name to connect to te server :')
const chat = document.querySelector('.chat-section')
const form = document.getElementById('send-form')
const input = document.getElementById('messageInput')

const createMessage = (message, position) => {
    const element = document.createElement('div')
    element.innerText = message
    element.classList.add("message")
    element.classList.add(position)
    chat.append(element)
}

socket.emit('new-user-joined', userName)

socket.on('user-joined', (name) => {
    createMessage(`${name} joined the chat`, 'left')
})

socket.on('receive', (data) => {
    createMessage(`${data.name}: ${data.message}`, 'left')
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = input.value
    createMessage(`You: ${message}`, 'right')
    socket.emit('send', message)
    input.value = ""
})

socket.on('left', (name) => {
    createMessage(`${name} left the chat`, 'left')
})