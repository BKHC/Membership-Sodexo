<?php

require_once("../db_config.php");
session_start();

  $user_id = mysqli_real_escape_string($db, $_POST['UserID']);
  $hist_query = "SELECT `keyword` FROM `User_search_hist` WHERE `UserID` = $user_id";
  $hist_result = mysqli_query($db, $hist_query);
  $count = mysqli_num_rows($hist_result);

  $json = array();
  $i = 0;
  
  if($count == 0)
  {
    $check_query = "SELECT * FROM `Hall Rate` ORDER BY rand()";
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
    
    $check_query1 = "SELECT * FROM `Restaurant Rate` ORDER BY rand()";
    $result1 = mysqli_query($db, $check_query1);
  
  while($row=mysqli_fetch_array($result1))
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
    
    $check_query2 = "SELECT * FROM `Course Rate` ORDER BY rand()";
    $result2 = mysqli_query($db, $check_query2);
  
  while($row=mysqli_fetch_array($result2))
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
    
    shuffle($json);
  }

  else
  {
   $search_hist = mysqli_fetch_array($hist_result);
    
  $check_query = "SELECT * FROM `Hall Rate` WHERE Topic LIKE '$search_hist'";
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
    
    $check_query1 = "SELECT * FROM `Restaurant Rate` WHERE Topic LIKE '$search_hist'";
  $result1 = mysqli_query($db, $check_query1);
  
  while($row=mysqli_fetch_array($result1))
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
    
    $check_query2 = "SELECT * FROM `Course Rate` WHERE Topic LIKE '$search_hist'";
  $result2 = mysqli_query($db, $check_query2);
  
  while($row=mysqli_fetch_array($result2))
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
    
    $check_query3 = "SELECT * FROM `Hall Rate` ORDER BY rand()";
    $result3 = mysqli_query($db, $check_query3);
  
  while($row=mysqli_fetch_array($result3))
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
    
    $check_query4 = "SELECT * FROM `Restaurant Rate` ORDER BY rand()";
    $result4 = mysqli_query($db, $check_query4);
  
  while($row=mysqli_fetch_array($result4))
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
    
    $check_query5 = "SELECT * FROM `Course Rate` ORDER BY rand()";
    $result5 = mysqli_query($db, $check_query5);
  
  while($row=mysqli_fetch_array($result5))
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
