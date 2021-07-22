$(function() {
	'use strict';
	$('#vmap').vectorMap({
		map: 'world_en',
		backgroundColor: 'transparent',
		color: '#ffffff',
		hoverOpacity: 0.7,
		selectedColor: '#666666',
		enableZoom: true,
		showTooltip: true,
		scaleColors: ['#285cf7', '#673ab7'],
		values: sample_data,
		normalizeFunction: 'polynomial'
	});
	$('#vmap2').vectorMap({
		map: 'usa_en',
		showTooltip: true,
		backgroundColor: 'transparent',
		hoverColor: '#00cccc',
		color: '#00cccc',
	});
	$('#vmap3').vectorMap({
		map: 'canada_en',
		color: '#673ab7',
		borderColor: '#fff',
		backgroundColor: 'transparent',
		hoverColor: '#007bff',
		showLabels: true
	});
	$('#vmap7').vectorMap({
		map: 'germany_en',
		color: '#285cf7',
		borderColor: '#fff',
		backgroundColor: 'transparent',
		hoverColor: '#285cf7',
		showLabels: true
	});
	
	$('#vmap8').vectorMap({
		map: 'russia_en',
		color: '#3db4ec',
		borderColor: '#fff',
		backgroundColor: 'transparent',
		hoverColor: '#3db4ec',
		showLabels: true
	});
	
	$('#vmap9').vectorMap({
		map: 'france_fr',
		color: '#f10075',
		borderColor: '#fff',
		backgroundColor: 'transparent',
		hoverColor: '#f10075',
		showLabels: true
	});
});