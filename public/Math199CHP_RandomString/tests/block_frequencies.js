if (typeof exports == "undefined") {
	exports = this;
}

var BlockFreq = function (str, n) {
	var found =0 
	for (var i=0; i<str.length-4; i++) {
		if (str.slice(i,i+4) == "1010" || str.slice(i,i+4) == "0101") {
			found++
		}
	}
	
}

exports.BlockFreq = BlockFreq