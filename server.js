//var http = require('http');
//http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end('Hello World\n');
//}).listen(2000, '127.0.0.1');
//console.log('Server running at http://127.0.0.1:2000/');
//
//var socket = require('socket.io-client')('http://localhost');
//socket.on('connect', function () {
//});
//socket.on('event', function (data) {
//});
//socket.on('disconnect', function () {
//});

var app = require('http').createServer(handler),
        io = require('socket.io').listen(app),
        fs = require('fs');

app.listen(4000);
console.log("Started Server.js onto port 4000");

function handler(req, res) {
    fs.readFile(__dirname + '/public/index.html', function (err, data) {
        res.writeHead(200);
        res.end(data);
    });

}

io.sockets.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });


});