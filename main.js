
$( document ).ready( function(){
     $("#gameArea").hide();
     setInterval(function(){changeTitleColor()}, 1000)
});
function showRules(){
    $("#members").fadeToggle(200);
    $("#start").fadeToggle(200);
    setTimeout(function(){
    $("#gameArea").fadeIn('slow');
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

function showGame(){
       $(".details").fadeToggle(300);
}