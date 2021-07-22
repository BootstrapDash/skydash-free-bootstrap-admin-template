$(function(e) {
	'use strict'
	/*----Echart2----*/
	var chartdata = [{
		name: 'sales',
		type: 'bar',
		data: [10, 15, 9, 18, 10, 15]
	}, {
		name: 'profit',
		type: 'line',
		smooth: true,
		data: [8, 5, 25, 10, 10]
	}, {
		name: 'growth',
		type: 'bar',
		data: [10, 14, 10, 15, 9, 25]
	}];
	var chart = document.getElementById('echart1');
	var barChart = echarts.init(chart);
	var option = {
		grid: {
			top: '6',
			right: '0',
			bottom: '17',
			left: '25',
		},
		xAxis: {
			data: ['2014', '2015', '2016', '2017', '2018'],
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		tooltip: {
			show: true,
			showContent: true,
			alwaysShowContent: true,
			triggerOn: 'mousemove',
			trigger: 'axis',
			axisPointer: {
				label: {
					show: false,
				}
			}
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		series: chartdata,
		color: ['#9567e0', '#e09567', '#d267e0', ]
	};
	barChart.setOption(option);


	/*----Echart2----*/
	var chartdata2 = [{
		name: 'sales',
		type: 'line',
		smooth: true,
		data: [12, 25, 12, 35, 12, 38],
		color: ['#9567e0']
	}, {
		name: 'Profit',
		type: 'line',
		smooth: true,
		size: 10,
		data: [8, 12, 28, 10, 10, 12],
		color: ['#d267e0']
	}];
	var chart2 = document.getElementById('echart2');
	var barChart2 = echarts.init(chart2);
	var option2 = {
		grid: {
			top: '6',
			right: '0',
			bottom: '17',
			left: '25',
		},
		xAxis: {
			data: ['2014', '2015', '2016', '2017', '2018'],
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		series: chartdata2,
		color: ['#9567e0', '#e09567', '#d267e0', ]
	};
	barChart2.setOption(option2);


	/*----Echart3----*/
	var option3 = {
		grid: {
			top: '6',
			right: '0',
			bottom: '17',
			left: '32',
		},
		xAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		yAxis: {
			type: 'category',
			data: ['2014', '2015', '2016', '2017', '2018'],
			splitLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		series: chartdata,
		color: ['#9567e0', '#e09567', '#d267e0', ]
	};
	var chart3 = document.getElementById('echart3');
	var barChart3 = echarts.init(chart3);
	barChart3.setOption(option3);


	/*----Echart4----*/
	var option4 = {
		grid: {
			top: '6',
			right: '0',
			bottom: '17',
			left: '32',
		},
		xAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		yAxis: {
			type: 'category',
			data: ['2014', '2015', '2016', '2017', '2018'],
			splitLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		series: chartdata2,
		color: ['#d267e0', '#9567e0', '#e09567']
	};
	var chart4 = document.getElementById('echart4');
	var barChart4 = echarts.init(chart4);
	barChart4.setOption(option4);


	/*----Echart5----*/
	var chartdata3 = [{
		name: 'sales',
		type: 'bar',
		stack: 'Stack',
		data: [14, 18, 20, 14, 29, 21, 25, 14, 24]
	}, {
		name: 'Profit',
		type: 'bar',
		stack: 'Stack',
		data: [12, 14, 15, 50, 24, 24, 10, 20, 30]
	}];
	var option5 = {
		grid: {
			top: '6',
			right: '0',
			bottom: '17',
			left: '25',
		},
		xAxis: {
			data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		series: chartdata3,
		color: ['#d267e0', '#9567e0']
	};
	var chart5 = document.getElementById('echart5');
	var barChart5 = echarts.init(chart5);
	barChart5.setOption(option5);


	/*----Echart6----*/
	var option6 = {
		grid: {
			top: '6',
			right: '10',
			bottom: '17',
			left: '32',
		},
		xAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		yAxis: {
			type: 'category',
			data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
			splitLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		series: chartdata3,
		color: ['#d267e0', '#9567e0']
	};
	var chart6 = document.getElementById('echart6');
	var barChart6 = echarts.init(chart6);
	barChart6.setOption(option6);


	/*----Echart7----*/
	var chartdata4 = [{
		name: 'data',
		type: 'line',
		data: [20, 20, 36, 18, 15, 20, 25, 20]
	}];
	var option7 = {
		grid: {
			top: '6',
			right: '0',
			bottom: '17',
			left: '25',
		},
		xAxis: {
			data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		series: chartdata4,
		color: ['#d267e0']
	};
	var chart7 = document.getElementById('echart7');
	var lineChart = echarts.init(chart7);
	lineChart.setOption(option7);


	/*----Echart8----*/
	var chartdata5 = [{
		name: 'data',
		type: 'line',
		smooth: true,
		data: [20, 20, 36, 18, 15, 20, 25, 20]
	}];
	var option8 = {
		grid: {
			top: '6',
			right: '0',
			bottom: '17',
			left: '25',
		},
		xAxis: {
			data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		series: chartdata5,
		color: ['#9567e0']
	};
	var chart8 = document.getElementById('echart8');
	var lineChart2 = echarts.init(chart8);
	lineChart2.setOption(option8);
	
	
	/*----BarChartEchart----*/
	var echartBar = echarts.init(document.getElementById('index'), {
		color: ['#9567e0', '#e09567'],
		categoryAxis: {
			axisLine: {
				lineStyle: {
					color: '#888180'
				}
			},
			splitLine: {
				lineStyle: {
					color: ['#eee']
				}
			}
		},
		grid: {
			x: 40,
			y: 20,
			x2: 40,
			y2: 20
		},
		valueAxis: {
			axisLine: {
				lineStyle: {
					color: '#888180'
				}
			},
			splitArea: {
				show: true,
				areaStyle: {
					color: ['rgba(255,255,255,0.1)']
				}
			},
			splitLine: {
				lineStyle: {
					color: ['#eee']
				}
			}
		},
	});
	echartBar.setOption({
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['New Account', 'Expansion Account']
		},
		toolbox: {
			show: false
		},
		calculable: false,
		xAxis: [{
			type: 'category',
			data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: 'View Price',
			type: 'bar',
			data: [30.0, 42.3, 60.2, 70.3, 60.8, 19.8, 27.8, 85.63, 52.63, 14.25, 63.25, 12.32],
			markPoint: {
				data: [{
					type: 'max',
					name: ''
				}, {
					type: 'min',
					name: ''
				}]
			},
			markLine: {
				data: [{
					type: 'average',
					name: ''
				}]
			}
		}, {
			name: ' Purchased Price',
			type: 'bar',
			data: [16.6, 40.9, 50.0, 16.4, 28.7, 80.7, 178.6, 188.2, 48.7, 18.8, 6.0, 2.3],
			markPoint: {
				data: [{
					name: 'Purchased Price',
					value: 182.2,
					xAxis: 7,
					yAxis: 183,
				}, {
					name: 'Purchased Price',
					value: 2.3,
					xAxis: 11,
					yAxis: 3
				}]
			},
			markLine: {
				data: [{
					type: 'average',
					name: ''
				}]
			}
		}]
	});
});