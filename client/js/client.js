// Get the server IO object
const socket = io('http://localhost:8000')

// Get username
let userName = prompt('Enter your name to connect to te server :')

// Get document elements
const title = document.getElementById('title')
const chat = document.querySelector('.chat-section')
const form = document.getElementById('send-form')
const input = document.getElementById('messageInput')

if (userName != null) {
    title.innerText = userName
}

// function to add message to the frontend
const createMessage = (message, position, time) => {
    const element = document.createElement('div')
    element.innerHTML = message + `<sub class='time'>${time}</sub>`
    element.classList.add("message")
    element.classList.add(position)
    chat.append(element)
}

// trigger "new-user-joined" event 
let time = new Date().toLocaleTimeString()
socket.emit('new-user-joined', { name: userName, time: time })

// listen to "user-joined" event
socket.on('user-joined', (data) => {
    createMessage(`${data.name} joined the chat`, 'left', data.time)
})

// listen to "receive" event
socket.on('receive', (data) => {
    createMessage(`${data.name}: ${data.message}`, 'left', data.time)
})

// form listener
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = input.value
    time = new Date().toLocaleTimeString()
    createMessage(`You: ${message}`, 'right', time)
    input.value = ""

    // trigger "send" event
    socket.emit('send', { message: message, time: time })
})

// listen to "left" event
socket.on('left', (data) => {
    createMessage(`${data.name} left the chat`, 'left', data.time)
})