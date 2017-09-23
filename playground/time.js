const moment = require('moment');

let date = moment();

date.add(100, 'years').subtract(9, 'month');
console.log(date.format('MMM Do YYYY'));

let date2 = moment();
console.log(date2.format('h:mm a'));
