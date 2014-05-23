<?php

if(!empty($_POST)) {

	require 'PHPMailerAutoload.php';

	if(!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['text']))
		exit;

	$name  = htmlentities( $_POST['name'] );
	$email = htmlentities( $_POST['email'] );
	$text  = htmlentities( $_POST['text'] );

	$to = 'jay@kumonitor.com';
	$subject = 'Kuminitor Website (Contact)';

	$message = $name;
	$message .= '<br /><br />Message:<br />';
	$message .= $text;


	//Create a new PHPMailer instance
	$mail = new PHPMailer();

	// Set PHPMailer to use the sendmail transport
	$mail->isSendmail();
	//Set who the message is to be sent from
	$mail->setFrom($email, $name);
	//Set who the message is to be sent to
	$mail->addAddress($to, 'Kuminitor');
	//Set the subject line
	$mail->Subject = $subject;
	//Read an HTML message body from an external file, convert referenced images to embedded,
	//convert HTML into a basic plain-text alternative body
	$mail->msgHTML($message);

	//send the message, check for errors
	if (!$mail->send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	}


}