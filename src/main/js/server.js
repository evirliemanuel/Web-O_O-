const http = require('http');
const app = require('./app');

http.createServer(app).listen(8080, function(){
    console.log("Server is now running..");
});