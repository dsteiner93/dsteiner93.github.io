<?php
session_start();
require_once "init.php";
$data;

function getUserData(){
    
        $query = $GLOBALS['db']->prepare("SELECT username, high_score FROM a6_User ORDER BY high_score DESC");
        
        $query->execute();
        
        $data = $query->fetchAll();
                
        //print_r($data);
        
        return $data;
}

function printTable($data){
    
    $i = 1;
    foreach ($data as $row){
        
        if(isset($row['high_score']) && $row['high_score'] != 0) {
               echo "  <TR>
        
      <TD>".$i."</TD>
      <TD>".$row['username']."</TD>
      <TD>".$row['high_score']."</TD>
   </TR> ";
    $i++;
        }
  
    }
        


        
    }
    


?>

<!doctype html>

<html lang="en">
<head>
    <title> Scoreboard </title>
     <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
     <a id='signup' href="game.php"> Back </a>
     
    <div class='center'>
     <div id='title'>
                <h1 id='bubbleSmall'>Puyo Pop</h1>
            </div>
     
    <TABLE class='center' BORDER="5" cellspacing="0" cellpadding="0">
   <TR>
     
   </TR>
      <TH>Rank</TH>
      <TH>User</TH>
       <TH>Score</TH>
       </TR>
      
      <?php
        $data = getUserData();
        printTable($data);
        ?>
</TABLE>
      </div>
</body>
</html>
