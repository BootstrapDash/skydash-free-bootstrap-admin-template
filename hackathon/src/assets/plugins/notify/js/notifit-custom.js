function not1() {
	notif({
		msg: "Default <b>Top</b> Notification",
		position: "top",
	});
}

function not2() {
	notif({
		msg: "Default <b>Center</b> Notification",
		position: "center"
	});
}

function not3() {
	notif({
		msg: "Default <b>Left</b> Notification",
		position: "left"
	});
}

function not4() {
	notif({
		msg: "Default <b>Center Full width</b> Notification",
		width: "all",
		position: "center"
	});
}

function not5() {
	notif({
		msg: "Default <b>Right</b> Notification",
		position: "right",
		bottom:'10'
	});
}
function not51() {
	notif({
		msg: "Default <b>Bottom</b> Notification",
		position: "bottom",
		bottom:'10'
	});
}
function not6() {
	notif({
		type: "primary",
		msg: "Welcome to VALEX",
		position: "right",
		bottom:'10'
	});
}
function not7() {
	notif({
		msg: "<b>Success:</b> Well done Details Submitted Successfully",
		type: "success"
	});
}

function not8() {
	notif({
		msg: "<b>Oops!</b> An Error Occurred",
		type: "error",
		position: "center"
	});
}

function not9() {
	notif({
		type: "warning",
		msg: "<b>Warning:</b> Something Went Wrong",
		position: "left"
	});
}

function not10() {
	notif({
		type: "info",
		msg: "<b>Info: </b>Some info here.",
		width: "all",
		position: "center"
	});
}

function not11() {
	notif({
		type: "error",
		msg: "<b>Error: </b>This error will stay here until you click it.",
		position: "center",
		autohide: false
	});
}

function not12() {
	notif({
		type: "dark",
		msg: "Opacity is cool!",
		position: "center",
		opacity: 0.5
	});
}
function not13() {
	notif({
		type: "info",
		msg: "Testing a multiline text. Testing, one, two.. More.",
		position: "center",
		width: 150,
		autohide: false,
		multiline: true
	});
}
function not14() {
	notif({
		type: "success",
		msg: "Fade mode activated.",
		position: "right",
		fade: true
	});
}

function not15() {
	notif({
		msg: "Customize with your favourite color!",
		position: "left",
		bgcolor: "#8500ff",
		color: "#fff"
	});
}

function not16() {
	notif({
		msg: "Customize the timeout!",
		position: "left",
		time: 1000
	});
}
function not17() {
	var myCallback = function(choice){
		if(choice){
			notif({
				'type': 'success',
				'msg': 'Yeah!',
				'position': 'center'
			})
		}else{
			notif({
				'type': 'error',
				'msg': '<i class="far fa-sad-tear"></i>',
				'position': 'center'
			})
		}
	}

	notif_confirm({
		'textaccept': 'Stay Here',
		'textcancel': 'Close The Window',
		'message': 'Are you Sure You Want to Close?',
		'callback': myCallback
	})
}
function not18() {
	var myCallback = function(input){
		if(input){
			notif({
				'type': 'success',
				'msg': input,
				'position': 'center'
			})
		}else{
			notif({
				'type': 'error',
				'msg': 'Empty or cancelled',
				'position': 'center'
			})
		}
	}

	notif_confirm({
		'textaccept': 'That\'s it!',
		'textcancel': 'I don\'t have a pet :(',
		'message': 'What\'s your pet\'s name?',
		'callback': myCallback
	})
	
}

if ( $(window).width() < 767) {  
	function not4() {
		notif({
			msg: "Default <b>Center Full width</b> Notification",
			width: "350",
			position: "center"
		});
	}
	
	function not10() {
		notif({
			type: "info",
			msg: "<b>Info: </b>Some info here.",
			width: "350",
			position: "center"
		});
	}
} 