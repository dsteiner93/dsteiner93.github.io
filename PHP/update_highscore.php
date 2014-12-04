<?php
require_once 'init.php';
session_start();


$highscore =  $_POST['high_score'];
$username = $_SESSION['username'];

if($_SESSION['logged']==true){
    
        $updateScore = $GLOBALS['db']->prepare("
			UPDATE a6_User SET high_score= ? WHERE username= ?
	");
    
	$updateScore->execute(array(
		$highscore,
                $username
	));
        
         $_SESSION['high_score'] = $highscore;
}

 
