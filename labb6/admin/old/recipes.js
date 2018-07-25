$(document).ready(function() {
	/************************************************ EDITOR AND VIEW *********************************************/
	//When hovering over a icon change the cursor.
	$("span.icon").hover(function() {
		$(this).css({"cursor" : "pointer"})
	});

	//Set height to only show normal view first.
	$("ul#list li").each(function(){
		var h = $(this).find(".noeditor").height();
		$(this).height(h);
		$(this).css("overflow", "hidden");
	});


	/************************************************ IN/OUT EDIT MODE *******************************************/
	// Delete a pizza
	$("div.buttons span.icon.delete").click(function(){
		var obj = $(this).parents("li");
		obj.remove();
	});

	// When clicking edit update data in editor and display editor.
	$("div.buttons span.icon.edit").click(function(){
		var obj = $(this).parents("li");
		var view = obj.find(".noeditor");
		var editor = obj.find(".editor");

		// Values
		var name = view.find(".name").html();
		var price = view.find(".price").html();
		editor.find(".name").val(name);
		editor.find(".price").val(price);

		// The number of ingredients can change so needs to recreate everything in the list.
		editor.find("ul.ingredients li").remove(); // Clears the editors ingredient list.
		var insertionPoint = editor.find("ul.ingredients span.icon.add");
		view.find("ul.ingredients li").clone().insertBefore(insertionPoint);
		editor.find("ul.ingredients li").each(function(){
			var num = $(this).find(".amount").html();
			$(this).find(".amount").replaceWith("<input class='amount' type='number'>");
			$(this).find(".amount").val(num);
		});

		//Hide the view and display the editor.
		showHide(editor, view);
	});

	// Finish editing and dont save any values
	$("div.buttons span.icon.cancel").click(function(){
		var obj = $(this).parents("li");
		var view = obj.find(".noeditor");
		var editor = obj.find(".editor");

		//Hide the editor and display the view
		showHide(view, editor);
	});

	// Finished editing
	$("div.buttons span.icon.done").click(function(){
		var obj = $(this).parents("li");
		var view = obj.find(".noeditor");
		var editor = obj.find(".editor");
		var pizzaID = obj.attr("data-pizzaID");

		// Values
		var name = editor.find(".name").val();
		var price = editor.find(".price").val();
		view.find(".name").html(name);
		view.find(".price").html(price);

		// Send the new price and name to the server.
		//updateName(pizzaID, name);
		//updatePrice(pizzaID, price);

		// The number of ingredients can change so needs to recreate everything in the list.
		view.find("ul.ingredients li").remove(); // Clears the viewers ingredient list.
		var insertionPoint = view.find("ul.ingredients");
		editor.find("ul.ingredients li").clone().appendTo(insertionPoint);
		view.find("ul.ingredients li").each(function(){

			//Update the value
			var num = $(this).find(".amount").val();
			$(this).find(".amount").replaceWith("<span class='amount'></span>");
			$(this).find(".amount").html(num);

			//Send to server
			var ingredient = $(this).find(".desc").html(); //The ingredient in question
			
			//updateItem(pizzaID, ingredient, num); //SHOULD THIS BE DONE IN SOME OTHER WAY?

		});

		// Hide the editor and display the view
		showHide(view, editor);
	});

	function showHide(show, hide) {
		// Hide the view and display the editor.
		hide.css({"z-index" :  "201"});
		show.css({"z-index" :  "202"}); 

		//var oldH = hide.height();
		var newH = show.height();

		show.parent("li").height(newH);
	}


	/******************************************************** SERVER - SEND DATA *****************************/

	//Update adding of ingredient to the server. Optional func to be executed when the request is done.
	function addItem(pizzaID, name, amount, func){
		//TODO: send the new item to be added to the server.
	}

	//Update adding of ingredient to the server. Optional func to be executed when the request is done.
	function removeItem(pizzaID, name, func){
		//TODO: send the ingredient to remove.
	}

	/****************************************************** SERVER - GET DATA ****************************/

	// something something
	function getAllPizzaItems() {
		//....

	}
}); 