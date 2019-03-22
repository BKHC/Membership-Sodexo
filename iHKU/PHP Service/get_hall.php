<?php
	
	require_once("db_config.php");
	
		
		$query = "SELECT name FROM Hall";
		
		$result = mysqli_query($db, $query);
		
		$Hall_1_query_1 = "Select AVG(Rating_1) FROM 'Hall Rate' WHERE HallID = 1";
		
		$Hall_1_result_1 = mysqli_query($db, $Hall_1_query_1);

		$Hall_1_query_2 = "Select AVG(Rating_2) FROM 'Hall Rate' WHERE HallID = 1";
		
		$Hall_1_result_2 = mysqli_query($db, $Hall_1_query_2);

		$Hall_1_query_3 = "Select AVG(Rating_3) FROM 'Hall Rate' WHERE HallID = 1";
		
		$Hall_1_result_3 = mysqli_query($db, $Hall_1_query_3);

		$Hall_1_query_4 = "Select AVG(Rating_4) FROM 'Hall Rate' WHERE HallID = 1";
		
		$Hall_1_result_4 = mysqli_query($db, $Hall_1_query_4);

		$Hall_2_query_1 = "Select AVG(Rating_1) FROM 'Hall Rate' WHERE HallID = 2";
		
		$Hall_2_result_1 = mysqli_query($db, $Hall_2_query_1);

		$Hall_2_query_2 = "Select AVG(Rating_2) FROM 'Hall Rate' WHERE HallID = 2";
		
		$Hall_2_result_2 = mysqli_query($db, $Hall_2_query_2);

		$Hall_2_query_3 = "Select AVG(Rating_3) FROM 'Hall Rate' WHERE HallID = 2";
		
		$Hall_2_result_3 = mysqli_query($db, $Hall_2_query_3);

		$Hall_2_query_4 = "Select AVG(Rating_4) FROM 'Hall Rate' WHERE HallID = 2";
		
		$Hall_2_result_4 = mysqli_query($db, $Hall_2_query_4);
		
		$json = array();

		$row = mysqli_fetch_array($result);
			
		$json[]=array($row, $Hall_1_result_1, $Hall_1_result_2, $Hall_1_result_3, $Hall_1_result_4, $Hall_2_result_1, $Hall_2_result_2, $Hall_2_result_3, $Hall_2_result_4);
		
		echo json_encode($json);


?>
