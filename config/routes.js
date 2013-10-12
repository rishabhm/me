module.exports = function (app, io) {
	
	var main = require('../app/controllers/main'),
		users = require('../app/controllers/users'),
		passport = require('passport');

	app.get('/home', main.home);
	app.get('/*', main.home);
	app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), users.signin)
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback)

	io.sockets.on('connection', function(socket) {
		socket.on('testingSocket', function (data) {
			console.log(data);
			socket.emit('callingBack', {message: 'Hi there!'});
		});
	});
	
	app.get('/loggedIn', main.loggedIn)
};
