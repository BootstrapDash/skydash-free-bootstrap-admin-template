$(function() {
	"use strict";
	//Set your date
	$('#count-down').countDown({
		targetDate: {
			'day': 20,
			'month': 12,
			'year': 2028,
			'hour': 0,
			'min': 0,
			'sec': 0
		},
		omitWeeks: true
	});

});