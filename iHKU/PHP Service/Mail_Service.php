<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	require_once("../library/PHPMailer/src/Exception.php");
	require_once("../library/PHPMailer/src/PHPMailer.php");
	require_once("../library/PHPMailer/src/SMTP.php");
	$mail = new PHPMailer();                              // Passing `true`
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'mail.cs.hku.hk;mail.cs.hku.hk';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'gavin97@hku.hk';                 // SMTP username
    $mail->Password = 'hkus2009181';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to
?>
