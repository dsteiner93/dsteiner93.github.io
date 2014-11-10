var timer;
var currentTime = 0;

$(document).ready(function() {
    $("#gameArea").hide();
    $("#demoCanvas").hide();
    $("#center").hide();
    $("#menubox").hide();
    $('#nav2').hide();
    $('#bubbleSmall').hide();
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
    $("#players").fadeToggle(300);
    setTimeout(function() {
        $("#bubbleBig").fadeOut(100);
    }, 200);

    setTimeout(function() {
        $("#bubbleSmall").fadeIn(200);
        $("#center").fadeIn('slow');
        $("#menubox").fadeIn(300);
        $("#menubox").fadeIn(300);
        $("#nav2").fadeIn(300);
        startTimer();
    }, 400);

    setTimeout(function() {
        $("#demoCanvas").fadeIn('slow');
    }, 600);
};

function startTimer() {
    timer = setInterval(function() {
        document.getElementById("time").innerHTML = currentTime;
        currentTime++;
    }, 1000);
}

function changeTitleColor() {
    var red = Math.floor(Math.random() * 100) + 120;
    var green = Math.floor(Math.random() * 100) + 120;
    var blue = Math.floor(Math.random() * 100) + 120;
    var rgb = "rgb(" + red + "," + green + "," + blue + ")";

    $('#title').css("color", rgb)
}
