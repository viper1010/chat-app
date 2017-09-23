
  var socket = io();

  socket.on('connect',  function () {
    console.log('Connected to server.');
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from the Server....');
  });

  socket.on('newMessage', function(newMessage){
    console.log('New message = ', newMessage);

    var li = jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);

    jQuery('#message-list').append(li);
  });

  socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#message-list').append(li);

  })

  // socket.emit('createMessage', {
  //   from: 'Andy',
  //   text: 'Hello'
  // }, function () {
  //   console.log('Got it.')
  // });

  jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
    }, function(data){
      console.log('Response from Server: ', data)
    })
  });

  var locationButton = jQuery('#send-location');
  locationButton.on('click', function(){
    if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitute: position.coords.longitude
        });
        console.log(position);
    }, function(){
      alert('Unable to fetch location.')
    })

  });
