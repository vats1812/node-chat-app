const socket = io('http://localhost:7000');

const form = document.getElementById('send-cont');
const messageInput = document.getElementById('messageInp');
const messageCont = document.querySelector('.container');
const append = (message, position) => {
    const joined = document.createElement('div');
    joined.innerText = message;
    joined.classList.add('message');
    joined.classList.add(position);
    messageCont.append(joined);
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
    scrollToBottom()
});

const name = prompt("Enter your name");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'center');
    scrollToBottom()
})

socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left');
    scrollToBottom()
})

socket.on('left', name => {
    append(`${name} left the chat`, 'center');
    scrollToBottom()
})

function scrollToBottom() {
    messageCont.scrollTop = messageCont.scrollHeight;
}