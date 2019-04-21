<?php

require_once("../db_config.php");
session_start();

  $user_id = $_POST['userID'];
  $hist_query = "SELECT `keyword` FROM `User_search_hist` WHERE `UserID` = $user_id";
  $hist_result = mysqli_query($db, $hist_query);
  $count = mysqli_num_rows($hist_result);

  $json = array();
  $i = 0;
  
  if($count == 0)
  {
    $check_query = "SELECT * FROM `Hall Rate` ORDER BY rand() UNION SELECT * FROM `Restaurant Rate` ORDER BY rand() UNION SELECT * FROM `Course Rate` ORDER BY rand()";
    $result = mysqli_query($db, $check_query);
  
  while($row=mysqli_fetch_array($result))
 		{
      $id = (int)$row['UserID'];
      $user_check_query = "SELECT Alias FROM User WHERE UserID=$id LIMIT 1";
      $new_result = mysqli_query($db, $user_check_query);
      $user = mysqli_fetch_assoc($new_result);
      
 			$json[$i] = array(
        'id'=>$row['ID'],
        'nickname'=>$user["Alias"],
        'Topic' =>$row['Topic'],
        'rating_1' =>$row['Rating_1'],
        'rating_2' =>$row['Rating_2'],
        'rating_3' =>$row['Rating_3'],
        'rating_4' =>$row['Rating_4'],
        'comment'=>$row['Comment'],
        'date' => $row['Date']
      );
             $i = $i + 1;
 		}
  }

  else
  {
   $search_hist = mysqli_fetch_array($hist_result);
    
  $check_query = "SELECT * FROM `Hall Rate` ORDER BY '$search_hist' DESC UNION SELECT * FROM `Restaurant Rate` ORDER BY "$search_hist" DESC UNION SELECT * FROM `Course Rate` ORDER BY '$search_hist' DESC";
  $result = mysqli_query($db, $check_query);
  
  while($row=mysqli_fetch_array($result))
 		{
      $id = (int)$row['UserID'];
      $user_check_query = "SELECT Alias FROM User WHERE UserID=$id LIMIT 1";
      $new_result = mysqli_query($db, $user_check_query);
      $user = mysqli_fetch_assoc($new_result);
      
 			$json[$i] = array(
        'id'=>$row['ID'],
        'nickname'=>$user["Alias"],
        'Topic' =>$row['Topic'],
        'rating_1' =>$row['Rating_1'],
        'rating_2' =>$row['Rating_2'],
        'rating_3' =>$row['Rating_3'],
        'rating_4' =>$row['Rating_4'],
        'comment'=>$row['Comment'],
        'date' => $row['Date']
      );
             $i = $i + 1;
 		}
  }
    
    
 		echo json_encode($json);
?>
