<?php

require_once("db_config.php");
session_start();

$json = file_get_contents('php://input');
$data = json_decode($json);

$UserID = mysqli_real_escape_string($db, $data["userID"]);
$HallID = mysqli_real_escape_string($db, $data["hallID"]);
$Rating_1 = mysqli_real_escape_string($db, $data["rating_1"]);
$Rating_2 = mysqli_real_escape_string($db, $data["rating_2"]);
$Rating_3 = mysqli_real_escape_string($db, $data["rating_3"]);
$Rating_4 = mysqli_real_escape_string($db, $data["rating_4"]);
$Topic = mysqli_real_escape_string($db, $data["topic"]);
$Comment = mysqli_real_escape_string($db, $data["comment"]);


$insert = "INSERT INTO `Hall Rate`(`UserID`, `HallID`, `Rating_1`, `Rating_2`, `Rating_3`, `Rating_4`, `Topic`, `Comment`) VALUES ($UserID, $HallID, $Rating_1, $Rating_2, $Rating_3, $Rating_4, $Topic, $Comment)";

?>
