$(document).ready(function() {
	//"Override" the css, so it is not the one displaying the menus.
	if(Modernizr.csstransitions){
		console.log("transitions not supported");
		$("ul li ul").css("display", "none");
		
		$("li").has("ul").hover( function() {
			$(this).children("ul").stop().fadeTo("slow", 1);
		},
		function() {
			$(this).children("ul").stop().fadeTo("slow", 0);
		}); 
	} else {
		console.log("transitions supported");
	}

});