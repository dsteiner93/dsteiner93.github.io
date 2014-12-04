<?php
    session_start(); // Right at the top of your script
    require_once "init.php";
    $server_dir = $_SERVER['HTTP_HOST'] . rtrim(dirname($_SERVER['PHP_SELF']), '/\\') . '/';
     
    if ($_POST ){ 
        $username = $_POST['username'];
        $password = $_POST['password'];
        $error = "";
      
        if(login($username, $password)){    
            $_SESSION['logged']=true;
            $_SESSION["username"] = $username;
            $_SESSION["high_score"] = setscore($username);     
            header('Location: http://' . $server_dir . "game.php");    
        } else{
            $_SESSION['logged']=false;
            $GLOBALS['error'] = ' <p> Error with Login. </p>';
        }
     
    } 
    
    function login($username, $password){
            $query = $GLOBALS['db']->prepare("SELECT password FROM a6_User WHERE username = ?");
            $hash = md5('$password');
            $query->execute(array($username));
            $data = $query->fetch();
            if($data['password'] == md5($password)){
                return true;
            } else {
               return false;
            }
    }
    
    function setscore($username){
            $query = $GLOBALS['db']->prepare("SELECT high_score FROM a6_User WHERE username = ?");
            $query->execute(array($username));
            $data = $query->fetch();
            return $data['high_score'];
    }
    
    ?>
<!DOCTYPE html>
<html>
    <head>
        <title>Puyo Pop - COMP 426</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="style.css">
        <link href='http://fonts.googleapis.com/css?family=Indie+Flower' rel='stylesheet' type='text/css'>
        <script src="jquery.min.js"></script>
        <script src="https://rawgithub.com/madrobby/keymaster/master/keymaster.js"></script>
    </head>
    <body>
        <a class='account' href="index.php"> Home </a>
        <div class='center'>
            <h1 class='title'>Puyo Pop</h1>
            <form name="login" action="login.php" method="POST">
                username <br>
                <input type="text" name="username"/><br />
                password <br> 
                <input type="password" name="password"/><br />
                <button class='btn' type="submit">Login</button>
                <?php
                    if($error != ""){
                        echo $error;
                    }
                ?>
            </form>
        </div>
    </body>
</html>