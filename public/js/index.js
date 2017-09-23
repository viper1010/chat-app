
  var socket = io();

  socket.on('connect',  function () {
    console.log('Connected to server.');
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from the Server....');
  });

  socket.on('newMessage', function(newMessage){
    console.log('New message = ', newMessage);

    var formattedTime = moment(newMessage.createdAt).format('h:mm a');

    var li = jQuery('<li></li>');
    li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);

    jQuery('#message-list').append(li);
  });

  socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
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

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
      from: 'User',
      text: messageTextBox.val()
    }, function(data){
      console.log('Response from Server: ', data);
      messageTextBox.val('');
    })
  });

  var locationButton = jQuery('#send-location');
  locationButton.on('click', function(){
    if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitute: position.coords.longitude
        });
        console.log(position);
    }, function(){
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch location.')
    })

  });
