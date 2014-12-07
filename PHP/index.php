<?php

?>
<html>
    <head>
        <title>Puyo Pop - COMP 426</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="style.css">
        <link href='http://fonts.googleapis.com/css?family=Indie+Flower' rel='stylesheet' type='text/css'>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script src="http://code.createjs.com/easeljs-0.7.0.min.js"></script>
        <script src="puyo.js"></script>
        <script src="https://rawgithub.com/madrobby/keymaster/master/keymaster.js"></script>
    </head>
    <body>
        <a class='account' href="login.php">Log In</a>
        <div class='center'>
            <h1 class='title'>Puyo Pop</h1>
            <div id="members">
                <h3>Group Members</h3>
                <div class='name'>David Steiner </div>
                <div class='name'>Adam Wang </div>
                <div class='name'>Volodymyr Siedlecki </div>
            </div>
             <div style="margin-top: 20px"> <a href="resttester.html"> <button class='btn'>  Restful Tester </button> </a> </div>
            <div id='play'> 
                <a href="game.php">   <button class="btn">  Play As Guest  </button> </a>
            </div>
            <form id='register' method='post'>
                <h4> Sign Up </h4>
                email<br> <input  id='password' class='input' type='text' name='email' autocomplete=off><br>
                username<br> <input id='username' class='input' type='text' name='username' autocomplete=off ><br>
                password<br> <input  id='pwd' class='input' type='password' name='password'><br>
                <input id='submit' class='btn' type='submit' value='submit' >
            </form>
        </div>
    </body>
</html>