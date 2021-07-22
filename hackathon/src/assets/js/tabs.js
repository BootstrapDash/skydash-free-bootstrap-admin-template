(function($) {
    "use strict";
	
	$(".first_tab").champ();
	$(".accordion_example").champ({
		plugin_type: "accordion",
		side: "left",
		active_tab: "3",
		controllers: "true"
	});

	$(".right_tab").champ({
		plugin_type: "tab",
		side: "right",
		active_tab: "1",
		controllers: "false"
	});

	$(".left_tab").champ({
		plugin_type: "tab",
		side: "left",
		active_tab: "1",
		controllers: "false"
	});
	
})(jQuery);