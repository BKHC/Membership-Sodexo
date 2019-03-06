<?php
	
require_once("db_config.php");
session_start();
  
if (isset($_POST['user_reg'])) {
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $password = mysqli_real_escape_string($db, $_POST['password']);
  $first_name = mysqli_real_escape_string($db, $_POST['first_name']);
  $last_name = mysqli_real_escape_string($db, $_POST['last_name']);
  $phone_number = mysqli_real_escape_string($db, $_POST['phone_number']);
  $user_check_query = "SELECT * FROM users WHERE email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['email'] === $email) {
      echo json_encode("msg"=>"email already exists");
    }
  }
  if (count($errors) == 0) {
  	$password = md5($password);
  	$query = "INSERT INTO users (email, password, first_name, last_name, phone_number) 
  			  VALUES('$email', '$password', '$first_name', '$last_name', '$phone_number')";
  	mysqli_query($db, $query);
  	$_SESSION['email'] = $email;
  	$_SESSION['success'] = "You are now logged in";
  }
}
?>
