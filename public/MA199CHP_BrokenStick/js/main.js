var bar, // store the canvas element representing the stick
bar_left, bar_right,
result_view,
click_count = 0,
click = [-1,-1],
GREEN = "#15b01a",
RED = "#e50000",
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

	// When the bar is clicked, record the locations of the click
	bar.on('click', function (e) {
		// Check that only 2 clicks are allowed
		if (click_count < CLICK_LIMIT) {
			click[click_count] = e.offsetX
			// Mark the position of the click
			drawRectangle(parseInt(click[click_count]))
			// Record the number of clicks
			click_count++
			updateClickCountDisp(CLICK_LIMIT - click_count)
			if (click_count == CLICK_LIMIT) {
				bar.css('opacity', '0.5')
				$('.clickCount').css('opacity','0.5')
				showSubmitBtn()
			}
		}
	})

	// Reset experiment
	$('.repeat').on('click', function (e) {
		if (click_count == 2) {
			click_count = 0
			result_view.css('opacity', '0')
			bar.css('opacity', '1')
			// Clear the click marks
			ctx.clearRect(0,0,ctx_width, ctx_height)
			setupBar()
		}
	})

	socket.on('clicksSaved', function (data) {
		showSuccessMessage()
	})

	$('.submit_btn').on('click', function (e) {
		sendData()
	})
})

// Display the results of the experiment
function showResult() {
	var pos1 = bar_left,
		pos2 = Math.min(click[0], click[1]),
		pos3 = Math.max(click[0], click[1]),
		pos4 = bar_right

	// Get the length of each piece in sorted order
	var lengths = [pos2 - pos1, pos3 - pos2, pos4 - pos3].sort()

	// Display the location of each click
	displayValuesEntered(pos2, pos3)

	// Check if a triangle can be formed
	if (lengths[0] + lengths[1] > lengths[2]) {
		$('.result').css('color', GREEN)
		$('.result').html("Yep! You can form a triangle!")
	} else {
		$('.result').css('color', RED)
		$('.result').html("Sorry, no triangle possible :(")
	}
}

// Display the locations of the clicks
function displayValuesEntered(a,b) {
	$('.values').html("You entered " + (parseInt(a - bar_left)).toString() + " and " + (parseInt(b - bar_left)).toString())
}

// Draw rectangles where the user clicked
function drawRectangle(x) {
	var canvas_width = ctx_width
	points.push(x/bar.width())
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