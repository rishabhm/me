var mongoose = require('mongoose')

var datesSchema = new mongoose.Schema({
	// JANUARY : [Number],
	// FEBRUARY : [Number],
	// MARCH : [Number],
	// APRIL : [Number],
	// MAY : [Number],
	// JUNE : [Number],
	// JULY : [Number],
	// AUGUST : [Number],
	// SEPTEMBER : [Number],
	// OCTOBER : [Number],
	// NOVEMBER : [Number],
	// DECEMBER : [Number]
	dates : [Number]
});

mongoose.model('Dates', datesSchema);