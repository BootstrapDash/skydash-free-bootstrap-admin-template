(function($) {
	"use strict";
	//fancyfileuplod
	$('#demo').FancyFileUpload({
	params : {
		 action : 'fileuploader'
		},
		maxfilesize : 1000000
	});
})(jQuery);