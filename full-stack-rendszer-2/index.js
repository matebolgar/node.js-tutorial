const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {

  switch(true) {
    case req.url === '/' && req.method === 'GET':
      fs.readFile('./index.html', (err, file) => {
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
    case req.url === '/telefonok' && req.method === 'GET':
      fs.readFile('./phones.json', (err, file) => {
        res.setHeader('content-type', 'text/html');

        const phones = JSON.parse(file);
        let phonesHTML = '';
        for(let phone of phones) {
          phonesHTML += `<li>${phone.brand} ${phone.name}</li>`;
        }

        res.end(phonesHTML);
      });
      break;
    case req.url === '/phones' && req.method === 'POST':
      let body = '';
      req.on('data', function (chunk) {
         body += chunk.toString();
      });

      req.on('end', function () {
        const newPhone = JSON.parse(body);

        // data sanitization, validation

        fs.readFile('./phones.json', (err, data) => {
            const phones = JSON.parse(data);
            phones.push({
              name: sanitizeString(newPhone.name),
              brand: sanitizeString(newPhone.brand),
            });
            fs.writeFile('./phones.json', JSON.stringify(phones), () => {       
              res.end(JSON.stringify(newPhone));
            })
        })
      });

      break;
    default:
      res.end('404');
  }


});

server.listen(3000);


function sanitizeString(str){
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str.trim();
}