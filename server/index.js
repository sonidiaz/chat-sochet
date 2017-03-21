var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    res.status(200).send('hola mundo');
});

var messanges = [
    {
        id:1,
        text:'El cliente del chat nachodiaz',
        nickname: 'bot - nachodiaz8.com' 
    }
]

io.on('connection', function(socket){
    console.log('se conectaron al socket' + socket.handshake.address + '');

    socket.emit('messages', messanges);

    socket.on('add-message', function(data){
        messanges.push(data);

        io.sockets.emit('messages', messanges);
    })

});


server.listen(3000, function(){
    console.log('esta funcionando 3000')
});