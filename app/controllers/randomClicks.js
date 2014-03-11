var mongoose = require('mongoose'),
	Clicks = mongoose.model('Clicks')

exports.addData = function (socket, data) {
	console.log(data.points)
	clicks = new Clicks({clicks : data.points})
	clicks.save(function (e1, d1) {
		socket.emit('clicksSaved', {success : true})
	})
}

exports.showData = function (req, res) {
	var result = []
	Clicks.find({}, function (e1, d1) {
		console.log(d1)
		d1.forEach(function (d) {
			result.push(d.clicks)
		})
		res.send(result)
	})
}