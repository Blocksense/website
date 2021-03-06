$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
    	formError();
    	submitMSG(false, "Avez-vous rempli le formulaire correctement??");
        // handle the invalid form...
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});

function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
 
    $.ajax({
      type: "POST",
      url: "php/form-process.php",
      data: "name=" + name + "&email=" + email + "&message=" + message,
      success : function(text){
          if (text == "success"){
              formSuccess();
          } else {
              
              submitMSG(false,text);
          }
      }
  });
}

function formSuccess(){
    $("#contactForm")[0].reset();
		submitMSG(true, "Message Envoyé!")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}



function submitMSG(valid, msg){
        var msgClasses;
    if(valid){
        msgClasses = "h3 text-center text-success";
    } else {
        msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}