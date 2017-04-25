<?php
include 'config.php';
include 'slack-send.php';

$errorMSG = "";
$Body = ""; 
// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}
 
// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}
 
// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["message"];
}
 
$EmailTo = "contact@blocksense.io";
$Subject = "New Contact Form Message";
 
// prepare email body text
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
 
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
 
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// prepare #slack text
$slackText = "New *english* contact form message: \n *Sent by:* ".$name."\n *Email:* ".$email."\n *Message:* " .$message;
//$slackText = "Testing form"; 
// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// Post to #Slack
if ($success) {
    slacksend($slackText);
} 

// post success message
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}
 
?>
