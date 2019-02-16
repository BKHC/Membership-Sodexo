<?php
	
require_once("db_config.php");
session_start();
$errors = array(); 
  
if (isset($_POST['user_reg'])) {

  $username = mysqli_real_escape_string($db, $_POST['username']);
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $password = mysqli_real_escape_string($db, $_POST['password']);
  $first_name = mysqli_real_escape_string($db, $_POST['first_name']);
  $last_name = mysqli_real_escape_string($db, $_POST['last_name']);
  $phone_number = mysqli_real_escape_string($db, $_POST['phone_number']);

  // form validation
  if (empty($username)) { array_push($errors, "Username is required"); }
  if (empty($email)) { array_push($errors, "Email is required"); }
  if (empty($password)) { array_push($errors, "Password is required"); }
  if (empty($first_name)) { array_push($errors, "Please fill in your name"); }
  if (empty($last_name)) { array_push($errors, "Please fill in your name"); }
  if (empty($phone_number)) { array_push($errors, "Phone number is required"); }

  $user_check_query = "SELECT * FROM users WHERE username='$username' OR email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['username'] === $username) {
      array_push($errors, "Username already exists");
    }

    if ($user['email'] === $email) {
      array_push($errors, "email already exists");
    }
  }

  if (count($errors) == 0) {
  	$password = md5($password);

  	$query = "INSERT INTO users (username, email, password, first_name, last_name, phone_number) 
  			  VALUES('$username', '$email', '$password', '$first_name', '$last_name', '$phone_number')";
  	mysqli_query($db, $query);
  	$_SESSION['username'] = $username;
  	$_SESSION['success'] = "You are now logged in";
  	header('location: homepage.html');
  }
}

?>
