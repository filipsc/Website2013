$(document).ready(function() {

	$("#first-header").click(function() {
		$("#first-content").slideToggle("slow");
	});

	$("#first-content").hover(
		function() {
			$(this).css("font-weight", "bold");
		},
		function() {
			$(this).css("font-weight", "normal");
	});

	var changeColor = false;	//used to toggle changeColor-button

	$("#color").click(function() {
		if(changeColor==true){
			$("div div+p").css("color", "black");
			changeColor=false;
		}
		else{
			$("div div+p").css("color", "red");
			changeColor=true;
		}
	});

	var background = false;	//used to toggle background-button

	$("span+span").click(function() {
		if(background==true){
			$("div div+p").removeClass("bcolored");
			background=false;
		}
		else{
			$("div div+p").addClass("bcolored");
			background=true;
		}
	});

	var show = true;

	$("div.control:first-child span").click(function() {
		if(show==true) {
			$("#page-wrap").fadeTo("slow", 0);
			$("#page-wrap").slideUp("slow");
			$("div.control:first-child span").html("open all");
			show = false;
		} else {
			$("#page-wrap").slideDown("slow");
			$("#page-wrap").fadeTo("slow", 1);
			$("div.control:first-child span").html("close all");
			show = true;
		}
	});
});