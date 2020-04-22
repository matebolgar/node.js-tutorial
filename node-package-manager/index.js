const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
 
app.get('/', function (req, res) {
  res.send('Hello World 123 123');
});

 
app.listen(3000);