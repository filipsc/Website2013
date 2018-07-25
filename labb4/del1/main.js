$(document).ready(function() {

	/*
		SSN AUTO ADD INFO THINGY:
		Auto add info if a given ssn is found.
	*/
	$("#ssn-button").click(function() {
		var ssnvalue = $("input[name=ssn]").val();
		$.getJSON( "./proxy/ssn_lookup.php",      //The URL to perform the lookup
			{ssn: ssnvalue }, //The data you send
			function (result){     //The function to fire upon return
				if (!result){       //result is JSON formatted
					$("#nameadress").find("input").val("");
					$("#warning").fadeTo("fast", 1);
				}
				else {
					$.each(result, function(key, value){
						$("input[name=" + key +"]").val(value);
						$("input[name=" + key +"]").animate({
         	 				backgroundColor: "black"
         	 			}, 1000 );
					});
				}
			});
	});

	/*
		When ssn if focused remove warning if there is one being shown.
	*/
	$("input[name=ssn]").focus(function() {
		$("#warning").fadeTo("fast", 0);
	});

	/* 
		When not going out from typing in the username field,
		check if the username is already taken using our UsernameAvailable function.
	*/
	$("input[name=username]").keyup(function(){
		var username = $(this).val();
		console.log(username);
		if(username == ""){ 
			$("#usercheck").stop().fadeTo("fast", 0);
			return;
		}
		UsernameAvailable(username, function(result){
			if(!result) {
				$("#usercheck").attr("src", "./notavailable.png");
				console.log("already exists");
			} else {
				$("#usercheck").attr("src", "./available.png");
				console.log("does not exist");
			}
			$("#usercheck").stop().fadeTo("fast", 1)
		});
	});

	/* 
		USERNAME VALIDATION:
		Accepts a function that gets sent the result of whether the supplied username or not exists.
	*/
	function UsernameAvailable(uname, func){
		$.getJSON( "./proxy/available.php",    //The URL to perform the lookup
			{name: uname }, //The data you send
			function (result){     //Returns a boolean value depending if the username exists or not.
				func(result);
			});
	}

	/*
		When the username field is being focused fadeout the error message.
	*/
	$("input[name=username]").focus(function() {
		$("#userwarning").fadeTo("fast", 0);
	});

	/*
		SHOW/HIDE PASSWORD:
		 Switch between showing and not showing password.
	*/
	$("input[name=showpw]").click(function() {
		//Remember the background color.
		var bcolor = $("input[name=pw]").css("background-color");
		
		if($("input[name=showpw]").is(":checked")) {
			var pwvalue = $("input[name=pw]").val();
			$("input[name=pw]").remove();
			$("div#pw > label").after("<input type='text' name='pw'>");
			$("input[name=pw]").css("margin-left", "4px");	//ugly fix!
			$("input[name=pw]").val(pwvalue);
		} else {
			var pwvalue = $("input[name=pw]").val();
			$("input[name=pw]").remove();
			$("div#pw > label").after("<input type='password' name='pw'>");
			$("input[name=pw]").css("margin-left", "4px");	//ugly fix!
			$("input[name=pw]").val(pwvalue);
		} 

		//Remember the background color and re-add the function that gets called when the element is being focused.
		$("input[name=pw]").css("background-color", bcolor);
		$("input[name=pw]").focus(function(){
			$(this).animate({
         	 	backgroundColor: "black"
         	}, 1000 );
		});
	});

	/* 
		REGISTERING:
	 	The things that will happen when you press register.
	 */
	$("button[type=submit]").click(function(){
		//Check each field if they are empty
		var emptyFieldError = false;
		$("input:not([type=checkbox])").each(function(){
			if($(this).val() == ""){
				$(this).animate({
         	 		backgroundColor: "red"
         	 	}, 1000 );
				emptyFieldError = true; //Field is empty, therefor not valid input for registering.
			}
		});

		if(!emptyFieldError) {
			console.log("där?");
			$.getJSON("./proxy/register.php",      //The URL to perform the lookup
				{ //Data to send to the server.
					name: $("input[name=name]").val(),
					username: $("input[name=username]").val(),
					password: $("input[name=pw]").val(),
					street: $("input[name=street]").val(),
					postal: $("input[name=postal]").val(),
					city: $("input[name=city]").val()
				}, function (result){     
					$("#registermsg").html(result);
					$("#registermsg").fadeTo(1000, 1);
					console.log("här?");
				});
			}
	});
	/*
		When a elements regains focus make it black if it is red.
	*/
	$("input:not([type=checkbox])").focus( function(){
		$(this).animate({
         	backgroundColor: "black"
        }, 1000 );
	});
});