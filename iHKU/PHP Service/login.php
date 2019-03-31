<?php

	require_once("db_config.php");

	session_start();
	$json = file_get_contents('php://input');
	$data = json_decode($json);
	$email = $data['email'];
	$user_password = $data['password'];
	if(!isset($_SESSION["username"]))
	{


		$query = "SELECT * FROM User WHERE email = '$email' and password = '$user_password'";

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
