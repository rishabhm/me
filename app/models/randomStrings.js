var mongoose = require('mongoose')

var randomStringsSchema = new mongoose.Schema({
	rString : String
});

mongoose.model('RandomStrings', randomStringsSchema);