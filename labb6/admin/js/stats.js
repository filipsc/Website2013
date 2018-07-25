$(document).ready(function(){
	/********************* ADD ALL THE PIZZAS *******************/
	$.getJSON( "../xml/pizza.php",      //The URL to perform the lookup
	{action : "getall"}, //The data you send
	function (result){     //The function to fire upon return
		//Add all the data to the table.
		var pizzalist;
		$.each(result, function(i) {
			
			var name = result[i]['name'];
			var desc = result[i]['description'];
			var pop = result[i]['popularity'];
			var id = i;
			
			var ings = "<table><thead><tr><td>Ingredient</td><td>Amount</td></tr></thead><tbody>";
			
			
			$.each(result[i]['ingredients'], function(i, value){
				ings += "<tr data-ID='"+i+"'><td class='itemname'>"+i+"</td><td class='itemamount'>"+value+"</td></tr>";
			});
			ings +="</tbody></table>";

			//Add the new row to the variable.
			pizzalist +="<tr data-ID='"+id+"'><td><span class='pizzaname'>"+name+"</span><br><span class='description'>"+desc+"</span></td><td class='pizzaingredients'>"+ings+
				"</td><td class='pizzapop'>"+pop+"</td></tr>";
			
		});
		//Add the pizza list
		$("div#pizzastats table tbody").append(pizzalist);

		$("#pizzastats > table").tablesorter({
			headers: { 
				1: { sorter: false}
			} //Disable sorting for 2nd row.
		}); 
		$("th").hover(function() {
			$(this).css("cursor", "pointer");
		});

		var sorting = [[0,0]]; 
   		// sort on the first column 
   		$("table").trigger("sorton",[sorting]);

		//Update tablesorter
		updateTable();

		//Replace the id in the ingredient list with the correct name.
		$.getJSON( "../xml/storage.php",      //The URL to perform the lookup
			{action : "getall"}, //The data you send
			function (result){     //The function to fire upon return
				$(".pizzaingredients tbody td.itemname").each(function(){
					var id = $(this).html();
					var name = result[id]['name'];
					$(this).html(name);
				});
			});
	});
	/************************** GET TOP10 ******************************/
	$.getJSON( "../xml/pizza.php",      //The URL to perform the lookup
		{action : "getTop10"}, //The data you send
		function (result){     //The function to fire upon return
			$.each(result, function(i){
				console.log(result[i]);
				var name = result[i]['name'];
				var pop = result[i]['popularity'];
				$(".top10 ol").append("<li><span class='pizza-name'>"+name+"</span><span class='second'>"+pop+"</span>st</li>");
			});
		});


	/******************* OTHER STUFF ********************************/

	//Updates the tablesorter, should be called when the table changes.
	function updateTable(){
		$("div#pizzastats > table").trigger("update");
	}
});