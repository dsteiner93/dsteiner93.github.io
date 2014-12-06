<?php
require_once 'init.php';

require_once 'orm/User.php';

$path_components = explode('/', $_SERVER['PATH_INFO']);

//print($_SERVER['REQUEST_METHOD']);

if ($_SERVER['REQUEST_METHOD'] == "GET") {

  if ((count($path_components) >= 2) && ($path_components[1] != "")) {

    // Interpret <id> as integer
    $username = ($path_components[1]);

    // Look up object via ORM
    $user = user::findByUsername($username);
    
    if ($user == null) {
      // Todo not found.
      header("HTTP/1.0 404 Not Found");
      print("Todo id: " . $todo_id . " not found.");
      exit();
    }

    // Check to see if deleting
    if (isset($_REQUEST['delete'])) {
       // echo 'delete called';
      $user->delete();
      header("Content-type: application/json");
      print(json_encode(true));
      exit();
    } 

    // Normal lookup.
    // Generate JSON encoding as response
    header("Content-type: application/json");
    print($user->getJSON());
    exit();

  }

  // ID not specified, then must be asking for index
  header("Content-type: application/json");
  print(json_encode(User::getAllUsers()));
  exit();

} else if($_SERVER['REQUEST_METHOD'] == "POST"){
    
   
    if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {

    
    //creates new
    } else{
        //check if a valid username
    if (!isset($_REQUEST['username']) || $_REQUEST['username'] == "") {
      header("HTTP/1.0 400 Bad Request");
      print("Missing Username");
      exit();
    } else if(!User::isUnique($_REQUEST['username'], 'username')){
      header("HTTP/1.0 400 Bad Request");
      print("Username Taken");
      exit();
    } else{
      $username = $_REQUEST['username'];
    }
    
    //check is a valid email
    if (!isset($_REQUEST['email']) || !filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL)){
      header("HTTP/1.0 400 Bad Request");
      print("Incorrect Email");
      exit();
    } else if(!User::isUnique($_REQUEST['email'], 'email')){
      header("HTTP/1.0 400 Bad Request");
      print("Email Already in Use");
      exit();
    } else{
      $email =  $_REQUEST['email'];
    }
      
    
    //password length is checked with javascript
    if (!isset($_REQUEST['password']) || strlen($_REQUEST['password']) < 6) {
      header("HTTP/1.0 400 Bad Request");
      print("No Password");
      exit();
    } else{
        $password = md5($_REQUEST['password']);
    }
    
    $high_score = null;
    //new user is created
    $new_user = User::create($username, $email, $high_score, $password);
    
    // Report if failed
    if ($new_user == null) {
      header("HTTP/1.0 500 Server Error");
      print("Server couldn't create new user.");
      exit();
    }
    
    //Generate JSON encoding of new Todo
    header("Content-type: application/json");
    print($new_user->getJSON());
    exit();
   
    }
    
    //// Return JSON encoding of updated Todo
    //header("Content-type: application/json");
    //print($new_user->getJSON());
    //exit();
    
    
}
    
header("HTTP/1.0 400 Bad Request");
print("Did not understand URL");
?>