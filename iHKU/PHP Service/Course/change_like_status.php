<?php

require_once("db_config.php");
session_start();

  $like_status = mysqli_real_escape_string($db, $_GET['like_status']);
  $commentID = mysqli_real_escape_string($db, $_GET['commentID']);
  $userID = mysqli_real_escape_string($db, $_GET['userID']);

  $query = "UPDATE `Like_post_Course` SET `Like_Status`= $like_status WHERE `UserID`=$userID AND `PostID`=$commentID";
  $result = mysqli_query($db, $query);

?>
