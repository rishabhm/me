var heads = 0,
	tails = 0,
	seq = "",
	out_seq = "",
	charCount = 0

var GREEN = "#15b01a",
	YELLOW = "#ffcc00",
	RED = "#e50000",
	ORANGE = "#fa8400"

var START_ANALYSIS_AT = 5

var socket = io.connect("/")

var chi_sq_3, chi_sq_4

var chi_values = { 
	2 : [2.77,3.22,3.79,4.61,5.99,7.38,7.82,9.21,10.60,11.98,13.82,15.20],
	3 : [4.11,4.64,5.32,6.25,7.81,9.35,9.84,11.34,12.84,14.32,16.27,17.73]
}

var pre_values = {
	"2" : "01101010000010011110011001100111111100111011110011001001000010001011001011111011000100110110011011101010100101010111110100111110001110101101111011000001011101010001001001110111010100001001100111011010",
	"1729" : "10010100110011001000010111100000001011110100101011110111011000001101110111001110101000000111110111110100001001011101000111111001000100101000111101001111111010111111110110111111110011000001100111110100",
	"11213" :"11100100001101100101000111101010101111010011010101001111000010010111001000101011000101001001001000011110110101110111100100101000111110011111110110111110011000010011001000010100111110010101110001010100",
	"phi" : "10100011000110100000101111010011111000000100000011001000001010101111101011100101000000001101001110011100001111001000010110000010001100000001100001101010110001110000011100101011101111000111101011110111",
}

var probabilities = [0.25,0.20,0.15,0.10,0.05,0.025,0.02,0.01,0.005,0.0025,0.001,0.0005]

var device = "web"

$(document).ready(function () {
	// JQuery plpugin to catch double-tap
	(function($) {
	  var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
	  $.fn.nodoubletapzoom = function() {
	    if (IS_IOS)
	      $(this).bind('touchstart', function preventZoom(e) {
	        var t2 = e.timeStamp
	          , t1 = $(this).data('lastTouch') || t2
	          , dt = t2 - t1
	          , fingers = e.originalEvent.touches.length;
	        $(this).data('lastTouch', t2);
	        if (!dt || dt > 500 || fingers > 1) return; // not double-tap
	 
	        e.preventDefault(); // double tap - prevent the zoom
	        // also synthesize click events we just swallowed up
	        $(this).trigger('click').trigger('click');
	      });
	  };
	})(jQuery);
	// Detect mobile interface
	(function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){
		$('.container').css("display","none")
		device = "mobile"
	}else{
		device = "web"
		$('.container_mobile').css("display","none")
	}})(navigator.userAgent||navigator.vendor||window.opera,'http://detectmobilebrowser.com/mobile');
	// Actual code
	$('.coins img').nodoubletapzoom()
	chi_sq_3 = new ChiSquare(3)
	chi_sq_4 = new ChiSquare(4)
	$('.coins img').on('click', function (e) {
		var coinPressed = $(e.currentTarget)
		coinPressed.css('opacity','1')
		setTimeout(function () {
			coinPressed.css('opacity','0.5')
		}, 200)
		if (charCount >= 200) {
			return
		}
		var clicked = $(e.currentTarget).attr('name')
		addToSequence(clicked)
	})

	$('.container_mobile .mob_rand_seq').on('click', function (e) {
		displayPreProgrammed('cg')
	})

	$(window).on('keypress', function (e) {
		if (charCount >= 200) {
			return
		}
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
		reset(true)
		displayPreProgrammed(value)
	})

	$('.clear').on('click', function (e) {
		reset()
	})

})

function addToSequence(coin) {
	charCount++
	if (coin == "heads") {
		seq += "1"
		displayCharacter(0)
	} else {
		seq += "0"
		displayCharacter(1)
	}
	if (charCount == 200) {
		socket.emit("addString", {rString : seq})
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
			gaps = GapTest(seq),
			probGap = 1 - chi_sq_3.getProbability(3, gaps)
			prob3 = 1 - chi_sq_3.getProbability(7, chi3),
			prob4 = 1 - chi_sq_4.getProbability(15, chi4),
			chi_avg = (prob3 + prob4)/2,
			prob = Math.max(chi_avg, probGap),
			coupons = CouponsTest(seq, 4)
	updateResult(prob, seq.length)
}

function calcProb(seq) {
	console.log(seq)
	charCount = 200
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
	calcHumanProb(seq.slice(0,j+1))
	displayCharacter(seq[j-1] == "0")
}

function probFromChi(chi, n) {
	for (var i=0; i<chi_values[n].length; i++) {
		if (chi < chi_values[n][i])
			return probabilities[i]
	}
	return 0
}

function reset(opt) {
	charCount = 0
	var id = window.setTimeout(function() {}, 0);
	while (id--) {
	    window.clearTimeout(id); // will do nothing if no timeout with id is present
	}
	$('.current_sequence').html("")
	if (device == "web") {
		$('.result').html("Click on Coins or press<br>'H' or 'T' to start!")
	} else {
		$('.result').html("Click on either coin to start!")
	}
	$('.container_mobile .mob_rand_seq').css('display','')
	$('.result').css('color', '#fff')
	$('.result').css('background-color','#2d6da8')
	if (!opt) {
		$('.rand_opt').val('default')
	}
	seq = ""
}

function updateResult(n, count) {
	$('.container_mobile .mob_rand_seq').css('display','none')
	if (count < START_ANALYSIS_AT) {
		$('.result').css('background-color', "#2d6da8")
		$('.result').html("Keep going!" + "<br>" + count.toString() + " tosses complete")
		return
	}
	$('.result').css('color','#fff')
	if (n < 0.9) {
		$('.result').css('background-color', GREEN)
		$('.result').html("Looks random" + "<br>" + count.toString() + " tosses complete")
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