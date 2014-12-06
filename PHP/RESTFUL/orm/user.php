<?php
require_once 'init.php';

class user {
  private $username;
  private $email;
  private $high_score;
  private $password;

  private function __construct($username, $email, $high_score, $password) {
    $this->username = $username;
    $this->email = $email;
    $this->high_score = $high_score;
    $this->password = $password;
  }
  
  public static function create($username, $email, $high_score, $password) {

   ///$dbh->beginTransaction();
   
        $addUser = $GLOBALS['db']->prepare("
    	    INSERT INTO a6_User (email, username, high_score, password)
    	    VALUES (:email, :username, :high_score, :password)
    	");
            
       // $password = md5($password);
    
    	$addUser->execute(array(
    		'email' => $email,
    		'username' => $username,
                'high_score' => $high_score,
                'password' => $password          
    	));
        
       // $result = $addUser->fetch();
        
       // print_r($GLOBALS['db']->lastInsertId());
    
    if ($GLOBALS['db']->lastInsertId()) {
      return new User($username, $email, $high_score, $password);
    }
    return null;
  }
  
  public function updateEmail($email){
    $this->email;
    return $this->update();
  }
  
  function findByUsername($username) {

    $query = $GLOBALS['db']->prepare("SELECT * FROM a6_User WHERE username = ?");
    
    $query->execute(array($username));
    if ($query) {
    
    $data = $query->fetch();
    
    if ($data[0] == null) {
  
	return null;
    }
    
    return new user($data['user_id'],
		    $data['username'],
		    $data['email'],
		    $data['high_score'],
                    $data['password']);
    }
    
    return null;
  }
  
    public function getJSON() {
        
    $json_obj = array('user_id' => $this->id,
		      'username' => $this->username,
		      'email' => $this->email,
		      'high_score' => $this->high_score,
		      'password' => $this->password);
    return json_encode($json_obj);
  }
  
  public function getAllUsers(){
    
    $query = $GLOBALS['db']->prepare("SELECT username FROM a6_User");

    $query->execute();
    
    $data = $query->fetchAll();
    
    $user_array = array();

    if ($data) {
      foreach ($data as $row) {
            $user_array[] = $row['username'];
        } 
    }
    return $user_array;
  }
  
  
  public function delete() {
    $query = $GLOBALS['db']->prepare("DELETE FROM a6_User where username = ?");
    $query->execute(array( $this->username));
  }
  
  
  
   private function update() {
    
    $query = $GLOBALS['db']->prepare("UPDATE a6_User SET
                                     email = ?,
                                     high_score= ?,
                                     password = ?
                                     WHERE username= ?");

    $query->execute();
   
    return $data->fetchAll();
   
   }
   
   public function isUnique($email, $type ){
    
     $query = $GLOBALS['db']->prepare("SELECT count(*) as num FROM a6_User WHERE ". $type ."= ?");
                
                $query->execute(array(
                    $email
                ));
                
                $count = $query->fetch();
                if($count['num'] == 0){
                    return true;
                }
                
                return false;
   }
   

}

?>