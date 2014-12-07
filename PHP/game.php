<?php
    session_start();
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
    <body onload='init()'>
        <?php
            //print_r($_SESSION);
            if(isset($_SESSION['username'])){ 
                echo "<a class='account' href='logout.php'> Logout </a>" ;
            } else {   
                echo "  <a class='account' href='login.php'>Log In</a>";
                echo "  <a class='account' id='account_signup' href='index.php'>Sign Up</a>"; 
            }
        ?>
      
        <div class='center'>
  
            <div> 
            <div id='left'>
               <div class='box' id='current_box'>
                    <p> Current Score </p>
                    <p id='currentScore'> 0 </p>
               </div>
                <div class='box' id='high_box'>
                    <p> High Score</p>
                    <p id='high_score'>
                        <?php
                            if(isset($_SESSION['username'])){
                                if(isset($_SESSION["high_score"])){
                                    echo $_SESSION["high_score"];
                                } else {
                                    echo '0';
                                }
                            } else {
                                    echo '0';
                            }
                        ?>
                    </p>
               </div>
                 <div class='box' id='board_box'>
                    <a id='board' href='scoreboard.php'> Scoreboard </a>
               </div>
            </div>
            
          <div id='game'>
              <h4 class='title' id='smalltext'> Puyo Pop</h4>
             <canvas id="demoCanvas" width="300" height="600" style="background-color: #D3D3D3;"></canvas>
             <p id='pause'> Press P to Pause and to Read Instructions </p>
                    <p  class='center' id ='instructions'> 
                    Instructions
                    <br>
                    The goal of the game is to last as long as possible without your screen filling up with blobs. The key rule of the game is that if any four blobs of the same color form a tetronimo upon landing, they disappear.
                    <br>
                    <br>
                    Use the Arrows Keys to Move.
                    Up Arrow Rotates the Current Block.
                    X and Z Also Rotate the Current Block.
                    Press P to Pause or Resume. 
                    <br>
                    <br>
                    Have Fun!
                </p>
             <script>
                $(document).ready(function() {
                    $("#instructions").hide();
                });
             </script>
          </div>
          
                


            <div id='right'>
              <div class='box' id='next_box'>
                   <p id ='next_block_text'> Next Block </p>
                    <canvas id='next_block' width="70" height="120"></canvas>
               </div>
              
              <div class='box'id='timer_box'>
                    <p id='timer'> Timer </p>
                    <p id ='time'> 0 </p>

               </div>
              
              <div class='box' id='reset_box'>
                    <button id='reset' onclick='resetGame()'> Reset </button>
               </div>
            </div>
            
           </div>
            
            <form id='highscore_form'>
                 <input id='hs' type="hidden" name="high_score"> 
            </form>
     

    </body>
</html>