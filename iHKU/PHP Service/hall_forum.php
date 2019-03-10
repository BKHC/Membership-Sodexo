<?php

require_once("db_config.php");
session_start();


  $hall = mysqli_real_escape_string($db, $_GET['hall_id']);
  $check_query = "SELECT * FROM 'Hall Rate' WHERE HallID='$hall'";
  $result = mysqli_query($db, $check_query);
$json = array();

 while($row=mysqli_fetch_array($result))
		{
			$json[]=array('id'=>$row['id'], 'UserID'=>$row['UserID'], 'HallID'=>$row['HallID'], 'Rating_1'=>$row['Rating_1'], 'Rating_2'=>$row['Rating_2'], 'Rating_13'=>$row['Rating_3'],'Rating_14'=>$row['Rating_4'], 'Topic'=>$row['Topic'],'Comment'=>$row['Comment']);
		}
		
		echo json_encode($json);

else
{
  echo json_encode("msg"=>"There's no related response on this hall!");
}
?>
