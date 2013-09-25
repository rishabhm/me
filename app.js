var express 	= require('express'),
	app 		= express(),
	http 		= require('http'),
	server 		= http.createServer(app),
    io          = require('socket.io').listen(server),
	fs 			= require('fs'),
	mongoose 	= require('mongoose'),
    passport    = require('passport'),
	config 		= require('./config/config')['dev_mode'];

mongoose.connect(config.db);
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
	require(models_path+'/'+file)
})

app.configure(function(){
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.root + '/public'));
    app.use(app.router);
});


require('./config/passport')(passport, config);

require('./config/routes')(app, io);

server.listen(3000);

console.log('listening on port 3000');

exports = module.exports = app;


