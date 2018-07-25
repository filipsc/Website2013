$(document).ready(function() {


    //Set css in Firefox (Required to use the backgroundPosition js)
    $('#shutter1').css({backgroundPosition: '0px 0px'});
    $('#shutter2').css({backgroundPosition: '0px 0px'});
    $('#shutter3').css({backgroundPosition: '0px 0px'});
    $('#shutter4').css({backgroundPosition: '0px 0px'});
    
    //Animate the shutter  
    $("ul li a").hover(function(){
	$(this).parent().stop().animate({backgroundPosition: '(-200px 0px)'}, 500 );
    }, function() {
	$(this).parent().stop().animate({backgroundPosition: '(0px 0px)'}, 500 );
    }); 

    
    $('#button').click(function(){ $('#img-container').toggle(); });
});
