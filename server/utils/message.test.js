const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', ()=> {

  it('should generate correct message', ()=>{
    var from = 'Andy';
    var text = 'Welcome to World';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });
  });
})
