var express = require('express');
var fs = require('fs');

var app = express();



//404 error
function send404Response(response){
    response.writeHead(404, {"Context-Type" : "text/plain"});
    response.write("Error 404 : Page not found!");
    response.end();
}

function onRequest(request, response){

    if (request.method == 'GET' && request.url == '/Home'){
        console.log("Here in Home");
        response.writeHead(200, {"Context-Type": "text/html"});
        fs.createReadStream("./index.html").pipe(response);
    }else if (request.method == 'GET' && request.url == '/profile'){
        console.log("Here in Profile");
        response.writeHead(200, {"Context-Type": "text/html"});
        fs.createReadStream("./profile.html").pipe(response);
    }else{
        send404Response(response);
    }
   
}
app.use(onRequest);
app.listen(8080, function(){
    console.log("Server is now running...");
})
