jQuery(document).ready(function ($){ 

    if(Modernizr.csstransitions){
		console.log('transitions not supported');
		$('#stack ul').removeClass('css');

		var stack = $('#stack');
		var acrobat   = $('li#acrobat a',stack);
		var aperture  = $('li#aperture a',stack);
		var coda      = $('li#coda a',stack);
		var finder    = $('li#finder a',stack);
		var photoshop = $('li#photoshop a',stack);
		var safari    = $('li#safari a',stack);


		// your stack animation
		// ...
		stack.hover(function(){
			$("#acrobat").stop().animate({
				top : '-435px',
				left : '-10px' 
			});
			$("#aperture").stop().animate({
				top : '-356px',
				left : '-20px' 
			});
			$("#coda").stop().animate({
				top : '-277px',
				left : '-30px' 
			});
			$("#finder").stop().animate({
				top : '-198px',
				left : '-30px' 
			});
			$("#photoshop").stop().animate({
				top : '-119px',
				left : '-20px' 
			});
			$("#safari").stop().animate({
				top : '-40px',
				left : '-10px' 
			});
		}, function(){
				$("li").stop().animate({
				top : '0px',
				left : '0px' 
			});
			}
		);
		// your label animation
		// ...
		$("li").hover(function(){
			console.log("hovering over li");
			$(this).find('span').stop().animate({
				left : "-80px"
			});
		}, function(){
			console.log("hovering out from li");
			$("li").find('span').stop().animate({
				left : "-60px" 
			});
		});

    }  else {
    	console.log("transitions supported");
    }


});
