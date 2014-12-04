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
        <script src="jquery.min.js"></script>
        <script src="http://code.createjs.com/easeljs-0.7.0.min.js"></script>
        <script src="puyo.js"></script>
        <script src="https://rawgithub.com/madrobby/keymaster/master/keymaster.js"></script>
    </head>
    <body onload='init()'>
        <div id='hello'>
        hello;
        </div>
        <?php
            print_r($_SESSION);
            
            if(isset($_SESSION['username'])){
            
            echo "<a id='signup' href='logout.php'> logout </a>" ;
            
            } else {
              
            echo " <div id='signup' > <a href='index.php'>Sign Up</a> <br> ";
            echo " <a id=''href='register.php'>Log In</a>  </div>";
            
            }
            
        ?>
            <nav>
                <div id='left_nav'>
                    <div class="box">
                        <p> Current Score </p>
                        <p id='currentScore'> 0 </p>
                    </div>
                    <div class="box">
                        <p id="high_score"> High Score </p>
                        <p class='info' id='highScore'>
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
                    <div class='box'>
                        <a id='board' href='scoreboard.php'> Scoreboard </a>
                    </div>
                </div>
            </nav>
            <div id="main_container">
                <div id='title'>
                    <h1 id='bubbleSmall'>Puyo Pop</h1>
                </div>
                <div id="gameArea">
                    <div id="center">
                        <!-- <p id ='instructions'> 
                        Instructions <a id='signup' href='logout.php'> logout </a>
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
                        </p>-->
                        <canvas id="demoCanvas" width="300" height="600" style="background-color: #D3D3D3;"></canvas>
                        <p id='pause'> Press P to Pause and to Read Instructions </p>
                    </div>
                </div>
            </div>
            <nav id='right_nav'>
                <div class="box">
                    <p id ='next_block_text'> Next Block: </p>
                    <canvas id='next_block'></canvas>
                    <p id='timer'> Timer </p>
                    <p id ='time'> 0 </p>
                </div>
                <div class="box">
                    <button id='reset' onclick='resetGame()'> Reset </button>
                </div>
            </nav>
    </body>
</html>