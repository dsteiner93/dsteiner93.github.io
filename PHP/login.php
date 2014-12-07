<!DOCTYPE html>
<html>
    <head>
        <title>Puyo Pop - COMP 426</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="style.css">
        <link href='http://fonts.googleapis.com/css?family=Indie+Flower' rel='stylesheet' type='text/css'>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script src="puyo.js"></script>
        <script src="https://rawgithub.com/madrobby/keymaster/master/keymaster.js"></script>
    </head>
    <body>
        <a class='account' href="index.php"> Home </a>
        <div class='center'>
            <h1 class='title'>Puyo Pop</h1>
            <form id='login' name="login" method="POST">
                username <br>
                <input type="text" name="username"/><br />
                password <br> 
                <input type="password" name="password"/><br />
                <button id='submit' class='btn' type="submit">Login</button>
            </form>
        </div>
    </body>
</html>