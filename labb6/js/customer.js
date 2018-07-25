$(document).ready(function() {

	$("#paydesk").hide();
	$("#fog").hide();

	$(".add-button").click(function(){
		var mover = $(this).parent().clone();
		mover.children("img").attr("src", "./img/minus.png");
		mover.children("img").removeClass("add-button");
		mover.children("img").addClass("remove-button").bind("click", removeElement);
		$("div.order ul").append(mover);
	});


	function removeElement(){
		$(this).parent().detach();
	}

	$("#proceed-order").click(function(){
		var orderSet = new Array();
		$("div.order ul li").each(function(i){	//save all the listitems from the order
			var tmpElement = $(this).clone();
			tmpElement.children("img").remove();
			orderSet[i] = tmpElement;
		});

		for(var i = 0; i < orderSet.length; i++){
			var current = orderSet[i];
			$("div#paydesk ul").append(current);
		}

		$("#fog").show();
		$("div#paydesk").fadeIn(1000);

	});

	$("#fog").click(function(){
		$("#fog").hide();
		$("div#paydesk ul").empty();
		$("div#paydesk").fadeOut(1000);
	});

	$("#back-button").click(function(){
		$("#fog").hide();
		$("div#paydesk ul").empty();
		$("div#paydesk").fadeOut(1000);
	});

});