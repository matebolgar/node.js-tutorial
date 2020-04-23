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

// Read
app.get('/products', (req, res) => {

    //

    res.send('GET /products')
});

// Read by id
app.get('/products/:egyediAzonosito', (req, res) => {
    res.send('GET /products/id')
});

// Create
app.post('/products', (req, res) => {
    res.send('POST /products')
});

// Update
app.put('/products/:egyediAzonosito', (req, res) => {
    res.send('PUT /products/id')
});

// Delete
app.delete('/products/:egyediAzonosito', (req, res) => {
    res.send('DELETE /products/id')
});

app.listen(3000);