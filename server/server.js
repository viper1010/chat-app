require('./config/config');
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message')

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
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  socket.on('createMessage', (message)=>{

    // SENDS to Everyone connected
    io.emit('newMessage', generateMessage(message.from, message.text));

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
