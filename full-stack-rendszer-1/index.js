const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {

    // Router
    switch(true) {
        case req.url === '/' && req.method === 'GET':
            fs.readFile('./views/home.html', (err, file) => {
                res.setHeader('content-type', 'text/html');
                res.end(file);
            });
            break;
        case req.url === '/script.js' && req.method === 'GET':
            fs.readFile('./public/script.js', (err, file) => {
                res.setHeader('content-type', 'application/javascript');
                res.end(file);
            });
            break;
        case req.url === '/phones' && req.method === 'GET':
            fs.readFile('./phones.json', (err, file) => {
                res.setHeader('content-type', 'application/json');
                res.end(file);
            });
            break;
        default:   
            res.end('404');    
    }


});


server.listen(3000);