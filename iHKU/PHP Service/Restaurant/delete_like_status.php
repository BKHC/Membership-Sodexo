<?php

require_once("db_config.php");
session_start();

  $commentID = mysqli_real_escape_string($db, $_GET['commentID']);
  $userID = mysqli_real_escape_string($db, $_GET['userID']);

  $query = "DELETE FROM `Like_post_Restaurant` WHERE `UserID`=$userID AND `PostID`=$commentID";
  $result = mysqli_query($db, $query);

?>
