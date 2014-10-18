$( document ).ready( function(){
     $("#description").hide();
});
function showGame(){
    $("#members").fadeToggle(200);
    $("#start").fadeToggle(200);
    setTimeout(function(){
        $("#description").fadeIn('slow');
    },300);
       return false;
    };