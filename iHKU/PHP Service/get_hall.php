<?php
	
	require_once("db_config.php");
	
		
		$query = "SELECT name FROM Hall";
		
		$result = mysqli_query($db, $query);

		$json = array();


	for($x = 1; $x <= 16; $x++)
	{
		
		$temp_query_1 = "SELECT AVG(`Rating_1`) FROM `Hall Rate` WHERE `HallID`= $x";
		
		$temp_result_1 = mysqli_query($db, $Hall_1_query_1);

		$temp_query_2 = "SELECT AVG(`Rating_2`) FROM `Hall Rate` WHERE `HallID`= $x";
		
		$temp_result_2 = mysqli_query($db, $Hall_1_query_2);

		$temp_query_3 = "SELECT AVG(`Rating_3`) FROM `Hall Rate` WHERE `HallID`= $x";
		
		$temp_result_3 = mysqli_query($db, $Hall_1_query_3);

		$temp_query_4 = "SELECT AVG(`Rating_4`) FROM `Hall Rate` WHERE `HallID`= $x";
		
		$temp_result_4 = mysqli_query($db, $Hall_1_query_4);
		
		$json[$x]=array("ratiing_1"=>$temp_result_1, "rating_2"=>$temp_result_2, "rating_3"=>$temp_result_3, "rating_4"=>$temp_result_4);
		
	}

		echo json_encode($json);


?>
