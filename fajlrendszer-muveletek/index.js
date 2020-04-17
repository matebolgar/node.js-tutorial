
// wrapper function
// function(__dirname, __filename, module, require, exports) {


    console.log(__dirname);
    console.log(__filename);

   const add = require('./calculator.js');
   
   console.log(add(2, 3));


   const http = require('http');

   
   
   const server = http.createServer(function (req, res) {

    /*
      Request:
        URL pl http://localhost:8080/<path>
        METHOD pl GET, POST, DELETE, PATCH, PUT
        QUERY PARAMÉTEREK pl http://localhost:8080/<path>?isInStock=1&priceLessThan=10000
        BODY
        HEADER pl "content-type: application/json, authorization: {token}"

      Response:
        HEADER
        BODY
        STATUS pl 200
    */

    const fs = require('fs');

    // Router
    switch(true) {
      case req.url === '/' && req.method === 'GET':
        fs.readFile(__dirname + '/home.html', function (err, data) {
          res.setHeader('content-type', 'text/html; charset=utf-8');
          res.writeHead(200);
          res.end(data);
        })
        break;
      case req.url === '/bejelentkezes' && req.method === 'GET':
        fs.readFile(__dirname + '/login.html', function (err, data) {
          res.setHeader('content-type', 'text/html; charset=utf-8');
          res.writeHead(200);
          res.end(data);
        })
        break;
      default:
        fs.readFile(__dirname + '/404.html', function (err, data) {
          res.setHeader('content-type', 'text/html; charset=utf-8');
          res.writeHead(200);
          res.end(data);
        })
    }

    console.log(req.url);
    console.log(req.method);
    


  });


   server.listen(8080);
   


// }
