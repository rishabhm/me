var selected_days = [],
	days_left = 20,
	socket = io.connect('/')

$(document).ready(function () {
	console.log("Calendar clientside javascript ready")
	var submit_btn = $('.submit')

	$('html').on('click', '.day', function (e) {
		var curr = $(e.currentTarget),
			day = curr.attr('id'),
			month_div = curr.parents('.month'),
			month = $(month_div).attr('id'),
			identifier = "#" + month + " #" + day,
			index = -1
		if (days_left == 0 && curr.attr('active') == 'false')
			return
		console.log(curr.attr('active'))
		if (curr.attr('active') == 'false') {
			curr.css('color', '#fff')
			curr.css('background-color', '#ccc')
			selected_days.push(identifier)
			curr.attr('active', 'true')
			days_left--
			$('.description').html('Tap on any ' + days_left + ' days')
		} else {
			curr.css('color', 'rgba(0,0,0,0.5)')
			curr.css('background-color', '')
			for (var i=0; i<selected_days.length; i++) {
				if (selected_days[i] == identifier)
					index = i
			}
			selected_days.splice(index, 1)
			curr.attr('active', 'false')
			days_left++
			$('.description').html('Tap on any ' + days_left + ' days')
		}
		if (days_left == 0 && submit_btn.attr('active') == 'false') {
			submit_btn.css('opacity','1')
			submit_btn.attr('active', 'true')
		} else if (submit_btn.attr('active') == 'true') {
			submit_btn.css('opacity', '0.5')
			submit_btn.attr('active', 'false')
		}
	})
	
	$('html').on('click', '.submit', function (e) {
		if (submit_btn.attr('active') == 'true') {
			socket.emit('submitDates', {dates : selected_days})
		}
	})

	socket.on('datesSaved', function (data) {
		document.location.href = "/Math199CHP_RandomDateExp"
	})
})