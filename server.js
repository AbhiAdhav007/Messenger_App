//import Express
const express = require('express');

const app = express();

// making server from http and express
const server = require('http').Server(app);


//it will pick index.html and load on browser
app.use(express.static('public'));


//intergrating server with sockett io
const io = require('socket.io')(server);

// server is having io
io.on('connection' , (socket)=>{
    console.log('connection established', socket.id);

     //socketA -> io -> socketB
    //socketA user is triggering a message event
    socket.on('message' , (data)=>{
        io.emit('message' , data); //emitting this msg
        //to all other sockets 
    })
    //showing off that user left the chat
    socket.on('disconnect',()=>{
        console.log(socket.id ,'->left the chat')
    })
});

const PORT = 8081;

server.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`);
})

