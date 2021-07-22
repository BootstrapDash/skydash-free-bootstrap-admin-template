$(document).ready(function () {
    var owl = $('.owl-carousel2');
	owl.owlCarousel({
		loop:true,
		margin:25,
		autoplay:true,
		nav: false,
		dots: false,
		slideTransition: 'linear',
		autoplayTimeout: 4000,
		smartSpeed: 4000,
		animateIn: 'linear',
		animateOut: 'linear',
		autoplayHoverPause:true,
		responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				992:{
					items: 2,
					nav: true
				},
				1300: {
					items: 4,
					nav: true
				},
				
			}
	});
	
	// ______________Owl-carousel-icons2
	var owl = $('.owl-carousel-icons2');
	owl.owlCarousel({
		loop: true,
		rewind: false,
		margin: 25,
		animateIn: 'fadeInDowm',
		animateOut: 'fadeOutDown',
		autoplay: false,
		autoplayTimeout: 5000, // set value to change speed
		autoplayHoverPause: true,
		dots: false,
		nav: true,
		autoplay: true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav: true
			},
			600: {
				items: 2,
				nav: true
			},
			1300: {
				items: 4,
				nav: true
			}
		}
	})
});