module.exports = function (app, io) {
	
	var main = require('../app/controllers/main'),
		users = require('../app/controllers/users'),
		calendar = require('../app/controllers/calendar.js'),
		randomClicks = require('../app/controllers/randomClicks.js'),
		passport = require('passport');

	app.get('/MA199CHP_RandomClickData', randomClicks.showData)
	app.get('/MA199CHP_RandomDateExp', calendar.home)
	app.get('/MA199CHP_RandomDateExp_experiment', calendar.experiment)
	app.get('/MA199CHP_RandomDateExp_result', calendar.result)
	app.get('/MA199CHP_RandomDateExp_calc', calendar.calcResult)
	app.get('/home', main.home);
	app.get('/', main.home);
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
		socket.on('submitDates', function (data) {
			calendar.submitDates(socket, data)
		})
		socket.on('addData', function (data) {
			randomClicks.addData(socket, data)
		})
		socket.on('testingSocket', function (data) {
			console.log(data);
			socket.emit('callingBack', {message: 'Hi there!'});
		});
	});
	
	app.get('/loggedIn', main.loggedIn)
};
