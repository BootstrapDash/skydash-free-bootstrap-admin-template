 $(function() {
 	'use strict'
 	$('.main-sidebar .with-sub').on('click', function(e) {
 		e.preventDefault();
 		$(this).parent().toggleClass('show');
 		$(this).parent().siblings().removeClass('show');
 	})
 	$(document).on('click touchstart', function(e) {
 		e.stopPropagation();
 		// closing of sidebar menu when clicking outside of it
 		if (!$(e.target).closest('.main-header-menu-icon').length) {
 			var sidebarTarg = $(e.target).closest('.main-sidebar').length;
 			if (!sidebarTarg) {
 				$('body').removeClass('main-sidebar-show');
 			}
 		}
 	});
 	$('#mainSidebarToggle').on('click', function(e) {
 		e.preventDefault();
 		if (window.matchMedia('(min-width: 992px)').matches) {
 			$('body').toggleClass('main-sidebar-hide');
 		} else {
 			$('body').toggleClass('main-sidebar-show');
 		}
 	})
 	// Toggle Mail Menu
 	$('#mainMailLeftShow').on('click', function(e) {
 		e.preventDefault();
 		$('#mailMenu').toggleClass('d-none');
 	})
 });