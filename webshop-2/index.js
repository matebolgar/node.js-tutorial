/*
    Erőforrás:
        Product {
            id: string
            name: string
            price: number
            isInStock: boolean
        }
    Operációk:
        Create, Read, Update, Delete (CRUD)
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Read
app.get('/products', (req, res) => {
    fs.readFile('./data/products.json' , (err, file) => {
        res.send(JSON.parse(file));
    });
});

// Read by id
app.get('/products/:egyediAzonosito', (req, res) => {
   
});

// Create
app.post('/products', bodyParser.json(), (req, res) => {
    const newProduct = {
        id: uuidv4(),
        name: sanitizeString(req.body.name),
        price: Number(req.body.price),
        isInStock: Boolean(req.body.isInStock),
    };

    fs.readFile('./data/products.json' , (err, file) => {
        const products = JSON.parse(file);
        products.push(newProduct);
        fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
            res.send(newProduct);
        })
    })
});

// Update
app.put('/products/:egyediAzonosito',bodyParser.json(), (req, res) => {
   
});

// Delete
app.delete('/products/:egyediAzonosito', (req, res) => {
   
});

app.listen(3000);

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }