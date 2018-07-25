// ==============================================================
// ======= SEARCH
// ==============================================================
(function( tags ) { // scoping

    var form = $('#search');
    var searchURL = form.attr('action');
    var searchField = $('input[type=search]',form).first();
    var searchResults = $('<div />', {id:"search-results"});
    form.append(searchResults);
    var more = $('<input type="submit" value="See more results &raquo;"/>');
    form.append(more);

    var sendID = 0;

    var sendRequest = function( searchTerms ){
	sendID++;
	more.hide();
	$.post(searchURL,
	       { ajax:true, terms: searchTerms, id:sendID },
	       function(data){
		   if (data.id == sendID){
		       searchResults.html(data.results).fadeIn('fast',function(){ if(data.hasMore){more.show();} });
		   }
	       },
	       "json");
    }

    searchField.keyup(function(e){
	var searchTerms = searchField.val();
	if( searchTerms.length > 1 ){ // more than one character
	    //completeRequest( searchTerms );
	    sendRequest( searchTerms );
	} else {
	    searchResults.hide().html(''); more.hide();
	}
    });

    searchField.keydown(function(e){
	var searchTerms = searchField.val();
	if( searchTerms.length < 2 ){
	    searchResults.hide().html(''); more.hide();
	}
    });

    searchField.focusout(function(e){
	setTimeout(function(){ searchResults.hide().html(''); more.hide(); }, 301 );
    });

    // on form submit, do the normal submit

})( null );

