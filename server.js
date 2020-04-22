var http = require('http');
var fs = require('fs');
var path = require('path');

function onRequest(request, response){
    console.log('request was made: ' + request.url);
    response.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    myReadStream.pipe(response);
}

http.createServer(onRequest).listen(8000);