<?php
	
	require_once("db_config.php");
	
	session_start();
	if(!isset($_SESSION["username"]))
	{
		$email = mysqli_real_escape_string($db, $_POST['email']);
		
		$user_password = md5(mysqli_real_escape_string($db, $_POST['password']));
		
		$query = "SELECT * FROM users WHERE email = '$email' and password = '$user_password'";
		
		$result = mysqli_query($db, $query);
		
		$count = mysqli_num_rows($result); 
		
		if($count == 1)
		{
			$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
			$_SESSION["email"] = $email;
			setcookie("email", $email);
			echo json_encode(array("state"=>"success", "email"=>$email));
			$_SESSION['id'] = $row['id'];
			$_SESSION['logged'] = true;
		}
		else
		{
			echo json_encode(array("state"=>"fail", "msg"=>"incorrect_information"));
		}
	}
  	mysqli_close($db);
?>
