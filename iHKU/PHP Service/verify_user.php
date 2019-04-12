<?php
	require_once("db_config.php");
	session_start();
	$email = $_GET['email'];
	$token = $_GET['token'];
  
		$query = "UPDATE User SET Verify = '$Yes' WHERE Email = '$email' and Token = '$token'";
    
		$result = mysqli_query($db, $query);
		$count = mysqli_num_rows($result);
    
		if($count == 1)
		{
			echo ("Verify Successful");

		}
		else
		{
			echo ("Wrong Link, Please try again");
		}
	}
  	mysqli_close($db);
?>
