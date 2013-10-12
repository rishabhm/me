var mongoose 	= require('mongoose'),
	Users 		= mongoose.model('Users');

exports.home = function (req, res) {
	Users.find({}, function (err, data) {
		console.log('rendering home');
		res.render('home', {});
	});
}

exports.loggedIn = function (req, res) {
	console.log('inside logged in');
	console.log(req.user);
	res.render('home', {});
}