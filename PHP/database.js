
var noErrors = false;
$(document).ready(function(){


    $("input").keyup(function() {
         noErrors = false;
   noErrors = validateEmail();
  noErrors = validateUsername();
  noErrors = matchPasswords();

    });
    


});


function setToGreen(id){
   for(var i = 0; i < id.length; i++){
   $("#" + id[i]).css('background-color', 'lightgreen');
   }
}

function setToRed(id){
    for(var i = 0; i < id.length; i++){
   $("#" + id[i]).css('background-color', 'pink');
    }
}


function matchPasswords() {
   
   var password = $('#password').val();
   var password_match = $('#password_match').val();
   
   
   if (password.length > 6) {
      
    if (password == password_match) {
       setToGreen(['password', 'password_match']);
       return true;
    }
     
      return false;
   setToRed(['password', 'password_match']);
   }
  
  
  
setToRed(['password', 'password_match']);
 return false;
}


function validateEmail() {
   var email = $('#email').val();
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (re.test(email) ) {
     
       setToGreen(['email']);
    
     return true;
    } else{
      setToRed(['email']);
    
      return true;
    }
}

function validateUsername(){

   var check    = $("#username").val();
    // forming the queryString
    var data            = 'user='+ check;
    //alert(check);
    
    var isValid = true;
    
   if(check != "") {

        $.ajax({
            type: "POST",
            url: "check_username.php",
            data: data,
            beforeSend: function(html) { // this happen before actual call
               // alert('hello');
            },
            success: function(html){ // this happen after we get result
      
                if (html != 'true') {
                  setToRed(['username']);
                  isValid = false;
                } else{
                  setToGreen(['username']);
                  $('#username').css('background-color', 'lightgreen');
                  
                }

            }
        });
}
setToRed(['username']);
return isValid;

}



