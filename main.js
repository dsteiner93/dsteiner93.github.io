
$( document ).ready( function(){
     $("#description").hide();
     setInterval(function(){changeTitleColor()}, 1000)
});
function showGame(){
    $("#members").fadeToggle(200);
    $("#start").fadeToggle(200);
    setTimeout(function(){
        $("#description").fadeIn('slow');
    },300);
       return false;
    };
    
function changeTitleColor() {
   var red = Math.floor(Math.random() * 255);
   var green = Math.floor(Math.random() * 255);
   var blue = Math.floor(Math.random() * 255);
   var rgb = "rgb("+red+","+green+","+blue+")";
              
   $('#title').css("color", rgb)
}