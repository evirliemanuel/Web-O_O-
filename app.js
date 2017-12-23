const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRouts = require('./api/routes/products');
const ordersRouts = require('./api/routes/orders');
const user = require('./api/routes/myusers');

mongoose.connect(
    "mongodb://node-shop:" + process.env.MONGO_ATLAS_PW +"@node-rest-shop-shard-00-00-qn0it.mongodb.net:27017,node-rest-shop-shard-00-01-qn0it.mongodb.net:27017,node-rest-shop-shard-00-02-qn0it.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin",
{
    useMongoClient:true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((request , response, next) =>{
    response.header("Acces-Control-Allow-Origin", "*");
    response.header("Acces-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
if(request.method === 'OPTIONS'){
    response.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
    return response.status(200).json({});
}
next();
});
app.use('/products', productRouts);
app.use('/orders', ordersRouts);
app.use('/user', user);

app.use((request, response, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next)=>{
    response.status(error.status || 500);
    response.json({
        error:{
            message: error.message
        }
    });
});



// Routes which should request
app.use((request, response, next)=>{
    response.status(200).json({
        message: 'Something Wrong'
    });
});

module.exports = app;