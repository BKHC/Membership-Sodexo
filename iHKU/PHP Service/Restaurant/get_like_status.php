<?php

require_once("db_config.php");
session_start();

  $commentID = mysqli_real_escape_string($db, $_GET['commentID']);
  $userID = mysqli_real_escape_string($db, $_GET['userID']);

  $query = "SELECT * FROM `Like_post_Restaurant` WHERE `UserID`=$userID AND `PostID`=$commentID LIMIT 1";
  $result = mysqli_query($db, $query);
  if ($result->num_rows > 0) {
    $row = mysqli_fetch_assoc($result);
    $like_status = $row['Like_Status'];
  } else
    $like_status = -1;

  $query = "SELECT count('PostID') AS likes FROM `Like_post_Restaurant` WHERE `Like_Status`= 1 AND `PostID`=$commentID";
  $result = mysqli_query($db, $query);
  $row = mysqli_fetch_assoc($result);
  $likes = $row['likes'];

  $query = "SELECT count('PostID') AS dislikes FROM `Like_post_Restaurant` WHERE `Like_Status`= 0 AND `PostID`=$commentID";
  $result = mysqli_query($db, $query);
  $row = mysqli_fetch_assoc($result);
  $dislikes = $row['dislikes'];

  $json = array(
    'likes' => $likes,
    'dislikes' => $dislikes,
    'like_status' => $like_status);
  echo json_encode($json);

?>
