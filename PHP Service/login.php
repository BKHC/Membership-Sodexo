<?php
	
	require_once("db_config.php");
	
	session_start();

	if(!isset($_SESSION["username"]))
	{
		$user_name = mysqli_real_escape_string($db, $_POST['username']);
		
		$user_password = md5(mysqli_real_escape_string($db, $_POST['password']));
		
		$query = "SELECT * FROM users WHERE username = '$user_name' and password = '$user_password'";
		
		$result = mysqli_query($db, $query);
		
		$count = mysqli_num_rows($result); 
		
		if($count == 1)
		{
			$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
			$_SESSION["username"] = $user_name;
			setcookie("username", $user_name);
			echo json_encode(array("state"=>"success", "username"=>$user_name));
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
