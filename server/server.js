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

  socket.on('disconnect', ()=>{
    console.log('User is disconnected.')
  })
});

server.listen(port, ()=>{
  console.log('Chat App started at port - ', port);
});
