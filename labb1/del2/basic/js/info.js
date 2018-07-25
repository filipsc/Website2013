$(document).ready(function(){
    var tipdiv = $("div#info div.tip");

    $("#info").toggle(function() {
        tipdiv.slideDown();
    }, function() {
        tipdiv.slideUp();
    });
});