var months = [
		{name : "January", length : 31},
		{name : "February", length : 28},
		{name : "March", length : 31},
		{name : "April", length : 30},
		{name : "May", length : 31},
		{name : "June", length : 30},
		{name : "July", length : 31},
		{name : "August", length : 31},
		{name : "September", length : 30},
		{name : "October", length : 31},
		{name : "November", length : 30},
		{name : "December", length : 31}
	],
	total_count = 0


// Nobel birthdays
var birthdays = [
    74,
    231,
    187,
    174,
    13,
    114,
    51,
    129,
    247,
    364,
    306,
    294,
    220,
    53,
    257,
    321,
    138,
    91,
    212,
    156
  ],
	OPAC_INCREMENT = 0.5
// var birthdays = [86, 199, 145, 349, 135, 311, 316, 158, 352, 353, 228, 115, 157, 327, 13, 334, 264, 282, 183, 90, 158, 113, 105, 46, 73, 280, 81, 337, 238, 203, 273, 253, 45, 116, 227, 311, 339, 224, 220, 293, 175, 246, 295, 123, 272, 220, 48, 210, 115, 111, 249, 322, 23, 339, 147, 279, 296, 242, 197, 345, 8, 193, 26, 44, 143, 41, 265, 328, 209, 189, 32, 191, 264, 36, 31, 22, 321, 179, 176, 209, 348, 192, 90, 43, 131, 123, 183, 164, 258, 150, 326, 156, 143, 59, 151, 71, 95, 4, 257, 131, 170, 190, 343, 81, 27, 347, 273, 72, 190, 116, 10, 339, 29, 123, 272, 69, 70, 125, 110, 159, 292, 221, 90, 328, 179, 359, 201, 157, 136, 110, 196, 306, 145, 239, 252, 222, 87, 343, 306, 297, 213, 332, 88, 196, 266, 175, 75, 20, 213, 207, 59, 91, 309, 305, 96, 59, 186, 178, 296, 74]

$(document).ready(function () {
	console.log(birthdays.length)
	// birthdays = [7, 9, 23, 24, 25, 65, 111, 119, 159, 170, 208, 235, 236, 255, 267, 307, 330, 331, 350]
	birthdays = [11, 42, 56, 61, 71, 100, 136, 164, 174, 193, 195, 243, 252, 264, 272, 277, 309, 319, 337, 351]
	// birthdays = []
	// for (var i = 0; i<20; i++) {
	// 	birthdays.push(parseInt(Math.random() * 365) + 1)
	// }
	var table = "",
		count = 0
	months.forEach(function (month) {
		count = 0
		table = "<table class='month'><tr><td class='heading' colspan='7'>"+month.name+"</td></tr>"
		while (count < month.length) {
			total_count++
			if (count % 7 == 0) {
				table += "<tr>"
			} 
			table+="<td opacity = '0' id = '"+total_count.toString()+"'>"+(count + 1).toString()+"</td>"
			if (count % 7 == 6) {
				table += "</tr>"
			}
			count++
		}
		table += "</table>"
		$('.tables').append(table)
	})

	var target, opac, color_string
	birthdays.forEach(function (b) {
		target = $('#'+b.toString())
		target.css('color', '#fff')
		opac = parseFloat(target.attr('opacity'))
		target.attr('opacity', (opac + OPAC_INCREMENT).toString())
		console.log(b, target.attr('opacity'))
		color_string = "rgba(255,0,0,"+(opac + OPAC_INCREMENT).toString()+")"
		target.css('background-color', color_string)
	})
})