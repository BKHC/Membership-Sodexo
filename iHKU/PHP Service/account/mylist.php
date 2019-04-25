<?php

require_once("db_config.php");
session_start();

  $id = mysqli_real_escape_string($db, $_GET['userID']);
  $json = array();
  $i = 0;

  $check_query = "SELECT * FROM `Hall Rate` WHERE UserID=$id DESC";
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
        'date' => $row['Date'],
        'image_num' => $row['Image_num'],
        'category' => '1',
      );
             $i = $i + 1;
 		}

    $check_query1 = "SELECT * FROM `Restaurant Rate` WHERE UserID=$id";
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
        'date' => $row['Date'],
        'image_num' => $row['Image_num'],
        'category' => '0',
      );
             $i = $i + 1;
 		}

    $check_query2 = "SELECT * FROM `Course Rate` WHERE UserID=$id";
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
        'date' => $row['Date'],
        'image_num' => $row['Image_num'],
        'category' => '2',
      );
             $i = $i + 1;
 		}

      // sort array with given user-defined function
      usort($json, function($a, $b) {
  $ad = new DateTime($a['date']);
  $bd = new DateTime($b['date']);

  if ($ad == $bd) {
    return 0;
  }

  return $ad < $bd ? 1 : -1;
});

 		echo json_encode($json);
?>
