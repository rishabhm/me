var mongoose = require('mongoose')

var clicksSchema = new mongoose.Schema({
	clicks : [Number]
});

mongoose.model('Clicks', clicksSchema);