<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require_once("db_config.php");
require_once("Mail_Service.php");
session_start();


function generateRandomString() {
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $charactersLength = strlen($characters);
                $randomString = '';
								$length = 20;

								for ($i = 0; $i < $length; $i++){
			$randomString .= $characters[rand(0, $charactersLength - 1)];
                }
		return md5($randomString);

	}

	  $email = "vincent031052@gmail.com"; //mysqli_real_escape_string($db, $_POST['email']);
	  $password = "123456789"; //mysqli_real_escape_string($db, $_POST['password']);
	  $alias = "fishying"; //mysqli_real_escape_string($db, $_POST['nickname']);
	  $user_check_query = "SELECT * FROM User WHERE Email='$email'";
	  $result = mysqli_query($db, $user_check_query);
	  $user = mysqli_fetch_assoc($result);

		if ($user) { // if user exists
				$json = array(
		    "msg"=>"email already exists",
		  	);
		}
		else
		{

			$token = generateRandomString();
			$password = md5($password);
			$query = "INSERT INTO `User` (UserID, Email, Password, Alias, Token, Verify) VALUES (NULL, '$email', '$password', '$alias', '$token', 'No')";
			mysqli_query($db, $query);
			//Set sender and recipient
			$mail->setFrom("", "Admin");
			$mail->addAddress($email);
			$mail->isHTML(true);
			$link = 'http://ihku/login.php?email='.$email.'&token='.$token; //i dont know what the link should be lol
			//Set content of the email
			$mail->Subject = "Welcome to iHKU";
			$mail->Body = "Dear User(\"".$user_name."\"), welcome using iHKU. Please click the following link
			<a href='$link' target='_blank'>Click here</a> to start your journey.";
			$mail->send();
			$json = array(
			"state"=>"success",
			);

		}

		echo json_encode($json);

?>
