(function($) {
	"use strict";
	
    if ($('.clipboard-icon').length) {
      var clipboard = new ClipboardJS('.clipboard-icon');
	  
      $('.clipboard-icon').attr('data-toggle', 'tooltip').attr('title', 'Copy to clipboard');
	 
	  
      $('[data-toggle="tooltip"]').tooltip();
	  
       clipboard.on('success', function(e) {
        e.trigger.classList.value = 'clipboard-icon btn-current'
        $('.btn-current').tooltip('hide');
        e.trigger.dataset.originalTitle = 'Copied';
        $('.btn-current').tooltip('show');
        setTimeout(function(){
            $('.btn-current').tooltip('hide');
            e.trigger.dataset.originalTitle = 'Copy to clipboard';
            e.trigger.classList.value = 'clipboard-icon'
        },1000);
        e.clearSelection();
      });
    }
	
	
	
})(jQuery);