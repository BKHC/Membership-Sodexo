<?php
require_once("db_config.php");
session_start();

$topic = $_POST['topic'];
$rating_1 = $_POST['rating_1'];
$rating_2 = $_POST['rating_2'];
$rating_3 = $_POST['rating_3'];
$rating_4 = $_POST['rating_4'];
$comment = $_POST['comment'];
$courseId = $_POST['courseId'];
$userId = $_POST['userId'];

$query = "INSERT INTO `Course Rate` (ID, UserID, CourseID, Rating_1, Rating_2, Rating_3, Rating_4, Topic, Comment, Image_num, Date)
 VALUES (NULL, '$userId', '$courseId', '$rating_1', '$rating_2', '$rating_3', '$rating_4', '$topic', '$comment', '0', CURRENT_TIMESTAMP)";

if (mysqli_query($db, $query)){
  $json = array(
    'comment' => "success",
  );
  echo json_encode($json);
} 

else {
  $json = array(
    'comment' => "Please try again",
  );
  echo json_encode($json);
}

?>
