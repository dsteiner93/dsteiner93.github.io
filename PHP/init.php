<?php
/**
 * Created by PhpStorm.
 * User: siedleck
 * Date: 11/5/14
 * Time: 4:40 PM
 */

$host= 'classroom.cs.unc.edu';
$user= '';
$pwd= '';

try {
    $db = new PDO("mysql:host=$host;dbname=siedleckdb", $user, $pwd);
    /*** echo a message saying we have connected ***/
   
}
catch(PDOException $e)
{
    echo "COULD NOT CONNECT TO DATABASE";
}

