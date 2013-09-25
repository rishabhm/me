var path = require('path'),
	root = path.normalize(__dirname + '/..');

module.exports = {
	dev_mode : {
		db		: 'mongodb://localhost/test_dev',
		root 	: root,
		app		: {
			name	: 'test db : development mode'
		},
		facebook : {
			clientID: '332629783550339',
		    clientSecret: '7de88ea7d39e4d676a582295675a2cbe',
		    callbackURL: "/auth/facebook/callback"
		}
	}
}