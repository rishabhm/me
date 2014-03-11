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
	console.log(month_offset)
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

// exports.submitDates = function (socket, data) {
// 	var selected_dates = data.dates,
// 		data = {
// 			JANUARY : [],
// 			FEBRUARY : [],
// 			MARCH : [],
// 			APRIL : [],
// 			MAY : [],
// 			JUNE : [],
// 			JULY : [],
// 			AUGUST : [],
// 			SEPTEMBER : [],
// 			OCTOBER : [],
// 			NOVEMBER : [],
// 			DECEMBER : []
// 		}
// 	selected_dates.forEach(function (date) {
// 		if (result[date]) result[date]++
// 		else result[date] = 1
// 		if (result[date] > max_result['value']) {
// 			max_result['value'] = result[date]
// 			max_result['date'] = date
// 		}

// 		var month = date.split('#')[1].split(' ')[0],
// 			day = parseInt(date.split('#')[2])
// 		data[month].push(day)
// 	})
// 	var newDates = new Dates(data)
// 	newDates.save(function (e1, d1) {
// 		socket.emit('datesSaved', {result : result, max_result : max_result})
// 	})
// }

// function calculateResult () {
// 	var identifier = ""
// 	Dates.find({}, function (err, docs) {
// 		docs.forEach(function (dateSet) {
// 			month_name_list.forEach(function (month_name) {
// 				dateSet[month_name].forEach(function (day) {
// 					var identifier = "#" + month_name + " #" + day.toString()
// 					if (result[identifier]) result[identifier]++
// 					else result[identifier] = 1
// 					if (result[identifier] > max_result['value']) {
// 						max_result['value'] = result[identifier]
// 						max_result['date'] = identifier
// 					}
// 				})
// 			})
// 		})
// 		// console.log(result, max_result)
// 	})
// }