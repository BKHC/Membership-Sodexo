<?php

require_once("db_config.php");
session_start();


  $id = mysqli_real_escape_string($db, $_GET['id']);
  $check_query = "SELECT * FROM `Hall Rate` WHERE `ID`= $id LIMIT 1";
  $result = mysqli_query($db, $check_query);
  $comment = mysqli_fetch_assoc($result);

  if($comment)
 		{
      $id = (int) $comment['UserID'];
      $user_check_query = "SELECT Alias FROM User WHERE UserID=$id LIMIT 1";
      $result = mysqli_query($db, $user_check_query);
      $user = mysqli_fetch_assoc($result);
 			$json=array(
        'id'=>$comment['ID'],
        'nickname'=>$user["Alias"],
        'HallID'=>$comment['HallID'],
        'rating_1'=>$comment['Rating_1'],
        'rating_2'=>$comment['Rating_2'],
        'rating_3'=>$comment['Rating_3'],
        'rating_4'=>$comment['Rating_4'],
        'topic' => $comment['Topic'],
        'comment' => $comment['Comment'],
        'date' => $comment['Date']
      );
      echo json_encode($json);
 		}

?>
