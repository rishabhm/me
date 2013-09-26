var mongoose = require('mongoose');

var expSchema = new mongoose.Schema({
	username 	: String,
	email 		: String,
	name 		: String,
	provider 	: String,
	facebook 	: {}
});

expSchema.methods = {
	//METHODS HERE
}

mongoose.model('Experiences', expSchema);