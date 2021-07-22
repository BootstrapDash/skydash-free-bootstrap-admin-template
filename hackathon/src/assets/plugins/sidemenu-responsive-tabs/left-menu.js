   (function($) {
	"use strict";
	
	// ______________Active Class
	$(".app-sidebar a").each(function() {
	  var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) { 
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().prev().click(); // click the item to make it drop
		}
	});
	
	//Active Class
	$(".app-sidebar a").each(function() {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().addClass("resp-tab-content-active"); // add active to li of the current link
			$(this).parent().parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().parent().prev().click(); // click the item to make it drop
		}
	});
	
	$(".submenu-list li a").each(function() {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().parent().parent().parent().parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().parent().parent().parent().addClass("resp-tab-content-active"); // add active to li of the current link
			$(this).parent().parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().parent().prev().click(); // click the item to make it drop
		}
	});
	
	$(document).ready(function(){		
			
		if ($('.element-valex.active').hasClass('active'))
        $('li.element-valex').addClass('active');
	
		if ($('.pages-valex.active').hasClass('active'))
        $('li.pages-valex').addClass('active');
	
		if ($('.index-valex.active').hasClass('active'))
        $('li.index-valex').addClass('active');
	
		if ($('.widget-valex.active').hasClass('active'))
        $('li.widget-valex').addClass('active');
		
		if ($('.apps-valex.active').hasClass('active'))
        $('li.apps-valex').addClass('active');
	
		if ($('.utilites-valex.active').hasClass('active'))
        $('li.utilites-valex').addClass('active');
	
		if ($('.forms-valex.active').hasClass('active'))
        $('li.forms-valex').addClass('active');
	
		if ($('.charts-valex.active').hasClass('active'))
        $('li.charts-valex').addClass('active');
	
		if ($('.ecommerce-valex.active').hasClass('active'))
        $('li.ecommerce-valex').addClass('active');
		
		if ($('.custom-valex.active').hasClass('active'))
        $('li.custom-valex').addClass('active');
		
		if ($('.advanced-valex.active').hasClass('active'))
        $('li.advanced-valex').addClass('active');
	
		if ($('.mail-valex.active').hasClass('active'))
        $('li.mail-valex').addClass('active');
	
	});
	
	
	// VerticalTab
	$('#sidemenu-Tab').easyResponsiveTabs({
		type: 'vertical',
		width: 'auto', 
		fit: true, 
		closed: 'accordion',
		tabidentify: 'hor_1',
		activate: function(event) {
			var $tab = $(this);
			var $info = $('#nested-tabInfo2');
			var $name = $('span', $info);
			$name.text($tab.text());
			$info.show();
		}
	});
	
	const ps = new PerfectScrollbar('.first-sidemenu', {
	  useBothWheelAxes:true,
	  suppressScrollX:true,
	});
	const ps1 = new PerfectScrollbar('.second-sidemenu', {
	  useBothWheelAxes:true,
	  suppressScrollX:true,
	});
	
})(jQuery);