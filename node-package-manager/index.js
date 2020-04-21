const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
 
app.get('/', function (req, res) {
  console.log(req.query);
  res.sendFile(path.join(__dirname, 'home.html'));
});

  /*
      Request:
        QUERY PARAMÉTEREK pl http://localhost:8080/<path>?isInStock=1&priceLessThan=10000
        BODY
    */

// middleware
function loggerMiddleware(req, res, next) {
  console.log(req.url);
  req.valami = 1;
  next()
}

// middleware chain
app.post('/products', loggerMiddleware, bodyParser.urlencoded({extended: true}), function (req, res) {
    console.log(req.body);
    console.log(req.valami);
});


 
app.listen(3000);