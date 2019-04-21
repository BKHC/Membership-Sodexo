<?php

require_once("../db_config.php");
session_start();

  $user_id = $_POST['userID'];
  $hist_query = "SELECT `keyword` FROM `User_search_hist` WHERE `UserID` = $user_id";
  $hist_result = mysqli_query($db, $hist_query);
  $count = mysqli_num_rows($result);
  
  if($count == 0)
  {
    $check_query = "SELECT * FROM `Hall Rate` ORDER BY rand() UNION SELECT * FROM `Restaurant Rate` ORDER BY rand() UNION SELECT * FROM `Course Rate` ORDER BY rand()";
    $result = mysqli_query($db, $check_query)
  }

  else
  {

  $check_query = "SELECT * FROM `Hall Rate` ORDER BY Date DESC UNION SELECT * FROM `Restaurant Rate` ORDER BY Date DESC UNION SELECT * FROM `Course Rate` ORDER BY Date DESC";
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
        'comment'=>$row['Comment'],
        'date' => $row['Date'],
        'like_num' => $row['Like_num'],
        'dislike_num' => $row['Dislike_num']
      );
             $i = $i + 1;
 		}
  }
    
    
 		echo json_encode($json);
?>
