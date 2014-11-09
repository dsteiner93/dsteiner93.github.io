$(document).ready(function() {
    $("#gameArea").hide();
    $("#demoCanvas").hide();
    $("#center").hide();
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
    }, 300);
};




//   Just commenting this out to test it out. We can uncomment later - David
//function changeTitleColor() {
//   var red = Math.floor(Math.random() * 255);
//   var green = Math.floor(Math.random() * 255);
//   var blue = Math.floor(Math.random() * 255);
//   var rgb = "rgb("+red+","+green+","+blue+")";
//              
//   $('#title').css("color", rgb)
//}
