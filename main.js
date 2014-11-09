var timer;
var currentTime = 0;

$(document).ready(function() {
    $("#gameArea").hide();
    $("#demoCanvas").hide();
    $("#center").hide();
    $("#menubox").hide();
    $('#nav2').hide();
    //setInterval(function(){changeTitleColor()}, 1000)
});

function showGame() {
    $("#members").fadeToggle(200);
    $("#start").fadeToggle(200);
    setTimeout(function() {
        $("#gameArea").fadeIn('slow');
    }, 300);
    return false;
};


function showCanvas() {
    $("#players").fadeToggle(200);
    setTimeout(function() {
        $("#center").fadeIn('slow');
        $("#demoCanvas").fadeIn('slow');
        $( "#bubble" ).toggle( "scale" );
          $("#menubox").fadeIn(400);
          $("#menubox").fadeIn(400);
           $("#nav2").fadeIn(400);
          startTimer();
    }, 300);
};

function startTimer(){
     timer = setInterval(function(){
           document.getElementById("time").innerHTML =  currentTime;
           currentTime++;
          }, 1000);
}






//   Just commenting this out to test it out. We can uncomment later - David
//function changeTitleColor() {
//   var red = Math.floor(Math.random() * 255);
//   var green = Math.floor(Math.random() * 255);
//   var blue = Math.floor(Math.random() * 255);
//   var rgb = "rgb("+red+","+green+","+blue+")";
//              
//   $('#title').css("color", rgb)
//}

//function showGame(){
//       $("#text").fadeToggle(300);
//        setTimeout(function() {$("#board").fadeIn(300);}, 300);
//      $('#gameArea').css("width", 850);
//}
