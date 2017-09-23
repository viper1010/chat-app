const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=> {

  it('should generate correct message', ()=>{
    var from = 'Andy';
    var text = 'Welcome to World';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });
  });
});

describe('generateLocationMessage', ()=>{

  it('should generate correct Google Api request', ()=>{
    let from = 'John';
    let lat = 15;
    let long = 20;
    let url = `https://www.google.com/maps/?q=${lat},${long}`

    var message = generateLocationMessage(from, lat, long);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, url });

  });

});
