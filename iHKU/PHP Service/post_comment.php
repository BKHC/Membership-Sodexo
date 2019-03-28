<?php

require_once("db_config.php");
session_start();

$UserID = mysqli_real_escape_string($db, $_POST['UserID']);
$HallID = mysqli_real_escape_string($db, $_POST['HallID']);
$Rating_1 = mysqli_real_escape_string($db, $_POST['Rating_1']);
$Rating_2 = mysqli_real_escape_string($db, $_POST['Rating_2']);
$Rating_3 = mysqli_real_escape_string($db, $_POST['Rating_3']);
$Rating_4 = mysqli_real_escape_string($db, $_POST['Rating_4']);
$Topic = mysqli_real_escape_string($db, $_POST['Topic']);
$Comment = mysqli_real_escape_string($db, $_POST['Comment']);
$Image_num = mysqli_real_escape_string($db, $_POST['Image_num']);


$insert = "INSERT INTO `Hall Rate`(`UserID`, `HallID`, `Rating_1`, `Rating_2`, `Rating_3`, `Rating_4`, `Topic`, `Comment`, `Image_num`, `Date`) VALUES ($UserID, $HallID, $Rating_1, $Rating_2, $Rating_3, $Rating_4, $Topic, $Comment, $Image_num)";

?>
