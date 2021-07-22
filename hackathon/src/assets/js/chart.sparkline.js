$(function() {
	'use strict'
	
	/***************** LINE CHARTS *****************/
	$('#sparkline1').sparkline('html', {
		width: 200,
		height: 70,
		lineColor: '#8500ff',
		fillColor: false,
	});
	$('#sparkline2').sparkline('html', {
		width: 200,
		height: 70,
		lineColor: '#285cf7',
		fillColor: false
	});
	/************** AREA CHARTS ********************/
	$('#sparkline3').sparkline('html', {
		width: 200,
		height: 70,
		lineColor: '#8500ff',
		fillColor: 'rgba(133, 0, 255, 0.2)',
	});
	$('#sparkline4').sparkline('html', {
		width: 200,
		height: 70,
		lineColor: '#285cf7',
		fillColor: 'rgba(86, 70, 255, 0.2)'
	});
	/******************* BAR CHARTS *****************/
	$('#sparkline5').sparkline('html', {
		type: 'bar',
		barWidth: 10,
		height: 70,
		barColor: '#8500ff',
		chartRangeMax: 12
	});
	$('#sparkline6').sparkline('html', {
		type: 'bar',
		barWidth: 10,
		height: 70,
		barColor: '#285cf7',
		chartRangeMax: 12
	});
	/***************** STACKED BAR CHARTS ****************/
	$('#sparkline7').sparkline('html', {
		type: 'bar',
		barWidth: 10,
		height: 70,
		barColor: '#285cf7',
		chartRangeMax: 12
	});
	$('#sparkline7').sparkline([4, 5, 6, 7, 4, 5, 8, 7, 6, 6, 4, 7, 6, 4, 7], {
		composite: true,
		type: 'bar',
		barWidth: 10,
		height: 70,
		barColor: '#8500ff',
		chartRangeMax: 12
	});
	$('#sparkline8').sparkline('html', {
		type: 'bar',
		barWidth: 10,
		height: 70,
		barColor: '#285cf7',
		chartRangeMax: 12
	});
	$('#sparkline8').sparkline([4, 5, 6, 7, 4, 5, 8, 7, 6, 6, 4, 7, 6, 4, 7], {
		composite: true,
		type: 'bar',
		barWidth: 10,
		height: 70,
		barColor: '#00cccc ',
		chartRangeMax: 12
	});
	/**************** PIE CHART ****************/
	$('#sparkline9').sparkline('html', {
		type: 'pie',
		width: 70,
		height: 70,
		sliceColors: ['#8500ff', '#285cf7', '#3bb001']
	});
	$('#sparkline10').sparkline('html', {
		type: 'pie',
		width: 70,
		height: 70,
		sliceColors: ['#8500ff', '#285cf7', '#3bb001','#00cccc ','#ffc107','#3db4ec','#dc3545']
	});
});