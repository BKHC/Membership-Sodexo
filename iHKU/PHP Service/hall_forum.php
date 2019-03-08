<?php

require_once("db_config.php");
session_start();


  $hall = mysqli_real_escape_string($db, $_GET['hall_id']);
  $check_query = "SELECT * FROM Hall Rate WHERE HallID='$hall'";
  $result = mysqli_query($db, $user_check_query);
  $output = mysqli_fetch_assoc($result);

  if ($output) {
      echo json_encode($output);
    }

else
{
  echo json_encode("msg"=>"There's no related response on this hall!")
}
?>
