var mongoose = require('mongoose'),
	RandomStrings = mongoose.model('RandomStrings')

exports.addData = function (socket, data) {
	console.log(data.points)
	rString = new RandomStrings({rString : data.rString})
	rString.save(function (e1, d1) {
		socket.emit('dataSaved', {success : true})
	})
}

exports.showData = function (req, res) {
	var result = []
	RandomStrings.find({}, function (e1, d1) {
		console.log(d1)
		d1.forEach(function (d) {
			result.push(d.rString)
		})
		res.send(result)
	})
}