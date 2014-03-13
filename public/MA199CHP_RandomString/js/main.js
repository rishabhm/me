var heads = 0,
	tails = 0,
	seq = "",
	out_seq = ""

var GREEN = "#15b01a",
	YELLOW = "#ffcc00",
	RED = "#e50000",
	ORANGE = "#fa8400"

var chi_sq_3, chi_sq_4

var chi_values = { 
	2 : [2.77,3.22,3.79,4.61,5.99,7.38,7.82,9.21,10.60,11.98,13.82,15.20],
	3 : [4.11,4.64,5.32,6.25,7.81,9.35,9.84,11.34,12.84,14.32,16.27,17.73]
}

var pre_values = {
	"2" : "01101010000010011110011001100111111100111011110011001001000010001011001011111011000100110110011011101010100101010111110100111110001110101101111011000001011101010001001001110111010100001001100111011010",
	"1729" : "10010100110011001000010111100000001011110100101011110111011000001101110111001110101000000111110111110100001001011101000111111001000100101000111101001111111010111111110110111111110011000001100111110100",
	"11213" :"11100100001101100101000111101010101111010011010101001111000010010111001000101011000101001001001000011110110101110111100100101000111110011111110110111110011000010011001000010100111110010101110001010100",
	"pi" : "00100100001111110110101010001000100001011010001100001000110100110001001100011001100010100010111000000011011100000111001101000100101001000000100100111000001000100010100110011111001100011101000000001000",
}

var probabilities = [0.25,0.20,0.15,0.10,0.05,0.025,0.02,0.01,0.005,0.0025,0.001,0.0005]

$(document).ready(function () {
	chi_sq_3 = new ChiSquare(3)
	chi_sq_4 = new ChiSquare(4)
	$('.coins img').on('click', function (e) {
		var clicked = $(e.currentTarget).attr('name')
		addToSequence(clicked)
	})

	$(window).on('keypress', function (e) {
		if (e.keyCode == "h".charCodeAt(0) || e.keyCode == "H".charCodeAt(0)) {
			$('.h_coin').css('opacity','1')
			setTimeout(function () {
				$('.h_coin').css('opacity','0.5')
			}, 100)
			addToSequence("heads")
		} else if (e.keyCode == "t".charCodeAt(0) || e.keyCode == "T".charCodeAt(0)) {
			$('.t_coin').css('opacity','1')
			setTimeout(function () {
				$('.t_coin').css('opacity','0.5')
			}, 100)
			addToSequence("tails")
		}
	})

	$('.rand_opt').on('change', function (e) {
		var value = $(e.currentTarget).val()
		reset()
		displayPreProgrammed(value)
	})

	$('.clear').on('click', function (e) {
		reset()
	})

})

function addToSequence(coin) {

	if (coin == "heads") {
		seq += "1"
		displayCharacter(0)
	} else {
		seq += "0"
		displayCharacter(1)
	}
	calcHumanProb(seq)
}

function displayCharacter(n) {
	if (n==0) {
		$('.current_sequence').append("<div class='H'>H</div>")
	} else {
		$('.current_sequence').append("<div class='T'>T</div>")
	}
}

function displayPreProgrammed(val) {
	if (val == "default") return
	if (val == "cg") {
		calcProb(generateRandomString(200))
	} else {
		calcProb(pre_values[val])
	}
}

function generateRandomString(n) {
	var out = ""
	for (var i=0; i<n; i++) {
		out += (parseInt(Math.random() * 10000)%2).toString()
	}
	// console.log(out)
	return out
}

function calcHumanProb(seq) {
	var chi3 = chi_sq_3.calcChiSquare(seq),
			chi4 = chi_sq_4.calcChiSquare(seq)
			gaps = gapTest(seq),
			probGap = 1 - chi_sq_3.getProbability(3, gaps)
			prob3 = 1 - chi_sq_3.getProbability(7, chi3),
			prob4 = 1 - chi_sq_4.getProbability(15, chi3),
			prob = Math.max(prob3, prob4, probGap)
	updateResult(prob, seq.length)
}

function calcProb(seq) {
	console.log(seq)
	// for (var j=0; j<50; j++) {
	// 	displayCharacter(seq[j]=="0")
	// }
	for (var j=0; j<seq.length; j++) {
		sleep(seq, j)
	}
}

function sleep(seq, n) {
	setTimeout(function () {
		sim(seq, n)
	}, (n)*250)
}

function sim(seq, j) {
	var chi3 = chi_sq_3.calcChiSquare(seq.slice(0,j)),
			chi4 = chi_sq_4.calcChiSquare(seq.slice(0,j))
			gaps = gapTest(seq.slice(0,j)),
			probGap = 1 - chi_sq_3.getProbability(3, gaps)
			prob3 = 1 - chi_sq_3.getProbability(7, chi3),
			prob4 = 1 - chi_sq_4.getProbability(15, chi3),
			prob = Math.max(prob3, prob4, probGap)
	updateResult(prob, j+1)
	displayCharacter(seq[j-1] == "0")
}

function probFromChi(chi, n) {
	for (var i=0; i<chi_values[n].length; i++) {
		if (chi < chi_values[n][i])
			return probabilities[i]
	}
	return 0
}

function gapTest(str) {
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

	// console.log(test_gaps, exp_gaps)

	var cs = 0
	for (var i = 0; i<4; i++) {
		cs += ((test_gaps[i] - exp_gaps[i])*(test_gaps[i] - exp_gaps[i]))/exp_gaps[i]
	}

	return cs
}

function reset(opt) {
	var id = window.setTimeout(function() {}, 0);
	while (id--) {
	    window.clearTimeout(id); // will do nothing if no timeout with id is present
	}
	$('.current_sequence').html("")
	$('.result').html("")
	if (!opt) {
		$('.rand_opt').val('default')
	}
	seq = ""
}

function updateResult(n, count) {
	if (count < 50) {
		$('.result').css('background-color', "#fff")
		$('.result').html("Keep going!" + "<br>" + count.toString() + " tosses complete")
		return
	}
	if (n < 0.9) {
		$('.result').css('background-color', GREEN)
		$('.result').html("You are quite random" + "<br>" + count.toString() + " tosses complete")
	} else if (n < 0.95) {
		$('.result').css('background-color', YELLOW)
		$('.result').html("90% LIKELY FAKE" + "<br>" + count.toString() + " tosses complete")
	} else if (n < 0.975) {
		$('.result').css('background-color', ORANGE)
		$('.result').html("95% LIKELY FAKE" + "<br>" + count.toString() + " tosses complete")
	} else {
		$('.result').css('background-color', RED)
		$('.result').html("97.5% LIKELY FAKE" + "<br>" + count.toString() + " tosses complete")
	}
}