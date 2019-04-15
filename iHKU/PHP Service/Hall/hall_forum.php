<?php

require_once("../db_config.php");
session_start();


  $hall = mysqli_real_escape_string($db, $_GET['hall_id']);
  $check_query = "SELECT * FROM `Hall Rate` WHERE `HallID`= $hall";
  $result = mysqli_query($db, $check_query);
  $json = array();
  $i = 0;

  while($row=mysqli_fetch_array($result))
 		{
      $id = (int)$row['UserID'];
      $user_check_query = "SELECT Alias FROM User WHERE UserID=$id LIMIT 1";
      $new_result = mysqli_query($db, $user_check_query);
      $user = mysqli_fetch_assoc($new_result);
 			$json[$i] = array(
        'id'=>$row['ID'],
        'nickname'=>$user["Alias"],
        'HallID'=>$row['HallID'],
        'comment'=>$row['Comment'],
        'rating_1'=>$row['Rating_1'],
        'rating_2'=>$row['Rating_2'],
        'rating_3'=>$row['Rating_3'],
        'rating_4'=>$row['Rating_4'],
        'topic' => $row['Topic'],
        'date' => $row['Date'],
        'image_num' => $row['Image_num'],
        'like_num' => $row['Like_num'],
        'dislike_num' => $row['Dislike_num']
      );
       $i = $i + 1;
 		}

 		echo json_encode($json);
?>
