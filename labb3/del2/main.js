$(document).ready(function() {
	$("#inventory").tablesorter(); 
	$("th").hover(function() {
		$(this).css("cursor", "pointer");
	});
});