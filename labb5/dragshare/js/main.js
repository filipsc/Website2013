$(document).ready(function(){

    // Selection
    // ============================
    
    // Store the selections in variables
    var image = $('#content > img');
    var targets = $("#targets").addClass('drop'); // Hint to include a hook in the CSS
    var icons = $('li',targets);
    
    // (Filter title attributes that should be removed)

    // DOM Preparation
    // ============================

    // 0.
    $("#content img").removeAttr("title"); //Removes the cats title.

    // 1. Iterate through the icons, fetch its title, append it as a span and remove it.
    $("#targets li a").each(function() {
    	var title = $(this).attr("title");
    	$(this).append("<span>" + title + "</span>");
    	$(this).removeAttr("title");
    });
    $("#targets li a").css({"position" : "relative"});
    $("#targets li a span").css({"text-indent" : "0", "color" : "red", "display" : "block", "z-index" : "1340", "background-color" : "lightblue", "visibility" : "hidden", "position" : "absolute", "width" : "150px", "height" : "16px", "bottom" : "-25px", "left" : "-30px", "padding" : "2px", "border-radius" : "5px"});

    // 2. Create the "shelf", the "overlay", the "tooltip" and the "helper" (without text and image, as a placeholder)
    //    and include them in the DOM. (Appending them to the body is good enough).
    
    // Shelf
    targets.wrap("<div id='shelf' / >");
    var shelf = $("#shelf");
    shelf.css({"z-index" : "1339", "background" : "url('./images/shelf.png') no-repeat", "height" : "163px", "width" : "351px", "margin" : "0 auto", "position" : "relative", "left" : "-15px", "opacity" : 0});

    //Overlay
    $("body").after("<div id='overlay' / >");
    var overlay = $("#overlay");
    overlay.css({"z-index" : "1338", "background-color" : "green", "opacity" : "0", "visibility" : "hidden", "position" : "absolute", "top" : "0", "left" : "0", "width" : "100%", "height" : "100%"});

    // Tooltip
    $("body").append("<span id='tip'>Drag this image to share it</span>");
    var tooltip = $("#tip");
    tooltip.css({"position" : "absolute", "z-index" : "1337", "background-color" : "black", "color" : "white", "height" : "20px", "width" : "auto", "border-radius" : "5px", "padding" : "5px"});
   	tooltip.fadeOut(0);

    // 3. Declare a function to be called everytime we want the tooltip to be shown.
    var showTip = function(e) {
		// Prepare the tooltip's position using
		// the mouse coordinates stored in the event e.
		// i.e use e.pageX and e.pageY to position the tooltip
		// before you fade it in.
		tooltip.css({"left" : e.pageX + 15, "top" : e.pageY -10});
		tooltip.stop().fadeIn(1000);
    }

    // 4. Bind that function to fire when the mouse goes over the image
    image.bind("mouseenter", showTip);  

    // 5. When the mouse is moved over the image (before dragging)
    image.mousemove(function(e) {
    	tooltip.css({"left" : e.pageX + 15, "top" : e.pageY - 10});
	});  
    image.mouseleave(function() {tooltip.stop().fadeOut(1000)});  


    // 6. Make the image draggable (We use the JQuery UI utility)
    $("body").css("overflow", "hidden") //NO SCROLLBAR
    var speed = 1000; //Time the animations will take.

    //The standard hidden top/bottom positions and their calculations
    var posBot = $(window).height() - shelf.offset().top; //Calculate where to start from.
    var posTop = -$(window).height() - posBot; //Due to "targets" being inside "shelf", the position of them shelf has to be taken into consideration.
    shelf.css("top", posBot);
	targets.css({"position" : "relative", "top" : posTop, "opacity" : "0"});


    image.draggable({  
	cursor: "pointer",  
	helper: function() {
	    // prepare the help: Add the image to it with a #thumb id
	    var helper = "<div id='miniature'><span>" + image.attr("alt") + "</span><img src='" + image.attr("src") + "'></div>";
	    //return helper.appendTo('body');
	    return helper;
	},  
	cursorAt: ($.browser.webkit)?{left: -560, top: 0 }:{ left: -15, top: 0 }, //cursorAt: { left: -15, top: 0 },  
	zIndex: 99999,  
	start: function() {  // when the drag start
	    $(this).unbind("mouseenter");
	    tooltip.stop().fadeOut(0); //Hide tooltip
	    // 0. disable the display of the tooltip (already done the line above)
	    // 1. Fade in the overlay
	    overlay.css("visibility", "visible");
	    overlay.stop().animate({
	    	opacity: 0.3
	    }, {
	    	queue : false,
	    	duration : speed
	    });
	    // 2. Animate the shelf upwards
	    shelf.stop().animate({
	    	top : 0,
	    	opacity : 1
	    }, {
	    	queue : false,
	    	duration : speed
	    });
	    // 3. Animate the icons downwards (do not queue those animations)
	    targets.stop().animate({
	    	top : "15px",
	    	opacity : "1"
	    }, {
	    	queue : false,
	    	duration : speed
	    });
	},
	stop: function(){  // when the drag stop
	    // 1. Animate the icons upwards
	    targets.stop().animate({
	    	top : posTop,
	    	opacity : 0
	    }, {
	    	queue : false,
	    	duration : speed
	    });
	    // 2. Animate the shelf downwards
	    shelf.stop().animate({
	    	top : posBot,
	    	opacity : 0
	    }, {
	    	queue : false,
	    	duration : speed
	    });
	    // 3. Fade away the overlay
	    overlay.stop().animate({
	    	opacity: 0
	    }, {
	    	queue : false,
	    	duration : speed,
	    	complete : function() {
	    		overlay.css("visibility", "hidden");
	    	}
	    });
	    // 4. enable the display of the tooltip (already done the line below)
	    $(this).bind("mouseenter", showTip);
	}
    });

    // 7. Make the targets droppable
    icons.hover(function(){ $(this).addClass("active"); $(this).find("span").css({"visibility" : "visible"});},
		function(){ $(this).removeClass("active"); $(this).find("span").css({"visibility" : "hidden"});})
	.mouseup(function(){ // When the mouse is released
	    // if the current icon is active, open a new window and pass it the URL location and the title
	    ic = $(".active");
	    if (ic.length === 0) {
	    	// do nothing
	    } else {
	    	window.open(ic.find("a").attr("href"), image.attr("alt"));
	    }
	    // with a call to       window.open( /* URL */, /* Title*/ );
    });

    // 8. Enjoy your result, it's not a trivial exercise, well done!

});

