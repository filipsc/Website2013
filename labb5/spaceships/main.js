$(document).ready(function() {
	// Add the image viewer -START-<
	$("#wrap").after("<div id='viewer'><div id=images><img id='jsleft' class='jsarrow' src='./img/leftarrow.png'><img id='full-image' src='./img/spaceships/battlestar.jpg'><img id='full-image-alt' src='./img/spaceships/enterprise.jpg'><img id='jsright' class='jsarrow' src='./img/rightarrow.png'></div></div>");
	$("#viewer").css({"position" : "absolute",
					"background-color" : "rgba(0, 0, 0, 0.3)",
					"padding-top" : "50px",
					"top" : "0px",
					"z-index": "1",
					"width" : "100%",
					"height" : "100%"});
	$("div#images").css({"border" : "3px solid blue", "display" : "inline-block", "position" : "relative", "z-index" : "100", "background-color" : "black"});
	$("#full-image-alt").css({"position" : "absolute", "top" : "0px", "left" : "0px"});

	// Navigation arrows stuff (+hide the arrows by default)
	$(".jsarrow").css({"z-index" : "200", "position" : "absolute", "top" : "284px", "visibility" : "hidden"});
	$("#jsleft").css({"left" : "20px"});
	$("#jsright").css({"right" : "20px"});

	// Hide the second img container
	$("#full-image-alt").hide(0);
    //Hide the image viewer by default.
	$("#viewer").hide(0); 

	$("div#viewer img.jsarrow").hover(function() {
		$(this).css({"cursor" : "pointer"});
	});

	$("div#images").mousemove(function(e) {
		var x = e.pageX - this.offsetLeft;
    	//var y = e.pageY - this.offsetTop;
    	if (x < 100) {
    		$("#jsleft").css({"visibility" : "visible"});
    	} else if (x > 700) {
    		$("#jsright").css({"visibility" : "visible"});
    	} else {
    		//hide them again
    		$(".jsarrow").css({"visibility" : "hidden"});
    	}
	});


	// Hide/remove image viewer when clicking outside of it.
	$("div#viewer").mouseup(function(e){
		if(!$("#jsleft").is(e.target) && !$("#jsright").is(e.target) && !$("#full-image").is(e.target)) {
			console.log("clicked outside of img thingy")
			$("#viewer").fadeOut(1000);
		}
	});
	
	// Show image viewer when clicking
	var clickedImg;
	$("div#img-wrap a").click(function(e) {
		e.preventDefault(); //Prevent from following the link to the php viewer.

		//Change the image to the one we clicked on.
		clickedImg = $(this).children("img").attr("alt"); 
		console.log(clickedImg);
		$("#full-image").attr("src", "./img/spaceships/" + clickedImg + ".jpg"); 

		//Zoom out and move the image to the correct spot.
		$("#viewer").show(0);
		var pos = $(this).offset();
		var posLeft = $("#img-wrap").offset().left - 65;
		$("div#images").css({"position" : "relative", "top" : (pos.top - 146), "left" : pos.left}).stop().animate({
			"top" : "50px",
			"left" :  posLeft
		}, 1000);
		$("#full-image").css({"width" : "200", "height" : "150"}).stop().animate({
			"height" : "600px",
			"width" : "800px"
		}, 1000, function(){
			//stuff after the animation is complete.
		});
	});


	//Get all the spaceshipsssssss
	var spaceships = new Array();
	$("div#img-wrap img").each(function(i){
		spaceships[i] = $(this).attr("src");
	});

	// Takes out the name of the ship.
	$.each(spaceships, function(i) {
		spaceships[i] = spaceships[i].replace("./img/spaceships_thumbs/", ""); // Sets the folder to be only spaceships
		spaceships[i] = spaceships[i].substring(0, (spaceships[i].length - 10)); // Removes the end of the file name, including the thumb part.
	});

	var spacenumbers = new Object(); 
	$.each(spaceships, function(i) {
		spacenumbers[spaceships[i]] = i;
	});

	$("#jsleft").click(function(){
		if(spacenumbers[clickedImg] == 0){
			clickedImg = spaceships[spaceships.length - 1];
		}else{
			clickedImg = spaceships[spacenumbers[clickedImg] - 1];
		}
		changeViewerImage(clickedImg);
	});

	$("#jsright").click(function(){
		if(spacenumbers[clickedImg] + 1 == spaceships.length){
			clickedImg = spaceships[0];
		}else{
			clickedImg = spaceships[spacenumbers[clickedImg] + 1];
		}
		changeViewerImage(clickedImg);
	});

	// Replace the image inside the viewer.
	var boolImage = true;	//if true, the original top layer is shown
	function changeViewerImage(sentImage){
		var tmpImgSrc = "./img/spaceships/" + sentImage + ".jpg";
		if(boolImage){
			$("#full-image-alt").attr("src", tmpImgSrc);
			$("#full-image").stop().fadeTo("slow", 0);
			$("#full-image-alt").stop().fadeTo("slow",1);
			boolImage = false;
		}else{
			$("#full-image").attr("src", tmpImgSrc);
			$("#full-image").stop().fadeTo("slow", 1);
			$("#full-image-alt").stop().fadeTo("slow", 0);
			boolImage = true;
		}
	}
});