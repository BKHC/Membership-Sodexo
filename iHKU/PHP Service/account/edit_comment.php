<?php
require_once("db_config.php");
session_start();

$topic = $_POST['topic'];
$rating_1 = $_POST['rating_1'];
$rating_2 = $_POST['rating_2'];
$rating_3 = $_POST['rating_3'];
$rating_4 = $_POST['rating_4'];
$comment = $_POST['comment'];
$category = $_POST['category'];
$id = $_POST['id'];

$badwords = array('fuck', 'shit', 'piss off', 'dick', 'asshole','ass', 'bitch', 'bastard', 'bollock', 'bugger',
'bloody hell', 'choad','shag','wnaker','piss','twat');
$found = 0;
for ($i = 0; $i < count($badwords); $i++){
  if(stristr($comment, $badwords[$i]) !== FALSE) {
    $found = 1;
    break;
  }

  if(stristr($topic, $badwords[$i]) !== FALSE) {
    $found = 1;
    break;
  }
}

if ($found == 0){
if ($category == '0'){
  $query = "UPDATE `Restaurant Rate` SET Rating_1 = '$rating_1', Rating_2 = '$rating_2', Rating_3 = '$rating_3', Rating_4 = '$rating_4',
  Topic = '$topic', Comment= '$comment', Date = CURRENT_TIMESTAMP WHERE ID=$id";
} else if ($category == '1'){
  $query = "UPDATE `Hall Rate` SET Rating_1 = '$rating_1', Rating_2 = '$rating_2', Rating_3 = '$rating_3', Rating_4 = '$rating_4',
  Topic = '$topic', Comment= '$comment', Date = CURRENT_TIMESTAMP WHERE ID=$id";
} else {
  $query = "UPDATE `Course Rate` SET Rating_1 = '$rating_1', Rating_2 = '$rating_2', Rating_3 = '$rating_3', Rating_4 = '$rating_4',
  Topic = '$topic', Comment= '$comment', Date = CURRENT_TIMESTAMP WHERE ID=$id";
}

if (mysqli_query($db, $query)){
  $json = array(
    'comment' => "OK",
  );
} else {
  $json = array(
    'comment' => "Please try again",
  );
}
} else {
  $json = array(
    'comment' => "Contain Bad Words",
  );
}

echo json_encode($json);

?>
