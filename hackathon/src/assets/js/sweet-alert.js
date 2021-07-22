$( document ).ready(function() {

	// Message
	$("#but1").click(function(){
		$('body').removeClass('timer-alert');
		var message = $("#message").val();
		if(message == ""){
			message  = "Your message";
		}
		swal(message);
	});

	// With message and title
	$("#but2").click(function(){
		var message = $("#message").val();
		$('body').removeClass('timer-alert');
		var title = $("#title").val();
		if(message == ""){
			message  = "Your message";
		}
		if(title == ""){
			title = "Your message";
		}
		swal(title,message);
	});

	// Show image
	$("#but3").click(function(){
		var message = $("#message").val();
		$('body').removeClass('timer-alert');
		var title = $("#title").val();
		if(message == ""){
			message  = "Your message";
		}
		if(title == ""){
			title = "Your message";
		}
		swal({
			title: title,
			text: message,
			imageUrl: '../../assets/img/brand/logo.png'
		});
	});

	// Timer
	$("#but4").click(function(){
		var message = $("#message").val();
		$('body').addClass('timer-alert');
		var title = $("#title").val();
		if(message == ""){
			message  = "Your message";
		}
		if(title == ""){
			title = "Your message";
		}
		message += "(close after 2 seconds)";
		swal({
			title: title,
			text: message,
			timer: 2000,
			showConfirmButton: false
		});
	});

	//
	$("#click").click(function(){
		$('body').removeClass('timer-alert');
		var type = $("#type").val();
		swal({
			title: "Title",
			text: "Your message",
			type: type
		});
	});

	// Prompt
	$("#prompt").click(function(){

		swal({
			title: "Add",
			text: "Enter your message",
			type: "input",
			showCancelButton: true,
			closeOnConfirm: false,
			inputPlaceholder: "Your message"
		},function(inputValue){


			if (inputValue != "") {
				swal("Input","You have entered : " + inputValue);

			}
		});
	});

	// Confirm
	$("#confirm").click(function(){
		swal({
			title: "Alert",
			text: "Are you really want to exit",
			type: "warning",
			showCancelButton: true,
			confirmButtonText: 'Exit',
			cancelButtonText: 'Stay on the page'
		});
	});


	$("#click").click(function(){
		swal('Congratulations!', 'Your message has been succesfully sent', 'success');
	});
	$("#click1").click(function(){
		swal({
			title: "Alert",
			text: "Waring alert",
			type: "warning",
			showCancelButton: true,
			confirmButtonText: 'Exit',
			cancelButtonText: 'Stay on the page'
		});
	});
	$("#click2").click(function(){
		swal({
			title: "Alert",
			text: "Danger alert",
			type: "error",
			showCancelButton: true,
			confirmButtonText: 'Exit',
			cancelButtonText: 'Stay on the page'
		});
	});

});