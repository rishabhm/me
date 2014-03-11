var mongoose = require('mongoose'),
	Dates = mongoose.model('Dates'),
	result = {},
	max_result = {value : 0, date : ""},
	month_name_list = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
	month_data = [
		{month_name : "JANUARY", month_length : 31},
		{month_name : "FEBRUARY", month_length : 28},
		{month_name : "MARCH", month_length : 31},
		{month_name : "APRIL", month_length: 30},
		{month_name : "MAY", month_length : 31},
		{month_name : "JUNE", month_length : 30},
		{month_name : "JULY", month_length : 31},
		{month_name : "AUGUST", month_length : 31},
		{month_name : "SEPTEMBER", month_length : 30},
		{month_name : "OCTOBER", month_length : 31},
		{month_name : "NOVEMBER", month_length : 30},
		{month_name : "DECEMBER", month_length : 31}
	],
	month_offset = {}

calculateOffsets()
// calculateResult()

exports.home = function (req, res) {
	console.log("Inside calendar")
	res.render("calendar")
}

exports.experiment = function (req, res) {
	res.render("cal_experiment", {data : month_data})
}

exports.result = function (req, res) {
	// res.render()
}

exports.submitDates = function (socket, data) {
	var selected_dates = data.dates,
		observed_data = [],
		month, day
	selected_dates.forEach(function (date) {
		month = date.split('#')[1].split(' ')[0]
		day = parseInt(date.split('#')[2])
		observed_data.push(day + month_offset[month])
	})
	var newDates = new Dates({dates : observed_data})
	newDates.save(function (e1, d1) {
		console.log("New dates saved")
		socket.emit('datesSaved')
	})
}

function calculateOffsets() {
	var offset = 0
	for (var i=0; i<12; i++) {
		for (var j=0; j<i; j++) {
			offset += month_data[j]['month_length']
		}
		month_offset[month_data[i]['month_name']] = offset
		offset = 0
	}
	// console.log(month_offset)
}


exports.calcResult = function (req, res) {
		var to_send = []
		Dates.find({}, function (e1, d1) {
			d1.forEach(function (dateSet) {
				to_send.push(dateSet['dates'])
			})
			res.send(to_send)
		})
}
