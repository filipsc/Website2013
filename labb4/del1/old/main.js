$(document).ready(function() {

	//Auto add info if ssn is found
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

	// When ssn if focused remove warning if there is one being shown.
	$("input[name=ssn]").focus(function() {
		$("#warning").fadeTo("fast", 0);
	});

	$("input[name=username]").blur(function(){
		var username = $(this).val();
		console.log(username);
		if(username == ""){
			return;
		}
		$.getJSON( "./proxy/available.php",      //The URL to perform the lookup
			{name: username }, //The data you send
			function (result){     //The function to fire upon return
				if (!result){       //result is JSON formatted
					$("#userwarning").fadeTo("fast", 1);
				}
			});
	});

	$("input[name=username]").focus(function() {
		$("#userwarning").fadeTo("fast", 0);
	});

	$("input[name=showpw]").click(function() {
		if($(this).is(":checked")) {
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
	});

	$("button[type=submit]").click(function(){
		$("input:not([type=checkbox])").each(function(){
			//console.log($(this).val());
			if($(this).val() == ""){
				 $(this).animate({
         	 		backgroundColor: "#aa0000"
         	 	}, 1000 );
			}
		});

		//if successfull, proceed
	});

	$("input:not([type=checkbox])").focus( function(){
		$(this).animate({
         	 		backgroundColor: "black"
         	 	}, 1000 );
	});

});