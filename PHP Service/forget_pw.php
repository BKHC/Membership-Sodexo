<?php

	require_once("mail_service.php");
	require_once("db_config.php");
	function generateRandomString($length = 20) {
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $charactersLength = strlen($characters);
                $randomString = '';
			
                for ($i = 0; $i < $length; $i++){
			$randomString .= $characters[rand(0, $charactersLength - 1)];
                }
		
		return md5($randomString);
	}
	isExist = false;

    if($_POST["email"] == NULL){
        $user_name = mysqli_real_escape_string($db, $_POST["username"]);
        $query = "SELECT * FROM users WHERE username = '$user_name'";
    }
	else if($_POST["username"] == NULL){
        $user_email = mysqli_real_escape_string($db, $_POST["email"]);
        $query = "SELECT * FROM users WHERE email = '$user_email'";
    }
	
	
	
	$result = mysqli_query($db, $query);
	$count = mysqli_num_rows($result);
	switch ($count) {
		case 0:
			echo json_encode(array("state"=>"fail", "msg"=>"user_not_exist"));
			break;
		case 1:
			isExist = true;
			$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
			$user_email = $row["email"];
			$user_name = $row["username"];
			break;
		case 2:
            		echo json_encode(array("state"=>"fail", "msg"=>"multiple_users_matched"));
			break;
	}
	
	if(isExist){
		$token = generateRandomString();
		$query1 = "UPDATE users SET token = '$token' WHERE email = '$user_email' ";
		//Set sender and recipient
		$mail->setFrom("admin@admin.com", "Admin"); //Is there any email address to let us send email?
		$mail->addAddress($user_email);
		$mail->isHTML(true);
		$link = 'http://???/pw_reset.php?email='.$user_email.'&token='.$token;
		
		//Set content of the email
		$mail->Subject = "Password Reset Request";
		$mail->Body = "User(\"".$user_name."\") is requesting for a password reset. Please click the following link 
		<a href='$link' target='_blank'>Click here</a> to reset your password.";
		$mail->send();

		echo json_encode(array("state"=>"success"));
	}
	
?>
