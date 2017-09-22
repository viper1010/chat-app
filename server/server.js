require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
console.log('Public Path - ', publicPath);

let app = express();
let port = process.env.PORT;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
app.use(bodyParser.json());

io.on('connection', (socket)=>{
  console.log('New User Connected');

  // Send a message to "this socket" - the one that connected
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the Chat App',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User Joined.',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message)=>{
    console.log('New message received - ', message);

    // SENDS to Everyone connected
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // Send to everyone except "this socket"
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', ()=>{
    console.log('User is disconnected.')
  })
});

server.listen(port, ()=>{
  console.log('Chat App started at port - ', port);
});
