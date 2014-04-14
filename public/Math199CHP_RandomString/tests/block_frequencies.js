if (typeof exports == "undefined") {
	exports = this;
}

var BlockFreq = function (str) {
	var found =0 
	for (var i=0; i<str.length-4; i++) {
		if (str.slice(i,i+4) == "1010" || str.slice(i,i+4) == "0101") {
			found++
		}
	}
	var prob = BlockFreqData[found]*(200/str.length)
	if (str.length < 100)
		return 0.5
	// if (!prob)
	// 	return 0.5
	if (prob < 0.5)
		return 1 - 2*prob
	return 2 * (prob - 0.5)
}

exports.BlockFreq = BlockFreq