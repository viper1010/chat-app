require('./config/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../public');
console.log('Public Path - ', publicPath);

let app = express();
let port = process.env.PORT;

app.use(express.static(publicPath));
app.use(bodyParser.json());



app.listen(port, ()=>{
  console.log('Chat App started at port - ', port);
});
