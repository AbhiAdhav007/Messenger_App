const socket = io();

let username ='';

document.getElementById("join-btn").addEventListener("click",(event)=>{

    //The form tag has auto refresh behaviour by default but we don't want that so that we prevent that action  
    event.preventDefault();
    username = document.getElementById('username-input').value;
    username = username.trim();

    if(username !==''){
        document.querySelector('.form-username').style.display = 'none';
        document.querySelector('.chat-container').style.display = 'block';
    }
})

document.getElementById("sent-btn").addEventListener('click' , (event)=>{
    event.preventDefault();

    const data = {
        username : username,
        message : document.getElementById('msg-input').value
    }
    

    // if 'io' is emitting anything 'sockets' can listen
    // if socket is emitting anything only io can listen 
    // sending message to io
    socket.emit('message' , data);
    //it is sending message we need to add this msg to send side
    //whatever msg i am sending to server i want to show that msg on UI
    addMessageFn(data);
})

//reciving the message
socket.on('message' , (data)=>{
    if (data.username !== username) {
        addMessageFnRe(data);
    }
})

function addMessageFn(data){

    var msgDiv = document.createElement('div')
    console.log(data);
    msgDiv.innerText = `${data.username} : ${data.message}`;
    msgDiv.setAttribute('id' , 'sent'); 
    msgDiv.setAttribute('class' , "message");
    document.getElementById('messages').append(msgDiv);
    document.getElementById('msg-input').value='';
}

function addMessageFnRe(data){

    var msgDiv = document.createElement('div')
    msgDiv.innerText = `${data.username} : ${data.message}`
    msgDiv.setAttribute('id' , 'recived'); 
    msgDiv.setAttribute('class' , "message");
    document.getElementById('messages').append(msgDiv);
    document.getElementById('msg-input').value='';
}

