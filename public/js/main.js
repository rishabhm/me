var socket = io.connect('http://localhost');

$(document).ready(function(){
	console.log('hey! the client side javascript is linked!');
	socket.emit('testingSocket', {message: 'hello world'});
	socket.on('callingBack', function (data) {
		console.log(data);
	});

	// Handle user interactions

	// Search interactions
	// Enter pressed
	$('#need_text').keypress(function (e) {
		if(e.which === 13) {
			console.log('Enter was pressed : ', $(this).val());
		}
	});
	// Search button pressed
	// NOTE: prev() refers to #need_text
	$('#need_btn').click(function (e) {
		console.log('Need button was pressed : ', $(this).prev().val());
	});

	// Have interaction
	$('#have_btn').click(function (e) {
		console.log('Have was pressed');
		$('#user_info').css('display', 'block');
		$('#landing_div').animate({
			opacity: 0
		}, 500, function () {
			console.log('animation complete');
			$('#landing_div').css('display', 'none');
			$('#user_info').animate({
				opacity: 1,
				top: "+=25"
			}, 1000, function () {
				console.log('user info is now visible');
			});
		})
	});	
});