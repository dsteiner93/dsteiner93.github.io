<?php
session_start();
require_once "init.php";
$email          = trim($_POST['email']);
$username       = trim($_POST['username']);
$password       = trim($_POST['password']);
$password_match = trim($_POST['password_match']);

$success = false;
$error = "";
$next_page = 'game.php';

$server_dir = $_SERVER['HTTP_HOST'] . rtrim(dirname($_SERVER['PHP_SELF']), '/\\') . '/';

//if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//    
//
//    $error = validate($email, $password, $username, $password_match);
//    
//    if($success){
//        signup($email, $username, $password);
//        $next_page = 'game.php';
//   // Add error message to the query string
//   $query_string .= '&login=' . $success;
//   // This message asks the server to redirect to another page
//   header('Location: http://' . $server_dir . $next_page);
//   
//    } 
//
//}

function signup($email, $username, $password){
    
        $addUser = $GLOBALS['db']->prepare("
			INSERT INTO a6_User (email, username, password)
			VALUES (:email, :username, :password)
	");
        
        $password = md5($password);

	$addUser->execute([
		'email' => $email,
		'username' => $username,
                'password' => $password
                
	]);
        
          $_SESSION['logged']=true;
          $_SESSION["username"] = $username;




}

function validate($email, $password, $username, $password_match) {
    
//$emailCount;
//$usernameCount;
//$passwordCorrect = false;
//  
//
//if (isset($email) && $email != '') {
//    
//    if (filter_var($email, FILTER_VALIDATE_EMAIL))
//    {
//        $query = $GLOBALS['db']->prepare("SELECT count(*) as num FROM a6_User WHERE email = ?");
//        
//        $query->execute(array(
//            $email
//        ));
//        
//        $emailCount = $query->fetch();
//    } else {
//         $message = $message."<p> Incorrect Email </p>";
//    }
//    
//} else {
//     $message = $message."<p> Please Enter Email </p>";
//}
//
//
//if (isset($username) && $username != '') {
//   
//    $query = $GLOBALS['db']->prepare("SELECT count(*) as num FROM a6_User WHERE username = ?");
//    
//    $query->execute(array(
//        $username
//    ));
//    
//    $usernameCount = $query->fetch();
//    
//} else {
//    $message = $message." <p>Please Enter a Username. </p>";
//}
//
//
// if (isset($password) && isset($password_match) && $password != '' && $password_match != '') {
//    if (($password == $password_match) && strlen($password) > 6) {
//        $passwordCorrect = true;
//                    
//    }
//} else {
//     
//    $message = $message."<p>Please Enter Password </p>";
//}
//
//
//if ($usernameCount['num'] == 0) {
//                 
//    if ($emailCount['num'] == 0) {
//        if ($passwordCorrect) {
//                        $GLOBALS['success'] = true;
//             $message ='<p> Successful Regisration </p>';
//
//        } else {
//           
//             $message = $message."<p>Passwords either don't match or not at least 6 characters.</p>";
//        }
//    } else {
//         $message = $message."<p> Email Already Used. </p>";
//    }
//} else {
//     $message = $message."<p> Username Taken. </p>";
//}
//
//return $message;

}

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
        <script src='main.js'></script>
        <script src="https://rawgithub.com/madrobby/keymaster/master/keymaster.js"></script>
    </head>
    <body>
           <a id='signup' href="register.php">Log In</a> 
<div class='center'>
                    <div id='title'>
				<h1 id='bubbleBig'>Puyo Pop</h1>
			</div>
			<div id='login'>
				<form action='register.php' method='post'>
					username<br> <input id='username' type='text' name='usxername' autocomplete=off ><br>
					password<br> <input  id='password' class='input' type='password' name='password' placeholder=''><br>
					<input id='submit' class='btn' type='submit' value='submit' >
				</form>
			</div>
                     <div id="members">
                <h2>Group Members:</h2>
                <p class='name'>David Steiner</p>
                <p class='name'>Adam Wang</p>
                <p class='name'>Volodymyr Siedlecki</p>
            </div>
                     
                   <a href="game.php">   <button class="btn" id='start'>  Play As Guest  </button></a>
<?php

            if(!$success) {
                echo "
                <p class='center'> Sign Up </p>
                <form action='index.php' method='post'>
                      email<br> <input  id='password' class='input' type='text' name='email' placeholder=''><br>
             username<br> <input id='username' type='text' name='username' autocomplete=off ><br>
             password<br> <input  id='password' class='input' type='password' name='password' placeholder=''><br>
               confirm password<br> <input  id='password' class='input' type='password' name='password_match' placeholder=''><br>
                  <input type='hidden' name='hidden' value='true'>
            <input id='submit' class='btn' type='submit' value='submit' >
             </form>";
               echo $error;
            }
?>

</div>

    </body>
</html>