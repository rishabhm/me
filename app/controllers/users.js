var mongoose = require('mongoose'),
	User = mongoose.model('Users');

exports.authCallback = function (req, res) {
	console.log('Inside the user authCallback');
	console.log(req.user);
	res.render('signedIn');
}

exports.signin = function (req, res) {
	// Dont actually have to do anything
}

exports.login = function (req, res) {
	res.render('home');
}