<?php
	require_once("db_config.php");
	session_start();
	$email_name = base64_decode($_GET['validate']);
	$email = "$email_name@connect.hku.hk";

		$query = "UPDATE User SET Verify = 'Yes' WHERE Email = '$email'";

		$result = mysqli_query($db, $query);

		if(mysqli_affected_rows($db) == 1)
		{
			echo ("Verify Successful.");

		}
		else
		{
			echo ("Wrong Link, Please try again.");
		}

  	mysqli_close($db);
?>
