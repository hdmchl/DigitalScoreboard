//we use expressjs and socket.io
var appName     = 'DigitalScoreboard',
    express     = require('express'),
    app         = express(),
    http        = require('http'),
    server      = http.createServer(app),
    io          = require('socket.io').listen(server);

//define static file server
app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.static(__dirname));
  	app.use(express.errorHandler({
    	dumpExceptions: true, 
    	showStack: true
	}));
});

//use sockets for comm
io.sockets.on('connection', function(socket){

    console.log('New user connected: ' + socket.id);
    socket.emit('connected', { hello: 'Welcome to the party!' });

    socket.on('orientationEvent', function(data) {
        //console.log(data)
        socket.broadcast.emit('update_orientationEvent', data);
    })

    socket.on('touchEvent', function(data) {
        //console.log(data)
        socket.broadcast.emit('touchEventHandler', data);
    })

    socket.on('disconnect', function () {
        console.log('User disconnected - Damn... I thought they liked us!');
    });

});

// start the server
var port = 8080;
try {
    server.listen(port);
    console.log('Server is listening on port: ' + port);
} catch (err) {
    console.error('Server didn\'t start: ' + err);
}