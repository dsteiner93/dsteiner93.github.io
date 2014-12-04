
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
<div id='main_container'>
      <div id='title'>
                <h1 id='bubbleBig'>Puyo Pop</h1>
            </div>
      <div id='output'>
     <?php
require_once "init.php";

$email          = trim($_POST['email']);
$username       = trim($_POST['username']);
$password       = trim($_POST['password']);
$password_match = trim($_POST['password_match']);

$emailCount;
$usernameCount;
$passwordCorrect = false;


if (isset($password) && isset($password_match) && $password != '' && $password_match != '') {
    if (($password == $password_match) && strlen($password) > 6) {
        $passwordCorrect = true;
    }
} else {
    echo "<p>Please Enter Password </p>";
}

if (isset($username) && $username != '') {
    $query = $db->prepare("SELECT count(*) as num FROM a6_User WHERE username = ?");
    
    $query->execute(array(
        $username
    ));
    
    $usernameCount = $query->fetch();
    
} else {
    echo " <p>Please Enter a Username. </p>";
}

if (isset($email) && $email != '') {
    
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $query = $db->prepare("SELECT count(*) as num FROM a6_User WHERE email = ?");
        
        $query->execute(array(
            $email
        ));
        
        $emailCount = $query->fetch();
    } else {
        echo "<p> Incorrect Email </p>";
    }
    
} else {
    echo "<p> Please Enter Email </p>";
}

//&& $emailCount['num'] == 0 && $passwordCorrect

if ($usernameCount['num'] == 0) {
    if ($emailCount['num'] == 0) {
        if ($passwordCorrect) { 
          
            $_SESSION["signedUp"] = true;

        } else {
            echo "<p>Passwords either don't match or not at least 6 characters.</p>";
        }
    } else {
        echo "<p> Email Already Used. </p>";
    }
} else {
    echo "<p> Username Taken. </p>";
}

?>
     
      </div>
</div>
    </body>
</html>
