<?php
require_once("db_config.php");
session_start();

$topic = $_POST['topic'];
$rating_1 = $_POST['rating_1'];
$rating_2 = $_POST['rating_2'];
$rating_3 = $_POST['rating_3'];
$rating_4 = $_POST['rating_4'];
$comment = $_POST['comment'];
$hallId = $_POST['hallId'];
$userId = $_POST['userId'];
$image_num = $_POST['image_num'];

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
$query = "INSERT INTO `Hall Rate` (ID, UserID, HallID, Rating_1, Rating_2, Rating_3, Rating_4, Topic, Comment, Image_num, Date)
 VALUES (NULL, '$userId', '$hallId', '$rating_1', '$rating_2', '$rating_3', '$rating_4', '$topic', '$comment', '$image_num', CURRENT_TIMESTAMP)";
if (mysqli_query($db, $query)){
  $json = array(
    'comment' => "OK",
  );
} else {
  $json = array(
    'comment' => "Please try again",
  );
}

$query= "SELECT MAX(`ID`) AS ID FROM `Hall Rate` WHERE `HallID`= $hallId";
$que = mysqli_query($db, $query);
$result = mysqli_fetch_assoc($que);
$id = $result['ID'];

if ($image_num != 0){
$target_dir = "/student/15/iscs/wyvying/public_html/iHKU/hall_comment/$id/";
$oldmask = umask(0);
mkdir($target_dir, 0777, true);
umask($oldmask);

for ($i = 0; $i < count($_FILES["img"]["name"]); $i++){
$target_file = $target_dir . basename($_FILES["img"]["name"][$i]);
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
move_uploaded_file($_FILES["img"]["tmp_name"][$i], $target_file);
}
}
} else {
  $json = array(
    'comment' => "Contain Bad Words",
  );
}

echo json_encode($json);

?>
