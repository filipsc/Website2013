$(document).ready(function(){

	/******************************* FETCH DATA AND ADD TO TABLE *************************/
	$.getJSON( "../xml/storage.php",      //The URL to perform the lookup
		{action : "getall"}, //The data you send
		function (result){     //The function to fire upon return
			//Add all the data to the table.
			$.each(result, function(i) {
				var amount = result[i]['in_storage'];
				var name = result[i]['name'];
				var id = i;

				//Add the new elements to the table
				$("div#stock table tbody").append("<tr data-ID='"+id+"'><td class='itemname'>"+name+"</td><td class='itemamount'>"+amount+
					"</td><td class='menuitems'><span class='icon edit'>edit</span><span class='icon delete'>delete</span></td>");
			});

			/*$("#stock > table").tablesorter({
				headers: { 2: { sorter: false}} //Disable sorting for that row.
			}); 

			var sorting = [[0,0]]; 
       		// sort on the first column 
       		$("table").trigger("sorton",[sorting]); */

       		//Hover on sortable headers.
       		$("th.header").hover(function() {
				$(this).css("cursor", "pointer");
			});

			//Bind icons to the functions
			$(".icon.delete").bind("click", iconDelete);
			$(".icon.edit").bind("click", iconEdit);
		});

	/******************************* EDITING *****************************/
	//Add a viewer in front of everything.
	$("body").append("<div id='viewer'><div id='area'><h1>TEMP</h1><table id='editables'></table>"+
		"<div class='viewerbuttons'><span class='icon done'>done</span><span class='icon cancel'>cancel</span></div></div>");
	$("div#viewer").css({
		"position" : "absolute", 
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
		"width" : "200px",
		"margin" : "0 auto",
		"vertical-align" : "middle",
		"overflow" : "hidden",
		"position" : "relative",
		"top" : "100px"
	});

	$("div#viewer h1").css({"text-align" : "center", "font-size" : "26px"});
	$(".viewerbuttons").css({"text-align" : "center"});
	$(".viewerbuttons span").css({"height" : "24px", "width" : "24px"});

	/*************************** EDITING ********************************/

	//Deletes the row the icon is present on.
	function iconDelete(){
		var tablerow = $(this).parents("tr");
		var ingID = tablerow.attr('data-ID');
		console.log(ingID);

		//TODO: some kind of confirmation dialog
		//Server: send delete to server
		$.getJSON( "../xml/storage.php",      //The URL to perform the lookup
			{action : "delete", id : ingID}, //The data you send
			function (result){     //The function to fire upon return
				console.log(result);
			});

		tablerow.remove();
	}

	// Pressed edit
	function iconEdit(){
		var tablerow = $(this).parents("tr");
		var ingID = tablerow.attr('data-ID');
		var name = tablerow.find(".itemname").html();
		var amount = tablerow.find(".itemamount").html();

		//Clear the table
		$("div#viewer table tr").remove();
		//Add the needed elements
		$("div#viewer table").append("<tr class='name'><td>Name</td><td><input type='text'</td></tr>");
		$("div#viewer table tr.name input").val(name);
		$("div#viewer table").append("<tr class='amount'><td>Amount</td><td><input type='number'></td></tr>");
		$("div#viewer table tr.amount input").val(amount);
		//Set h1
		$("div#viewer div#area > h1").html("Edit");
		$("div#viewer").css("visibility", "visible");

		//Things to happen when clicking one of the two buttons.
		$("div#viewer .icon.done").click(function(){
			//save the data...
			var ingName = $("div#viewer table tr.name input").val();
			var val = parseInt($("div#viewer table tr.amount input").val(), 10); //Try parsing the value in base10
			if(isNaN(val)) {
				console.log("the number field needs to contain a number") //TODO: Fix error message
			} else if (ingName.length == 0) {
				console.log("name needs to be > 0 in length");
			} else { 
				tablerow.find(".itemamount").html(val);
				tablerow.find(".itemname").html(ingName);


				//Server: send new data to server.
				$.getJSON( "../xml/storage.php",      //The URL to perform the lookup
					{action : "set", id : ingID, amount : val, name : ingName}, //The data you send
					function (result){     //The function to fire upon return
						console.log("wooo" + result);
					});

				//Close viewer
				$("div#viewer").css({"visibility" : "hidden"});

				unbindViewer();
			}
		});

		$("div#viewer .icon.cancel").click(function(){
			//Close viewer
			$("div#viewer").css({"visibility" : "hidden"});

			//Send nothing to server as nothing changed.

			unbindViewer();
		});
	}
	
	function unbindViewer(){
		//Unbind events
		$("div#viewer .icon.done").unbind("click"); //So the event does not occur when another row uses the viewer.
		$("div#viewer .icon.cancel").unbind("click"); //So the event does not occur when another row uses the viewer.
	}

	/******************************************** ADD NEW STOCK ITEM ********************/

	$("div.fullicon .icon.add").click(function(){
		//Clear and show the table
		$("div#viewer table tr").remove();
		$("div#viewer table").append("<tr class='name'><td>Name</td><td><input type='text'></td></tr>");
		$("div#viewer table").append("<tr class='amount'><td>Amount</td><td><input type='number'></td></tr>");
		$("div#viewer div#area > h1").html("Add");
		$("div#viewer").css("visibility", "visible");

		//When clicking done:
		$("div#viewer .icon.done").click(function(){
			//Get the values
			var name = $("div#viewer table tr.name input").val();
			var amount = parseInt($("div#viewer table tr.amount input").val(), 10); //Becomes NaN if not correct

			if(name.length == 0) {
				//Nothing typed in name field
				console.log("name field empty") //TODO: Fix error message
			} else if (isNaN(amount)) {
				//Amount was not a number, show error message...
				console.log("the number field needs to contain a number") //TODO: Fix error message
			}
			else { 
				//Bind new events for the added icons
				$(".icon.edit").bind("click", iconEdit);
				$(".icon.delete").bind("click", iconDelete);

				//Update tablesorter
				updateTable();
				
				//TODO: Server: send the new stock item data to server.
				$.getJSON( "../xml/storage.php",      //The URL to perform the lookup
					{action : "add", amount : amount, name : name}, //The data you send
					function (result){     //The function to fire upon return
						console.log("wooo" + result);
						//Add the new element to the table
						$("div#stock table tbody").append("<tr data-ID='"+result+"'><td class='itemname'>"+name+"</td><td class='itemamount'>"+amount+
							"</td><td class='menuitems'><span class='icon edit'>edit</span><span class='icon delete'>delete</span></td>");
					});
				//Close viewer
				$("div#viewer").css({"visibility" : "hidden"});

				//Unbind
				unbindViewer();
			}

			
		});

		//When clicking cancel:
		$("div#viewer .icon.cancel").click(function(){
			//Close viewer
			$("div#viewer").css({"visibility" : "hidden"});

			//Send nothing to server as nothing have changed

			//Unbind
			unbindViewer();
		});

	});

	//Updates the tablesorter, should be called when the table changes.
	function updateTable(){
		//$("div#stock table").trigger("update");
	}

});