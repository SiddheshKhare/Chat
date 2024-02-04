const socket =io("/");

const chatelement = document.getElementById('chat');
const messtosend = document.getElementById('message');

function append(mess, cls, cls2) {
    const tag = document.createElement('div');
    tag.innerText = mess;
    tag.classList.add(cls);
    tag.classList.add(cls2);
    chatelement.append(tag);
}

const name = prompt("What is The name you wish to join as?");
if (name == "") {
    window.location.reload()    
}

socket.emit("new-user-joined", name);

submit = () => {
    message_to_send = messtosend.value
    socket.emit('send', message_to_send);
    append(`You: ${message_to_send}`,'sent','chat')
    messtosend.value = '';
}

socket.on("user-joined", data=>{
    console.log(data);
    append(`${data} joined the chat`,'recived', 'message');
})

socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`,'recived','chat');
})

socket.on('user-left', data => {
    append(`${data} left the chat`, 'recived','message')
})