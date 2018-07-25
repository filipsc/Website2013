$(document).ready(function() {

	//load top-10
	$.getJSON( "./xml/pizza.php",      //The URL to perform the lookup
		{action : "getTop10"}, //The data you send
		function (result){     //The function to fire upon return
			$.each(result, function(i){
				var name = result[i]['name'];
				var pop = result[i]['popularity'];
				var num = i+1;
				$(".top10 ol").append("<li><span class='pizza-name'>"+num+". "+name+"</span></li>");
			});
		});

	//use this array to keep track of how many of each pizza has been placed in the order
	var addedPizzas = new Array();
	//use this array to get the amount already in use of a specific ingredient
	var usedIngs = new Array();

	function removeElement(){

		var currentPi = $(this).parent().parent();	//I sure hop this var does not detach the functionality
		currentPi.detach();
		addedPizzas[currentPi.attr("data-ID")]--;	//decrement this pizza in addedPizzas
		//TOTEST decrement used ingredients for this pizza
		$.getJSON("./xml/pizza.php",
			{action : "get", id : currentPi.attr("data-ID")},
			function(result){	//result is a pizza
				$.each(result["ingredients"], function(i, value) {
					if (usedIngr[i]) {
						usedIngr[i] -= value;
					} else {
						usedIngr[i] = 0;
					}
				});
				//Update availability
				updateAvailability();
			});
	}

	//TODO add so that it checks for available ingredients
	var usedIngr = new Array(); 
	function addPizza(){


		var clickedImage = $(this);
		var piID = clickedImage.parent().parent().attr("data-ID");
		$.getJSON("./xml/pizza.php",	//The URL to perform the lookup
			{action : "get", id : piID},	//The data you send
			function(result){
				var pizzas = result;
				$.getJSON("./xml/storage.php",
							{action : "getall"},
							function(result){	//result is the ingredient, now how do I get the attribute here?
								var storage = result;
								var enough = true;
								$.each(pizzas["ingredients"], function(i, value){
									// i = id of ingredient
									// value = how much needed of ingredient
									// storage["id"]['in_storage'] = amount in storage
									var needed;
									if (usedIngr[i]) {
										needed = usedIngr[i] + value; 
									} else {
										needed = value;
									}

									if(storage[i]['in_storage'] < needed){
										enough = false;
									}
								});
								console.log(enough);
								if(enough){
									if(!addedPizzas[clickedImage.parent().parent().attr("data-ID")]){
										addedPizzas[clickedImage.parent().parent().attr("data-ID")] = 1;	//increment this pizza in addedPizzas
									}else{
										addedPizzas[clickedImage.parent().parent().attr("data-ID")] += 1;	//increment this pizza in addedPizzas
									}
									//Add the ingredients to the usedIngr array
									$.each(pizzas["ingredients"], function(i, value) {
										if (usedIngr[i]) {
											usedIngr[i] += value;
										} else {
											usedIngr[i] = value;
										}
									});

									//Update availability
									updateAvailability();

									//var mover = clickedImage.parent().parent().clone();
									var mover = clickedImage.parents("tr").clone();
									console.log("Is this the mover? " + mover.html());
									mover.find("img").attr("src", "./img/minus.png");
									mover.find("img").removeClass("add-button");
									mover.find("img").addClass("remove-button").bind("click", removeElement);
									$("div.order table").append(mover);
								}else{
									var par = clickedImage.parent();
									clickedImage.remove();
									par.html("<p style='color: red'>Not enough ingredients</p>");
								}

							});
			});
	};

	//initialize hide the paydesk look
	$("#paydesk").hide();
	$("#fog").hide();

	//dynamicaly get the menu-list
	$.getJSON( "./xml/pizza.php",      //The URL to perform the lookup
		{action : "getall"}, //The data you send
		function (result){     //The function to fire upon return
			//Add all the data to the table.
			$.each(result, function(i) {
				var id = i;
				var name = result[i]['name'];
				var description = result[i]['description'];
				var ings = "";
				$.each(result[i]['ingredients'], function(ing){
					ings += "<span>" + ing + "</span>" + "<p> </p>";
				});
				var popularity = result[i]['popularity'];

				//Add the new elements to the ul
				$("div.menu table tbody").append("<tr data-ID='"+id+"'><td>"+name+"</td><td>"+description+"</td><td>"+ings+"</td><td>Popularity: "+popularity+"</td><td class='addinfo'><img src='./img/add.png' class='add-button' alt='add-button'/></td>");
			});

			//Bind add-icons to the function
			$(".add-button").bind("click", addPizza);

			$.getJSON( "./xml/storage.php",      //The URL to perform the lookup
				{action : "getall"}, //The data you send
				function (result){     //The function to fire upon return
					$("div.menu table tr td span").each(function(){
						var id = $(this).html();
						var name;
						if (!result[id]) {
							name = "MISS";
						} else {
							name = result[id]['name'];
						}
						$(this).html(name);
					});
			});

			$("div.menu table").tablesorter({
			headers: { 
				1: { sorter: false},
				2: { sorter: false},
				4: { sorter: false},
			}, //Disable sorting for 2nd and 4th row.
			}); 

			var sorting = [[0,0]]; 
        	// sort on the first column 
       	 	$("table").trigger("sorton",[sorting]); 


			//Check if enough for the pizzas.
			updateAvailability();

		});

	//COULDDO change so that the ingredients used simply are sent from the usedIngs-array
	//send the order and show receipt
	$("#proceed-order").click(function(){

		$.each(addedPizzas, function(j) {
				$.getJSON( "./xml/pizza.php",      //The URL to perform the lookup
				{action : "get", id: j}, //The data you send
				function (result){     //The function to fire upon return
					var pop = result["popularity"];
					pop = pop + addedPizzas[j];
					$.getJSON( "./xml/pizza.php",
						{action : "set", id: j, popularity : pop}, 
						function() {
							func();
					});

				});

				function func() {
				$.getJSON("./xml/pizza.php",	//The URL to perform the lookup
					{action : "get", id : j},	//use j as ID to access pizza
					function(result){
						$.each(result["ingredients"], function(i, value){
							//console.log("Is this shit really the attribute?" + value);
							//console.log("addedpi:" + addedPizzas[j]);
							var used = addedPizzas[j] * value;	//here times the accessed pizzas current ingredients unit-attribute
							//decrease that ingredients in_stock with used
							//get the current amount of ingredients
							$.getJSON("./xml/storage.php",
								{action : "get", id : i},
								function(ing){
									var currentStorage = ing["in_storage"];
									//console.log("curr: " + currentStorage + " used: " + used);
									var toSend = currentStorage - used;
									//console.log(toSend);
									$.getJSON("./xml/storage.php",
										{action : "set", id : i, amount : toSend},
										function(){
											//do nothing
										});
								});
						});
					});
			}
		});

		var orderSet = new Array();
		$("div.order table tr").each(function(i){	//save all the listitems from the order
			var tmpElement = $(this).clone();
			tmpElement.find("img").remove();
			orderSet[i] = tmpElement;
		});

		for(var i = 0; i < orderSet.length; i++){
			var current = orderSet[i];
			$("div#paydesk table").append(current);
		}

		$("#fog").show();
		$("div#paydesk").fadeIn(1000);

	});

	function updateAvailability(){
		//get all pizzas
		$.getJSON("./xml/pizza.php",
			{action : "getall"},
			function(allPi){	//all pizzas
				$.getJSON("./xml/storage.php",
							{action : "getall"},
							function(ingList){
								//loop through the table
								$("div.menu table tbody tr").each(function(){
									//get the current pizza and loop through its ingredients
									var piRow = $(this);
									var piID = piRow.attr("data-ID");
									var pi = allPi[piID];
									var enough = true;
									$.each(pi["ingredients"], function(i, value){
										//we need to check if value is less than the available amount
										available = ingList[i]['in_storage'];

										//Check "local storage"
										if (usedIngr[i]) {
											value += usedIngr[i];
										} 

										if (available < value) {
											enough = false;
										}
									});

									if (enough) {
										piRow.find("td.addinfo").html("<img src='./img/add.png' class='add-button' alt='add-button'/>");
									} else {
										piRow.find("td.addinfo").html("<p style='color: red'>Not enough ingredients</p>");
									}
								});
								$(".add-button").bind("click", addPizza);
				});
		});
	}
});