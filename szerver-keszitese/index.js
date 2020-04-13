// wrapper function
// function(__dirname, __filename, module, require, exports) {

console.log(__dirname);
console.log(__filename);

const add = require("./calculator.js");

console.log(add(2, 3));

const http = require("http");

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("Hello, World!");
};

const server = http.createServer(requestListener);
server.listen(8080);

// }
