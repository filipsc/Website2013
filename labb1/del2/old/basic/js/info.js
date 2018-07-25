$(document).ready(function(){
    var tipdiv = $("div#info div.tip");
    $("#info").toggle(function() {
        tipdiv.show();
    }, function() {
        tipdiv.hide();
    });
});