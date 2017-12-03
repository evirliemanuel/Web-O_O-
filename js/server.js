var http = require('http');
var fs = require('fs');
var connect = require('connect');

var app = connect();



//404 error
function send404Response(response){
    response.writeHead(404, {"Context-Type" : "text/plain"});
    response.write("Error 404 : Page not found!");
    response.end();
}

function onRequest(request, response){

    if (request.method == 'GET' && request.url == '/Home'){
        response.writeHead(200, {"Context-Type": "text/html"});
        fs.createReadStream("./index.html").pipe(response);
    }else{
        send404Response(response);
    }
   
}
app.use(onRequest);
http.createServer(app).listen(8080);
console.log("Server is now running...");