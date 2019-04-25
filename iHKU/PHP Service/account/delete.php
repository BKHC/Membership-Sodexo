<?php
require_once("db_config.php");
session_start();
  $id = mysqli_real_escape_string($db, $_GET['commentID']);
  $category = mysqli_real_escape_string($db, $_GET['category']);
  if ($category == "0"){
      $query = "DELETE FROM `Restaurant Rate` WHERE ID=$id";
  } else if ($category == "1") {
    $query = "DELETE FROM `Hall Rate` WHERE ID=$id";
  } else {
    $query = "DELETE FROM `Course Rate` WHERE ID=$id";
  }

  if (mysqli_query($db, $query)) {
    $json = array('state' => 'success');
  } else {
    $json = array('state' => 'fail');
  }
  echo json_encode($json);

?>
