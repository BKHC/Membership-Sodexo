<?php

	require_once("db_config.php");

	session_start();

	$email = $_POST['email'];
	$user_password = $_POST['password'];
	if(!isset($_SESSION["username"]))
	{


		$query = "SELECT UserID FROM User WHERE Email = '$email' and Password = '$user_password' and Verify = 'Yes'";
 and 
		$result = mysqli_query($db, $query);

		$count = mysqli_num_rows($result);

		if($count == 1)
		{
			$id_result = mysqli_fetch_assoc($result);
			$id = $id_result['UserID'];
			$_SESSION["email"] = $email;
			setcookie("email", $email);
			echo json_encode(array("state"=>"success", "id"=>$id));
			$_SESSION['id'] = $id;
			$_SESSION['logged'] = true;
		}
		else
		{
			echo json_encode(array("state"=>"fail", "login"=>$email));
		}
	}
  	mysqli_close($db);
?>
