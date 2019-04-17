<?php

require_once("db_config.php");
session_start();

$id = mysqli_real_escape_string($db, $_POST['UserID']);
$keyword = mysqli_real_escape_string($db, $_POST['keyword']);
$keyword_check_query = "SELECT * FROM `User_search_hist` WHERE keyword = '$keyword' AND UserID = '$id'";
$result = mysqli_query($db, $keyword_check_query);
$update = mysqli_fetch_assoc($result);

if ($update) { // if keyword exists
	$json = array(
	"state"=>"exists",
	);
		}
		else
    {
      $query = "INSERT INTO `User_search_hist` (UserID, keyword) VALUES ('$id', '$keyword')";
			$result = mysqli_query($db, $query);
      $json = array(
			"state"=>"success",
			);
		}

    echo json_encode($json);
?>
