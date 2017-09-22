
  var socket = io();

  socket.on('connect',  function () {
    console.log('Connected to server.');
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from the Server....');
  });

  socket.on('newMessage', function(newMessage){
    console.log('New message = ', newMessage);
  });
