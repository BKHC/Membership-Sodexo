<?php
	require_once("db_config.php");
	session_start();
  
	$email = $_POST['email'];
	$user_password = md5($_POST['password']);
  $alias = $_POST['alias'];

  
		$query = "UPDATE User SET Email = '$email', Password = '$user_password', Alias = '$alias' WHERE Email = '$email'";
    
		$result = mysqli_query($db, $query);
    
		if(mysqli_affected_rows($db) == 1)
		{
			echo ("Change Successful.");
		}
		else
		{
			echo ("There is something wrong, Please try again.");
		}
  	mysqli_close($db);
?>
