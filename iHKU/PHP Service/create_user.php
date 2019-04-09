<?php
	
require_once("db_config.php");
require_once("mail_service.php");
session_start();
 

function generateRandomString($length = 20) {
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $charactersLength = strlen($characters);
                $randomString = '';
                for ($i = 0; $i < $length; $i++){
			$randomString .= $characters[rand(0, $charactersLength - 1)];
                }
		return md5($randomString);
	}

if (isset($_POST['user_reg'])) {
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $password = mysqli_real_escape_string($db, $_POST['password']);
  $alias = mysqli_real_escape_string($db, $_POST['alias']);
  $user_check_query = "SELECT * FROM User WHERE Email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['email'] === $email) {
      echo json_encode("msg"=>"email already exists");
    }
  }
  else
  {
	  $token = generateRandomString();
	  $password = md5($password);
	  $query = "INSERT INTO User (Email, Password, Alias) VALUES('$email', '$password', '$alias')";
	  mysqli_query($db, $query);
	  $query1 = "UPDATE User SET token = '$token' WHERE email = '$user_email' ";
	  mysqli_query($db, $query1);
	  //Set sender and recipient
		$mail->setFrom("gavin97@hku.hk", "Admin");
		$mail->addAddress($user_email);
		$mail->isHTML(true);
		$link = 'http://ihku/login.php?email='.$user_email.'&token='.$token; //i dont know what the link should be lol
		//Set content of the email
		$mail->Subject = "Welcome to iHKU";
		$mail->Body = "Dear User(\"".$user_name."\"), welcome using iHKU. Please click the following link
		<a href='$link' target='_blank'>Click here</a> to start your journey.";
		$mail->send();
  }
}
?>
