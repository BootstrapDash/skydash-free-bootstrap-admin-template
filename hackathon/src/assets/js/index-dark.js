$(function() {

	window.Apex = {
		chart: {
		foreColor: '#77778e',
		toolbar: {
		  show: false
		},
	},
	dataLabels: {
		enabled: false
	},
	tooltip: {
		theme: 'dark'
		},
	grid: {
		borderColor: "rgba(119, 119, 142, 0.2)",
		xaxis: {
			lines: {
			show: true
			}
		}
		}
	};
	
	/* Dashboard content */
	$('#compositeline').sparkline('html', {
		lineColor: 'rgba(255, 255, 255, 0.6)',
		lineWidth: 2,
		spotColor: false,
		minSpotColor: false,
		maxSpotColor: false,
		highlightSpotColor: null,
		highlightLineColor: null,
		fillColor: 'rgba(255, 255, 255, 0.2)',
		chartRangeMin: 0,
		chartRangeMax: 20,
		width: '100%',
		height: 30,
		disableTooltips: true
	});
	$('#compositeline2').sparkline('html', {
		lineColor: 'rgba(255, 255, 255, 0.6)',
		lineWidth: 2,
		spotColor: false,
		minSpotColor: false,
		maxSpotColor: false,
		highlightSpotColor: null,
		highlightLineColor: null,
		fillColor: 'rgba(255, 255, 255, 0.2)',
		chartRangeMin: 0,
		chartRangeMax: 20,
		width: '100%',
		height: 30,
		disableTooltips: true
	});
	$('#compositeline3').sparkline('html', {
		lineColor: 'rgba(255, 255, 255, 0.6)',
		lineWidth: 2,
		spotColor: false,
		minSpotColor: false,
		maxSpotColor: false,
		highlightSpotColor: null,
		highlightLineColor: null,
		fillColor: 'rgba(255, 255, 255, 0.2)',
		chartRangeMin: 0,
		chartRangeMax: 30,
		width: '100%',
		height: 30,
		disableTooltips: true
	});
	$('#compositeline4').sparkline('html', {
		lineColor: 'rgba(255, 255, 255, 0.6)',
		lineWidth: 2,
		spotColor: false,
		minSpotColor: false,
		maxSpotColor: false,
		highlightSpotColor: null,
		highlightLineColor: null,
		fillColor: 'rgba(255, 255, 255, 0.2)',
		chartRangeMin: 0,
		chartRangeMax: 20,
		width: '100%',
		height: 30,
		disableTooltips: true
	});
	/* Dashboard content closed*/
	
	
	/* Apexcharts (#bar) */
	var optionsBar = {
	  chart: {
		height: 249,
		type: 'bar',
		toolbar: {
		   show: false,
		},
		fontFamily: 'Nunito, sans-serif',
		// dropShadow: {
		//   enabled: true,
		//   top: 1,
		//   left: 1,
		//   blur: 2,
		//   opacity: 0.2,
		// }
	  },
	 colors: ["#036fe7", '#f93a5a', '#f7a556'],
	 plotOptions: {
				bar: {
				  dataLabels: {
					enabled: false
				  },
				  columnWidth: '42%',
				  endingShape: 'rounded',
				}
			},
	  dataLabels: {
		  enabled: false
	  },
	  stroke: {
		  show: true,
		  width: 2,
		  endingShape: 'rounded',
		  colors: ['transparent'],
	  },
	  responsive: [{
		  breakpoint: 576,
		  options: {
			   stroke: {
			  show: true,
			  width: 1,
			  endingShape: 'rounded',
			  colors: ['transparent'],
			},
		  },
		  
		  
	  }],
	   series: [{
		  name: 'Impressions',
		  data: [74, 85, 57, 56, 76, 35, 61, 98, 36 , 50, 48, 29, 57]
	  }, {
		  name: 'Turnover',
		  data: [46, 35, 101, 98, 44, 55, 57, 56, 55 ,34, 79, 46,76]
	  }, {
		  name: 'In progress',
		  data: [26, 35, 41, 78, 34, 65, 27, 46, 37, 65, 49, 23,49]
	  }],
	  xaxis: {
		  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
	  },
	  fill: {
		  opacity: 1
	  },
	  legend: {
		show: false,
		floating: true,
		position: 'top',
		horizontalAlign: 'left',
		// offsetY: -36

	  },
	  // title: {
	  //   text: 'Financial Information',
	  //   align: 'left',
	  // },
	  tooltip: {
		  y: {
			  formatter: function (val) {
				  return "$ " + val + " thousands"
			  }
		  }
	  }
	}
	new ApexCharts(document.querySelector('#bar'), optionsBar).render();
	
	/* Apexcharts (#bar) closed */
	
	
	/*--- Apex (#chart) ---*/
	var options = {
		series: [17],
		chart: {
		height: 205,
		type: 'radialBar',
		 offsetX: 0,
          offsetY: 0,
	},
	plotOptions: {
	  radialBar: {
		startAngle: -135,
		endAngle: 135,
		size: 120,
		 imageWidth: 50,
              imageHeight: 50,
			  
		 track: {	
		 strokeWidth: "80%",	
		 background: '#141b2d',	
		},
		 dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
				 bottom: 0,
                blur: 3,
                opacity: 0.5
              },
		dataLabels: {
		  name: {
			fontSize: '16px',
			color: '#fff',
			offsetY: 30,
		  },
		  hollow: {	
			 size: "60%"	
			},
		  value: {
			offsetY: -10,
			fontSize: '22px',
			color: '#fff',
			formatter: function (val) {
			  return val + "%";
			}
		  }
		}
	  }
	},
	colors: ['#0db2de'],
  fill: {
   type: "gradient",
   gradient: {
    shade: "dark",
    type: "horizontal",
    shadeIntensity: .5,
    gradientToColors: ['#005bea'],
    inverseColors: !0,
    opacityFrom: 1,
    opacityTo: 1,
    stops: [0, 100]
   }
  },
	stroke: {
	  dashArray: 4
	},
   series: [83],	
		labels: [""],
		color:'#fff',
	};

	var chart = new ApexCharts(document.querySelector("#chart"), options);
	chart.render();
	/*--- Apex (#chart)closed ---*/
	
	
	
	/*--- Apex (#spark1) ---*/
	var spark1 = {
    chart: {
		id: 'spark1',
		group: 'sparks',
		type: 'line',
		height: 38,
		sparkline: {
		  enabled: true
		},
		dropShadow: {
		  enabled: true,
		  top: 1,
		  left: 1,
		  blur: 1,
		  opacity: 0.1,
		}
	  },
	  series: [{
		data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
	  }],
	  stroke: {
		curve: 'smooth'
	  },
	  markers: {
		size: 0
	  },
	  grid: {
		padding: {
		  top: 10,
		  bottom: 10,
		  left: 50
		}
	  },
	  colors: ['#0a9ae1'],
	   stroke: {
		  width: 2
		},
	  tooltip: {
		x: {
		  show: false,
		  width: 1,
		},
		y: {
		  title: {
			formatter: function formatter(val) {
			  return '';
			}
		  }
		}
	  }
	}
	/*--- Apex (#spark1) closed ---*/
	
	/*--- Apex (#spark2) ---*/
	var spark2 = {
	  chart: {
		id: 'spark2',
		group: 'sparks',
		type: 'line',
		height: 38,
		sparkline: {
		  enabled: true
		},
		dropShadow: {
		  enabled: true,
		  top: 1,
		  left: 1,
		   blur: 1,
		  opacity: 0.1,
		}
	  },
	  series: [{
		data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
	  }],
	  stroke: {
		curve: 'smooth'
	  },
	  grid: {
		padding: {
		  top: 10,
		  bottom: 10,
		  left: 50
		}
	  },
	  markers: {
		size: 0
	  },
	  colors: ['#ff516e'],
	   stroke: {
		  width: 2
		},
	  tooltip: {
		x: {
		  show: false
		},
		y: {
		  title: {
			formatter: function formatter(val) {
			  return '';
			}
		  }
		}
	  }
	}
	/*--- Apex (#spark2) closed ---*/
	
	/*--- Apex (#spark3) ---*/
	var spark3 = {
	  chart: {
		id: 'spark3',
		group: 'sparks',
		type: 'line',
		height: 38,
		sparkline: {
		  enabled: true
		},
		dropShadow: {
		  enabled: true,
		  top: 1,
		  left: 1,
		   blur: 1,
		  opacity: 0.1,
		}
	  },
	  series: [{
		data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
	  }],
	  stroke: {
		curve: 'smooth'
	  },
	  markers: {
		size: 0
	  },
	  grid: {
		padding: {
		   top: 10,
		  bottom: 10,
		  left: 50
		}
	  },
	  colors: ['#28b98a'],
	  xaxis: {
		crosshairs: {
		  width: 1
		},
	  },
	   stroke: {
		  width: 2
		},
	  tooltip: {
		x: {
		  show: false
		},
		y: {
		  title: {
			formatter: function formatter(val) {
			  return '';
			}
		  }
		}
	  }
	}
	/*--- Apex (#spark3) closed ---*/
	
	/*--- Apex (#spark4) ---*/

	var spark4 = {
	  chart: {
		id: 'spark4',
		group: 'sparks',
		type: 'line',
		height: 38,
		sparkline: {
		  enabled: true
		},
		dropShadow: {
		  enabled: true,
		  top: 1,
		  left: 1,
		  blur: 1,
		  opacity: 0.1,
		}
	  },
	  series: [{
		data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61]
	  }],
	  stroke: {
		curve: 'smooth'
	  },
	  markers: {
		size: 0
	  },
	  grid: {
		padding: {
		   top: 10,
		  bottom: 10,
		  left: 50
		}
	  },
	  colors: ['#f48846'],
	  xaxis: {
		crosshairs: {
		  width: 1
		},
	  },
	   stroke: {
		  width: 2
		},
	  tooltip: {
		x: {
		  show: false
		},
		y: {
		  title: {
			formatter: function formatter(val) {
			  return '';
			}
		  }
		}
	  }
	}
	/*--- Apex (#spark4) closed ---*/
	
	/*--- Apex (#spark5) ---*/
	var spark5 = {
	  chart: {
		id: 'spark5',
		group: 'sparks',
		type: 'line',
		height: 38,
		sparkline: {
		  enabled: true
		},
		dropShadow: {
		  enabled: true,
		  top: 1,
		  left: 1,
		  blur: 1,
		  opacity: 0.1,
		}
	  },
	  series: [{
		data: [12, 25, 76, 35, 17, 43, 10, 26, 69, 31]
	  }],
	  stroke: {
		curve: 'smooth'
	  },
	  markers: {
		size: 0
	  },
	  grid: {
		padding: {
		   top: 10,
		  bottom: 10,
		  left: 50
		}
	  },
	  colors: ['#673ab7'],
	  xaxis: {
		crosshairs: {
		  width: 1
		},
	  },
	   stroke: {
		  width: 2
		},
	  tooltip: {
		x: {
		  show: false
		},
		y: {
		  title: {
			formatter: function formatter(val) {
			  return '';
			}
		  }
		}
	  }
	}


	new ApexCharts(document.querySelector("#spark1"), spark1).render();
	new ApexCharts(document.querySelector("#spark2"), spark2).render();
	new ApexCharts(document.querySelector("#spark3"), spark3).render();
	new ApexCharts(document.querySelector("#spark4"), spark4).render();
	new ApexCharts(document.querySelector("#spark5"), spark5).render();
	
	/*--- Apex (#spark5) closed ---*/
	
	
	/*--- Map ---*/
	$('#vmap2').vectorMap({
		map: 'usa_en',
		showTooltip: true,
		backgroundColor: '#fff',
		color: '#60adff',
		colors: {
			mo: '#9fceff',
			fl: '#60adff',
			or: '#409cff',
			ca: '#005cbf',
			tx: '#005cbf',
			wy: '#005cbf',
			ny: '#007bff'
		},
		hoverColor: '#222',
		enableZoom: false,
		borderWidth: 1,
		borderColor: '#fff',
		hoverOpacity: .85
	});
	/*--- Map closed ---*/
	
	$('.resp-tabs-list .index-valex').addClass('active');
	$('.second-sidemenu .index-valex').addClass('resp-tab-content-active');
	
	
});