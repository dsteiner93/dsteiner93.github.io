<?php
    session_start(); // Right at the top of your script
    require_once "init.php";
    require_once 'orm/User.php';
    $server_dir = $_SERVER['HTTP_HOST'] . rtrim(dirname($_SERVER['PHP_SELF']), '/\\') . '/';
     
    if ($_SERVER['REQUEST_METHOD'] == "POST"){ 
        $username = $_POST['username'];
        $password = $_POST['password'];
        $error = "";
      
        if(login($username, $password)){
            $_SESSION["username"] = $username;
            $_SESSION["high_score"] = setscore($username);
            $user = User::findByUsername($username);
            header("Content-type: application/json");
            print($user->getJSON());
           
        } else{
            $GLOBALS['error'] = ' <p> Error with Login. </p>';
             header("HTTP/1.0 400 Bad Request");
             print("Failure to Login.");
             exit();
        }
     
    } else if($_SERVER['REQUEST_METHOD'] == "GET"){
        
        if(!$_SESSION["username"]){
            print("");
        } else{
            print($_SESSION["username"]);
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