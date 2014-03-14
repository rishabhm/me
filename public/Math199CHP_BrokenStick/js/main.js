var bar, // store the canvas element representing the stick
bar_left, bar_right,
result_view,
click_count = 0,
click = [-1,-1],
GREEN = "#15b01a",
RED = "#e50000",
BLUE = "#0EBFE9",
CLICK_LIMIT = 10,
points = [],
ctx, ctx_width, ctx_height

var socket = io.connect("/")

$(document).ready(function () {
	bar = $('#viewport')

	// set up the context
	ctx = document.getElementById('viewport')
	ctx_width = ctx.width
	ctx_height = ctx.height
	ctx = ctx.getContext("2d")

	result_view = $('.disp_result')
	bar_left = bar.offset()['left']
	bar_right = bar_left + bar.width()

	setupBar()
	updateClickCountDisp(CLICK_LIMIT - click_count)
	showDescription(CLICK_LIMIT)

	bar.on('click', function (e) {
		if (click_count < CLICK_LIMIT) {
			points.push(e.offsetX/bar.width())
			drawRectangle(parseInt(e.offsetX))
			click_count++
			updateClickCountDisp(CLICK_LIMIT - click_count)
			if (click_count == CLICK_LIMIT) {
				bar.css('opacity', '0.5')
				$('.clickCount').css('opacity','0.5')
				// showSubmitBtn()
				sendData()
				pointsEntered()
			}
		}
	})

	// Reset experiment
	$('.repeat').on('click', function (e) {
		reset()
	})

	socket.on('clicksSaved', function (data) {
		showSuccessMessage()
	})

	$('.submit_btn').on('click', function (e) {
		var prob = analyzeData()
		if (prob < 20) {
			$('.result').css('color','GREEN')
		} else if (prob < 70) {
			$('.result').css('color','BLUE')
		} else {
			$('.result').css('color','RED')
		}
		$('.result').html("There is a " + prob.toString() + "% chance you're human")
	})

	$('.gen_random').on('click', function (e) {
		reset()
		click_count = CLICK_LIMIT
		points = []
		for (var i=0; i<CLICK_LIMIT; i++) {
			points.push(Math.random())
		}
		points.sort()
		points.forEach(function (n) {
			drawRectangle(n*bar.width())
		})
		// bar.css('opacity', '0.5')
		// $('.clickCount').css('opacity','0.5')
		// $('.gen_random').css('opacity','0.5')
		// sendData()
		pointsEntered()
		bar.css('opacity', '0.5')
		$('.clickCount').css('opacity','0.5')
		// showSubmitBtn()
	})
})

function pointsEntered() {
	var prob = analyzeData()
	if (prob < 20) {
		$('.result').css('color','GREEN')
	} else if (prob < 90) {
		$('.result').css('color','BLUE')
	} else {
		$('.result').css('color','RED')
	}
	$('.result').html("There is a " + prob.toFixed(2) + "% chance you're human")
}

function reset() {
	click_count = 0
	result_view.css('opacity', '0')
	bar.css('opacity', '1')
	ctx.clearRect(0,0,ctx_width, ctx_height)
	setupBar()
	updateClickCountDisp(CLICK_LIMIT)
	points = []
	$('.result').html("")
	$('.successMessage').html("")
}

// Draw rectangles where the user clicked
function drawRectangle(x) {
	var canvas_width = ctx_width
	// points.push(x/bar.width())
	x = parseInt((x/bar.width())*canvas_width)
	ctx.fillRect(x-1,0,1,150)
}

function setupBar() {
	ctx.fillStyle = "#cccccc"
	ctx.fillRect(0,ctx_width/6,ctx_width, ctx_height/3)
	ctx.fillStyle = "#e50000"
}

function updateClickCountDisp(n) {
	$('.clickCount').html("Clicks left : " + n.toString())

}

function showSubmitBtn() {
	$('.submit_btn').css('opacity','1')
}

function showDescription(n) {
	$('.desc').html("Click on any " + n.toString() + " points on the bar! Try to be as random as possible")
}

function sendData () {
	socket.emit("addData", {points : points.sort()})
}

function showSuccessMessage() {
	$('.successMessage').css('opacity','1')
}

function analyzeData() {
	points.sort()
	console.log(points)
	var smallestGap = findSmallestGap(points, 1)
	var smallestCGap = findSmallestGap(points, 2)
	var prob1 = getGapProbability(smallestGap, 1)
	var prob2 = getGapProbability(smallestCGap, 2)
	console.log(smallestGap, smallestCGap, prob1, prob2)
	return (prob1+prob2)/2
}

function findSmallestGap(arr, dist) {
	var smallest = 0
	for (var i=0; i<arr.length-dist;i++) {
		if (!smallest || arr[i+dist] - arr[i] < smallest) {
			smallest = arr[i+dist] - arr[i]
		}
	}
	return smallest
}

/**

The following functions are running tests and returning the probability that the user is Human

**/

function getGapProbability(gap, dist) {
	var trialSize = 1000,
		success = 0
	for (var i=0;i<trialSize;i++) {
		if (calcSmallestGap(gap, dist)) {
			success++
		}
	}
	return (success*100)/trialSize
}

function calcSmallestGap(gap, dist) {
	var test_points = []
	for (var i=0; i<CLICK_LIMIT; i++) {
		test_points.push(Math.random())
	}
	test_points.sort()
	var smallest = 0
	for (var i =0 ;i<test_points.length-dist; i++) {
		if (!smallest || test_points[i+dist] - test_points[i] < smallest) {
			smallest = test_points[i+dist] - test_points[i]
		}
	}
	return smallest < gap
}

// The functions below are used if you are checking for a triangle

// // Display the results of the experiment
// function showResult() {
// 	var pos1 = bar_left,
// 		pos2 = Math.min(click[0], click[1]),
// 		pos3 = Math.max(click[0], click[1]),
// 		pos4 = bar_right

// 	// Get the length of each piece in sorted order
// 	var lengths = [pos2 - pos1, pos3 - pos2, pos4 - pos3].sort()

// 	// Display the location of each click
// 	displayValuesEntered(pos2, pos3)

// 	// Check if a triangle can be formed
// 	if (lengths[0] + lengths[1] > lengths[2]) {
// 		$('.result').css('color', GREEN)
// 		$('.result').html("Yep! You can form a triangle!")
// 	} else {
// 		$('.result').css('color', RED)
// 		$('.result').html("Sorry, no triangle possible :(")
// 	}
// }

// // Display the locations of the clicks
// function displayValuesEntered(a,b) {
// 	$('.values').html("You entered " + (parseInt(a - bar_left)).toString() + " and " + (parseInt(b - bar_left)).toString())
// }