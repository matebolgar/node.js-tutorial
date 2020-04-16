const fs = require('fs');

const rs = fs.createReadStream('./content.txt');

const ws = fs.createWriteStream('./copy.txt');


// rs.on('data', function (data) {
//     console.log(data);
//     ws.write(data);
// });

rs.pipe(ws);

rs.on('end', function() {
    console.log('Stream elapadt');
    ws.close();
})