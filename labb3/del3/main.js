$(document).ready(function() {
	var text = $("h1+p").html();
	var subText = text.substring(0, 428);
	var subText2 = text.substring(428, text.length);

	var full = false;
	
	$("h1+p").html(subText);
	var thing = "<p id='morestuff'>" + subText2 + "</p>";
	$("h1+p").after(thing, "<p id='clicker'>Read more... </p>");
	$("#morestuff").slideUp(0);
	$("#morestuff").css("opacity", "0");
	$("#clicker").css("cursor", "pointer");
	$("#clicker").css("font-weight", "bold");
	$("#clicker").click( function(){
		if(full){
			$("#clicker").html("Read more..");
			$("#morestuff").stop().animate({
				opacity: '0',
				height:"hide"
			}, 2000);
			full = false;
		}else{
			$("#clicker").html("Read less...");
			$("#morestuff").stop().animate({
				opacity:'1',
				height:"show"
			}, 2000); 
			full = true;
		}
	});
});