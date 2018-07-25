$(document).ready(function() {	
	
	$.getJSON( "./xml/pizza.php",      //The URL to perform the lookup
		{action : "getTop10"}, //The data you send
		function (result){     //The function to fire upon return
			$.each(result, function(i){
				console.log(result[i]);
				var name = result[i]['name'];
				var pop = result[i]['popularity'];
				$(".top10 ol").append("<li><span class='pizza-name'>"+name+"</span><span class='second'>"+pop+"</span>st</li>");
			});
		});
	});
