<?php

require_once("db_config.php");
session_start();

  $id = mysqli_real_escape_string($db, $_GET['request_id']);
  $user_check_query = "SELECT Alias FROM User WHERE UserID='id' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);

  if ($user) { // if user exists
      echo $user;
  }
?>
