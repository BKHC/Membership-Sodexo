<?php
require_once("db_config.php");
//Receive the RAW post data.
$content = file_get_contents("php://input");

//Attempt to decode the incoming RAW post data from JSON.
$decoded = json_decode($content, true);
//If json_decode failed, the JSON is invalid.
if(!is_array($decoded)){
    throw new Exception('Received content contained invalid JSON!');
}

//get data from the decoded json
$topic = $decoded['topic'];
$rating_1 = $decoded['rating_1'];
$rating_2 = $decoded['rating_2'];
$rating_3 = $decoded['rating_3'];
$rating_4 = $decoded['rating_4'];
$comment = $decoded['comment'];
$hallId = $decoded['hallId'];
$userId = '1'; // to be get by $decoded['userId'] when login implemented

$query = "INSERT INTO `Hall Rate` (ID, UserID, HallID, Rating_1, Rating_2, Rating_3, Rating_4, Topic, Comment, Image_num, Date)
 VALUES (NULL, '$userId', '$hallId', '$rating_1', '$rating_2', '$rating_3', '$rating_4', '$topic', '$comment', '0', CURRENT_TIMESTAMP)";
if (mysqli_query($db, $query)){
  $json = array(
    'comment' => "success",
  );
  echo json_encode($json);
} else {
  $json = array(
    'comment' => "nogood",
  );
  echo json_encode($json);
}
?>
