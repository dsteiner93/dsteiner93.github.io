var timer;
var currentTime = 0;

$(document).ready(function() {
    $("#gameArea").hide();
    $("#demoCanvas").hide();
    $("#center").hide();
    $("#right_nav").hide();
    $('#left_nav').hide();
    $('#bubbleSmall').hide();
    $("#pause").hide();
    $("#login").hide();
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



function login(){
     $("#members").fadeOut(200);
      $("#start").fadeOut(200);
       $("#loginform").fadeOut(200);
       setInterval(function(){
         $("#login").fadeIn(300);
       }, 250);
       
}
function showCanvas() {

    $("#instructions").fadeOut(200);
    $("#loginform").fadeToggle(200);

    setTimeout(function() {
        $("#bubbleBig").fadeOut(100);
    }, 200);

    setTimeout(function() {
        $("#bubbleSmall").fadeIn(300);
        $("#center").fadeIn(300);
        $("#right_nav").fadeIn(300);
        $("#box").fadeIn(300);
        $("#left_nav").fadeIn(300);
    }, 400);

    setTimeout(function() {
        $("#demoCanvas").fadeIn(500);
    }, 600);

    setTimeout(function() {
        $('#instructions').css('background-color', '#D3D3D3');
        $("#pause").fadeIn(100);
    }, 1000);
};

function changeTitleColor() {
    var red = Math.floor(Math.random() * 100) + 120;
    var green = Math.floor(Math.random() * 100) + 120;
    var blue = Math.floor(Math.random() * 100) + 120;
    var rgb = "rgb(" + red + "," + green + "," + blue + ")";

    $('#title').css("color", rgb)
}