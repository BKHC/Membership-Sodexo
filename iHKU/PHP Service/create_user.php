<?php
require_once("db_config.php");
session_start();


	  $email = mysqli_real_escape_string($db, $_POST['email']);
	  $password = mysqli_real_escape_string($db, $_POST['password']);
	  $alias = mysqli_real_escape_string($db, $_POST['nickname']);
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
			$password = md5($password);
			$query = "INSERT INTO `User` (UserID, Email, Password, Alias, Token, Verify) VALUES (NULL, '$email', '$password', '$alias', 'BTS', 'No')";
			mysqli_query($db, $query);
			$json = array(
			"state"=>"success",
			);
		}

		echo json_encode($json);

?>
