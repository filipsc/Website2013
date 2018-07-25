$(document).ready(function() {
	// Add the image viewer -START-
	$("#wrap").after("<div id='viewer'><img id='jsleft' class='arrow' src='./img/leftarrow.png'><img id='full-image' src='./img/spaceships/battlestar.jpg'><img id='jsright' class='arrow' src='./img/rightarrow.png'></div>");
	$("#viewer").css({"position" : "absolute",
					"background-color" : "rgba(0, 0, 0, 0.3)",
					"padding-top" : "50px",
					"top" : "0px",
					"z-index": 1,
					"width" : "100%",
					"height" : "100%"});
	$("#full-image").css({"border" : "5px solid blue"});
	$("#jsleft").css({"left" : "50px"});
	$("#jsright").css({"right" : "50px"});

	$("div#viewer img.arrow").hover(function() {
		$(this).css({"cursor" : "pointer"});
	});
	$("#viewer").hide(0);
	// Add the image viewer -END-

	// Hide/remove image viewer when clicking outside of it.
	$("div#viewer").mouseup(function(e){
		if(!$("#jsleft").is(e.target) && !$("#jsright").is(e.target) && !$("#full-image").is(e.target)) {
			console.log("clicked outside of img thingy")
			$("#viewer").fadeOut(500);
		}
	});
	
	// Show image viewer when clicking
	$("div#img-wrap a").click(function(e) {
		e.preventDefault();
		$("#viewer").fadeIn(500);
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
	
	// Get all the images in the specified folder. Inspiration from: http://jqfaq.com/how-to-load-all-files-from-directory-using-jquery/
	/*var dir = "./img/spaceships";
    var fileextension=".jpg";
    var spaceships = new Array();
      $.ajax({
            url: dir,
            success: function (data) {
                $(data).find("a:contains(" + fileextension + ")").each(function (i) {
                    var filename = this.href.replace(window.location.host, "").replace("http:///",""); 
                    console.log("filnamn:" + filename);              
                    //$("body").append($("<img src=" + Dir + filename + "></img>"));
                    spaceships[i] = filename;
                });
                console.log("spaace spaace" + spaceships.toString());
            }
        });
    console.log("spaaaaace" + spaceships.toString());*/
});