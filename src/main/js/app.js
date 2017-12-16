const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

app.use((request, response, next)=>{
    console.log("request sent");
    response.status(200).json({
        message: 'Something Wrong'
    });
});

module.exports = app;