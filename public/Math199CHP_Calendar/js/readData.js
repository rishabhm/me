var fs = require("fs"),
	data = {}


function stringify(d) {
	return "\"" + d.toString() + "\""
}

function readFileData(fname) {
	var dataArr = fs.readFileSync("../resources/"+fname, 'utf8').split('\n')
	for (var i = 1; i<=dataArr.length; i++) {
		console.log(i + ":" + dataArr[i-1].split("\t")[1].split("\r")[0] + ",")
	}
}

readFileData("coupon_5.txt")