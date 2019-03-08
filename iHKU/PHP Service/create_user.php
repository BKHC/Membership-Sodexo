<?php
	
require_once("db_config.php");
session_start();
  
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
  	$password = md5($password);
  	$query = "INSERT INTO User (Email, Password, Alias) 
  			  VALUES('$email', '$password', '$alias')";
  	mysqli_query($db, $query);
  	$_SESSION['email'] = $email;
  	$_SESSION['success'] = "You are now logged in";
  }
}
?>
