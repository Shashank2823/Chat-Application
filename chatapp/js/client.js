const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form=document.getElementById('form');
const input=document.getElementById('input');
const messageContainer=document.querySelector(".container");

const append=(message, position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const use=(message, position)=>{
    const userMessage=document.createElement('div');
    userMessage.innerText=message;
    userMessage.classList.add(position);
    messageContainer.append(userMessage);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message=input.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    input.value='';
})
const abc=prompt("Enter your name to join");
socket.emit('new-user-joined', abc);

socket.on('user-joined', abc=>{
use(`${abc} joined the chat 😀`,'center')
})

socket.on('receive', data=>{
    append(`${data.abc}: ${data.message}`,'left')
})

socket.on('left', abc=>{
    use(`${abc} left the chat !!!`,'center')
})