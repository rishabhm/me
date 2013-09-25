var mongoose 	= 	require('mongoose'),
	LocalStrategy = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	User = mongoose.model('Users');

module.exports = function (passport, config) {
	
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (id, done) {
	    User.findById( id, function (err, user) {
	    	done(err, user);
	    });
	});

	passport.use(new FacebookStrategy({
		clientID 	: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL	: config.facebook.callbackURL
	}, function (accessToken, refreshToken, profile, done) {
		User.findOne( {'facebook.id' : profile.id}, function (err, user) {

			// Check for error
			if (err) {
				return done(err, null);
			}

			// Check if user already exists
			// !user = ( user == NULL )
			if (!user) {
				user = new User({
					name: profile.displayName,
		            email: profile.emails[0].value,
		            username: profile.username,
		            provider: 'facebook',
		            facebook: profile._json
				});
				user.save(function (err) {
					if (err) {
						console.log('An error occured while saving the new user object');
						console.log(err);
					}
					return done(err, user);
				});
			} else {
				// User already exists
				return done(err, user);
			}

		});
	}));
};