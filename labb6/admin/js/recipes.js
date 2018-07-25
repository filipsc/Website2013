$(document).ready(function(){
	/******************************** FETCH AND ADD THE DATA *************/
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
				"</td><td class='pizzapop'>"+pop+"</td><td class='menuitems'><span class='icon edit'>edit</span><span class='icon delete'>delete</span></td>";
			
		});
		//Add the pizza list
		$("div#recipe table tbody").append(pizzalist);

		$("#recipe > table").tablesorter({
		headers: { 
			1: { sorter: false},
			3: { sorter: false},
		}, //Disable sorting for 2nd and 4th row.
		}); 

		var sorting = [[0,0]]; 
        // sort on the first column 
        $("table").trigger("sorton",[sorting]); 

		//add hover for the headers.
		$("th.header").hover(function() {
			$(this).css("cursor", "pointer");
		});


		//Bind icons to the functions
		$(".icon.delete").bind("click", iconDelete);
		$(".icon.edit").bind("click", iconEdit);

		//Replace the id in the ingredient list with the correct name.
		$.getJSON( "../xml/storage.php",      //The URL to perform the lookup
			{action : "getall"}, //The data you send
			function (result){     //The function to fire upon return
				$(".pizzaingredients tbody td.itemname").each(function(){
					var id = $(this).html();

					var name;
					if (!result[id]) {
						name = "ERROR: ing does not exist";
					} else {
						name = result[id]['name'];
					}
					$(this).html(name);
				});
			});
	});

	/******************************* EDITOR *****************************/
	//Add a viewer in front of everything.
	$("body").append("<div id='viewer'><div id='area'><h1>TEMP</h1><table id='editables'></table>"+
		"<div class='viewerbuttons'><span class='icon done'>done</span><span class='icon cancel'>cancel</span></div></div>");
	$("div#viewer").css({
		"position" : "fixed", 
		"background-color" : "rgba(0, 0, 0, 0.3)", //Black with opacity
		"top" : "0px",
		"z-index" : "9999",
		"width" : "100%",
		"height" : "100%",
		"visibility" : "hidden"
	});

	$("div#viewer div#area").css({
		"border-radius" : "10px", 
		"border" : "5px solid red", 
		"background-color" : "white", 
		"width" : "224px",
		"margin" : "0 auto",
		"vertical-align" : "middle",
		"overflow" : "hidden",
		"position" : "relative",
		"top" : "0px"
	});

	$("div#viewer h1").css({"text-align" : "center", "font-size" : "26px"});
	$(".viewerbuttons").css({"text-align" : "center"});
	$(".viewerbuttons span").css({"height" : "24px", "width" : "24px"});

	/*************************** EDITING ********************************/

	$("#recipe .icon.delete").bind("click", iconDelete);
	//Deletes the row the icon is present on.
	function iconDelete(){
		var tablerow = $(this).parents("tr");
		console.log(tablerow.length);
		var id = tablerow.attr("data-ID");

		//TODO: some kind of confirmation dialog
		//Server: send delete to server
		$.getJSON( "../xml/pizza.php",      //The URL to perform the lookup
			{action : "delete", id : id}, //The data you send
			function (result){     //The function to fire upon return
				console.log("delete: " + result);
		});

		//Update tablesorter
		updateTable();


		tablerow.remove();
	}


	// Pressed edit
	$("#recipe .icon.edit").bind("click", iconEdit);
	function iconEdit(){
		var tablerow = $(this).parents("tr");
		var pizzaname = tablerow.find(".pizzaname").html();
		var pizzapop = tablerow.find(".pizzapop").html();
		var pizzadesc = tablerow.find(".description").html();		
		var ingredients = tablerow.find(".pizzaingredients tbody tr");
		var pizzaID = tablerow.attr("data-ID");

		var name = tablerow.find(".itemname").html();
		var amount = tablerow.find(".itemamount").html();

		//Clear the table
		$("div#viewer table tr").remove();

		//Add pizzaname and pizzapop.
		$("div#viewer table").append("<tr class='pizzaname'><td>Name</td><td><input type='text'></td></tr>");
		$("div#viewer table tr.pizzaname input").val(pizzaname);
		$("div#viewer table").append("<tr class='pizzapop'><td>Popularity</td><td><input type='number' readonly></td></tr>");
		$("div#viewer table tr.pizzapop input").val(pizzapop);
		$("div#viewer table").append("<tr class='pizzadesc'><td>Description</td><td><input type='text'></td></tr>");
		$("div#viewer table tr.pizzadesc input").val(pizzadesc);

		//Add ingredients.
		$("div#viewer table").append("<tr><td><h2>Ingredients</h2></td><td /><td class='viewerbuttons'><span class='icon add' /></td></tr>");		
		ingredients.each(function(){
			var itemname = $(this).find(".itemname").html();
			var itemamount = $(this).find(".itemamount").html();
			$("div#viewer table").append("<tr class='ingredient' data-ID='"+$(this).attr("data-ID")+"'><td class='itemn'>"+itemname+"</td><td><input type='number' value='"+itemamount+"'></td>"+
				"<td class='viewerbuttons'><span class='icon delete'>delete</span></td></tr>");	
		});

		//Set h1
		$("div#viewer div#area > h1").html("Edit");
		$("div#viewer").css("visibility", "visible");

		//Things to happen when clicking one of the buttons.
		$("div#viewer .icon.done").click(function(){
			//save the data...
			var pizzapop = $("div#viewer table tr.pizzapop input").val();
			var pizzaname = $("div#viewer table tr.pizzaname input").val();
			var pizzadesc = $("div#viewer table tr.pizzadesc input").val();
			var ingList = $("div#viewer table tr.ingredient");

			var error = false;
			//Checks for pizzaname.
			if (pizzaname.length == 0) {
				console.log("the pizzaname can not be empty");
				error = true;
			}

			//Check all of the ingredients
			ingList.each(function(){
				var itemamount = parseInt($(this).find("input").val(), 10);
				
				if (isNaN(itemamount)) {
					console.log("Ingredient value needs to be a number (in base10)");
					error = true;
				}
			});

			//If no errors save the data.
			if (error == false) {
				
				tablerow.find(".pizzaname").html(pizzaname);
				tablerow.find(".pizzapop").html(pizzapop);
				tablerow.find(".description").html(pizzadesc);

				//Update ingredientlist
				tablerow.find(".pizzaingredients tbody tr").remove(); //Remove the existing values.
				var ings = new Array();
				ingList.each(function(){
					//itemname is either found in a val() or html() depending if it is new or not.
					var itemname;
					var id;
					if ($(this).find("select.itemn").length > 0) {
						var num = $(this).find("select.itemn").val();
						itemname = $(this).find("select.itemn option[value="+num+"]").text();
						id = num;
					} else {
						itemname = $(this).find("td.itemn").html();
						id = $(this).attr("data-ID");
					}
					//The amount is easily found by getting the value.
					var itemamount = $(this).find("input").val();

					//Add the row with the ingredient info to the table.
					tablerow.find(".pizzaingredients tbody").append("<tr data-ID='"+id+"'><td class='itemname'>"+itemname+"</td><td class='itemamount'>"+itemamount+"</td></tr>");
					
					//add it to the array.
					ings[id] = itemamount;
				});

				//Server: send new data to server.
				$.getJSON( "../xml/pizza.php",      //The URL to perform the lookup
					{action : "set", id : pizzaID, description : pizzadesc, name : pizzaname, ingredients : ings}, //The data you send
					function (result){     //The function to fire upon return
						//nothing
				});

				//Close viewer
				$("div#viewer").css({"visibility" : "hidden"});

				unbindViewer();
			}
		});
		//cancel editing
		$("div#viewer .icon.cancel").bind("click", viewerCancel);

		//Add a new ingredient to edit on the list.
		$("div#viewer .icon.add").bind("click", viewerAddItem)

		//Remove a ingredient
		$("div#viewer .icon.delete").bind("click", viewerDelete);
	}

	function viewerCancel(){
		//Close viewer
		$("div#viewer").css({"visibility" : "hidden"});

		//Send nothing to server as nothing changed.

		unbindViewer();
	}

	function viewerDelete(){
		var row = $(this).parents("tr");

		//TODO: confirmation dialog

		//Remove row.
		row.remove();
	}

	//Get a selector with all available items
	function viewerAddItem(){
		//Server: get all ingredients and put them into select...
		$.getJSON( "../xml/storage.php",      //The URL to perform the lookup
			{action : "getall"}, //The data you send
			function (result){     //The function to fire upon return
				console.log(result);
				var sel = "<select class='itemn sortThis'>"
				$.each(result, function(i){
					sel +="<option value='"+i+"'>"+result[i]['name']+"</option>";
				});
				sel += "</select>"

				$("div#viewer table tbody tr:nth-child(4)").after("<tr class='ingredient'><td>"+sel+"</td><td><input type='number'></td>"+
					"<td class='viewerbuttons'><span class='icon delete'>delete</span></td></tr>");	
				$("div#viewer .icon.delete").bind("click", viewerDelete); //Bind the delete to the delete function.

				function MySort(a, b) {  
					var aVal = a.innerHTML;
					var bVal = b.innerHTML;
					if (aVal == bVal) {
						return 0;
					}
			   	 	return (aVal > bVal) ? 1 : -1;
				}
				console.log($("div#viewer select.sortThis option").length);
				$("div#viewer select.sortThis option").sort(MySort).appendTo('select.sortThis');
				var val = $("div#viewer select.sortThis option:first-of-type").val();
				$("div#viewer select.sortThis").removeClass("sortThis").val(val);

		});
	}
	
	function unbindViewer(){
		//Unbind events
		$("div#viewer .icon.done").unbind("click"); //So the event does not occur when another row uses the viewer.
		$("div#viewer .icon.cancel").unbind("click"); //So the event does not occur when another row uses the viewer.
	}

	/******************************************** ADD NEW PIZZA ITEM ********************/

	$("div.fullicon .icon.add").click(function(){
		//Clear the table
		$("div#viewer table tr").remove();

		//Add pizzaname and price.
		$("div#viewer table").append("<tr class='pizzaname'><td>Name</td><td><input type='text'></td></tr>");
		$("div#viewer table").append("<tr class='pizzapop'><td>Popularity</td><td><input value='0' type='number' readonly></td></tr>");
		$("div#viewer table").append("<tr class='pizzadesc'><td>Description</td><td><input type='text'></td></tr>");

		//Add ingredients.
		$("div#viewer table").append("<tr><td><h2>Ingredients</h2></td><td /><td class='viewerbuttons'><span class='icon add' /></td></tr>");	

		//Show viewer
		$("div#viewer div#area > h1").html("Add new");
		$("div#viewer").css("visibility", "visible");

		//When clicking done. DIFFERENT FROM NORMAL VIEWER...
		$("div#viewer .icon.done").click(function(){
			//save the data...
			var pizzaname = $("div#viewer table tr.pizzaname input").val();
			var pizzadesc = $("div#viewer table tr.pizzadesc input").val();
			var ingList = $("div#viewer table tr.ingredient");

			var error = false;

			//Checks for pizzaname.
			if (pizzaname.length == 0) {
				console.log("the pizzaname can not be empty");
				error = true;
			}

			//Check all of the ingredients
			ingList.each(function(){
				var itemamount = parseInt($(this).find("input").val(), 10);
				
				if (isNaN(itemamount)) {
					console.log("Ingredient value needs to be a number (in base10)");
					error = true;
				}
			});

			if (error == false) {
				var ings = new Array();
				var ingRows;
				ingList.each(function(){
					//itemname is either found in a val() or html() depending if it is new or not.
					var itemname;
					var id;
					if ($(this).find("select.itemn").length > 0) {
						num = $(this).find("select.itemn").val();
						itemname = $(this).find("select.itemn option[value="+num+"]").text();
						id = num;
					} else {
						itemname = $(this).find("td.itemn").html();
						id = $(this).attr("data-ID");

					}
					
					//The amount is easily found by getting the value.
					var itemamount = $(this).find("input").val();

					//Add the row with the ingredient info to the table.
					ingRows += "<tr data-ID='"+id+"'><td class='itemname'>"+itemname+"</td><td class='itemamount'>"+itemamount+"</td></tr>";

					//add it to the array.
					ings[id] = itemamount;
				});

				//TODO: Server: send the new stock item data to server. NEEDS TO BE DONE, CONNECT IT TO THE ADD ACTION IN PIZZA.PHP. (WHICH IS NOT WORKING)
				$.getJSON( "../xml/pizza.php",      //The URL to perform the lookup
					{action : "add", description : pizzadesc, name : pizzaname, ingredients : ings}, //The data you send
					function (result){     //The function to fire upon return
						var newID = result;
						//Add the new data with the given free id.
						$("#recipe > table > tbody").append("<tr data-ID='"+newID+"'><td><span class='pizzaname'>"+pizzaname+
							"</span><br><span class='description'>"+pizzadesc+"</span></td><td class='ingredients'>"+
							"<table><thead><tr><td>Ingredient</td><td>Amount</td></tr></thead><tbody>"+ingRows+"</tbody></table></td>"+
							"<td class='pizzapop'>0</td><td class='menuitems'><span class='icon edit'>edit</span><span class='icon delete'>delete</span></td></tr>");	
						
						//Update tablesorter, as we added a new element to the table.
						updateTable();
						
						//Bind new events for the added icons
						$("td.menuitems .icon.edit").bind("click", iconEdit);
						$("td.menuitems .icon.delete").bind("click", iconDelete);
				});

				//Close viewer
				$("div#viewer").css({"visibility" : "hidden"});

				//Unbind
				unbindViewer();
			}
		});

		$("div#viewer .icon.cancel").bind("click", viewerCancel);//Use same as normal viewer.
		$("div#viewer .icon.add").bind("click", viewerAddItem);//Use same as normal viewer.
		$("div#viewer .icon.delete").bind("click", viewerDelete);//Use same as normal viewer.

	});

	//Updates the tablesorter, should be called when the table changes.
	function updateTable(){
		$("div#recipe > table").trigger("update");
	}

});