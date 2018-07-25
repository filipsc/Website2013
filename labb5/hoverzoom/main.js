$(document).ready(function() {
	// Add all the images
	$("div#wrap div").each(function(index, domEl){
		var id = $(domEl).attr("id");
		$(this).prepend("<img src=./img/" + id + ".jpg id=pic" + id + ">");
	});

	// When you hover a specific part of the menu change image
	$("div#wrap div").hide();
	var pathname = window.location.hash;
	console.log(pathname);
	if(pathname == ""){
		$("#one").show();
	}else{
		$(pathname).show();
	}
	var previous = "#one";
	$("a").hover(function(){
		var href = $(this).attr("href");
		$(previous).hide();
		$(href).show();
		previous = href;
	});


	$("ul").slideDown(0);
	$("#container").css({
		"height" : "200px"
	});

	$("div#wrap img").css({
		"width" : "600px",
		"position" : "absolute",
		"left" : "-50px"
	});

	var speed = 300;
	$("#container").hover(function(){
		$("ul").stop().slideDown(speed);
		$("div#wrap img").stop().animate({
			"width" : "500px",
			"left" : "0px"
		}, speed);
		$("div#wrap").stop().animate({
			"height": "180px"
		}, speed);
	}, function(){
		$("ul").stop().slideUp(speed);
		$("div#wrap img").stop().animate({
			"width" : "600px",
			"left" : "-50px"
		}, speed);
		$("div#wrap").stop().animate({
			"height": "200px"
		}, speed);
	});


});