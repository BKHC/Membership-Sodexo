<?php

require_once("db_config.php");
session_start();


  $hall = mysqli_real_escape_string($db, $_GET['hall_id']);
  $check_query = "SELECT * FROM `Hall Rate` WHERE `HallID`= $hall";
  $result = mysqli_query($db, $check_query);
  $json = array();
  $i = 0;

  while($row=mysqli_fetch_array($result))
 		{
 			$json[$i]=array(
        'id'=>$row['ID'],
        'User_ID'=>$row['UserID'],
        'HallID'=>$row['HallID'],
        'rating_1'=>$row['Rating_1'],
        'rating_2'=>$row['Rating_2'],
        'rating_3'=>$row['Rating_3'],
        'rating_4'=>$row['Rating_4'],
        'topic' => $row['Topic'],
        'date' => $row['Date']
      );
       $i = $i + 1;
 		}

 		echo json_encode($json);
?>
