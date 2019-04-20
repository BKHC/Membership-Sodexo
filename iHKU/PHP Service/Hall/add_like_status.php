<?php

require_once("db_config.php");
session_start();

  $like_status = mysqli_real_escape_string($db, $_GET['like_status']);
  $commentID = mysqli_real_escape_string($db, $_GET['commentID']);
  $userID = mysqli_real_escape_string($db, $_GET['userID']);

  $query = "INSERT INTO `Like_post_Hall` (`UserID`, `PostID`, `Like_Status`) VALUES ($userID, $commentID, $like_status)";
  $result = mysqli_query($db, $query);

?>
