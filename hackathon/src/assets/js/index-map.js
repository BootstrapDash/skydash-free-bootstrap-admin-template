$(function(e){
  'use strict'

	$('#vmap').vectorMap({
		map: 'world_en',
		backgroundColor: 'transparent',
		color: '#ffffff',
		hoverOpacity: 0.7,
		selectedColor: '#666666',
		enableZoom: true,
		showTooltip: true,
		scaleColors: ['#00b9ff','#7550f6'],
		values: sample_data,
		normalizeFunction: 'polynomial'
	});

});