if (typeof exports == "undefined") {
	exports = this;
}

function GapTest(str) {
	var gaps = [],
		curr_gap = 0,
		count = 0
	for (var i=0; i<str.length; i++) {
		if (count) {
			curr_gap++
		}
		if (str[i] == '1') {
			if (count) {
				gaps.push(curr_gap-1)
				curr_gap = 0
			} else {
				count = 1
			}
		}
	}
	var test_gaps = {0:0,1:0,2:0,3:0},
		exp_gaps = {
			0: gaps.length/2,
			1: gaps.length/4,
			2: gaps.length/8,
			3: gaps.length/8
		}
	gaps.forEach(function (g) {
		if (g > 2) {
			test_gaps[3]++
		} else {
			test_gaps[g]++
		}
	})
	
	var cs = 0
	for (var i = 0; i<4; i++) {
		cs += ((test_gaps[i] - exp_gaps[i])*(test_gaps[i] - exp_gaps[i]))/exp_gaps[i]
	}

	return cs
}

exports.GapTest = GapTest