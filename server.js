const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

app.use('/', router);

app.listen(3000, () => {
    console.log('Server started on port 3000');
    mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0').then(() => {
        console.log('CONECTADO COM O MONGO');
    })
});

// const product = [];

// app.post('/Addproduct', (req, res) => {
//     const { name, price, description } = req.body; // assim esperamos buscar o name informado dentro do body da requisição
//     product.push({ "name": name, "price": price, "description": description });
//     return res.json(product); // retorna a informação da variável geeks
// });

// app.get('/products', (req, res) => {
//     return res.json(product);
// });