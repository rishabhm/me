var socket = io.connect('http://54.235.176.127');

$(document).ready(function(){
	console.log('hey! the client side javascript is linked!');
	socket.emit('testingSocket', {message: 'hello world'});
	socket.on('callingBack', function (data) {
		console.log(data);
	});
});