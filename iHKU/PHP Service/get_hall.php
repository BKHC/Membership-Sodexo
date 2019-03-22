<?php
	
	require_once("db_config.php");
	
		
		$query = "SELECT name FROM Hall"
		
		$result = mysqli_query($db, $query);
		
		$query_1 = "Select Rating_1 FROM 'Hall_Rate'"
		
		$result_1 = mysqli_query($db, $query_1);

		$query_2 = "Select Rating_2 FROM 'Hall_Rate'"
		
		$result_2 = mysqli_query($db, $query_2);

		$query_3 = "Select Rating_3 FROM 'Hall_Rate'"
		
		$result_3 = mysqli_query($db, $query_3);

		$query_4 = "Select Rating_4 FROM 'Hall_Rate'"
		
		$result_4 = mysqli_query($db, $query_4);
		
		$json = array();

		while($row = mysqli_fetch_array($result))
		{
			$json[]=array('Hall_Name'=>$row['name']);
		}

		$average_1 = array_sum($result_1)/count($result_1)
		$average_2 = array_sum($result_2)/count($result_2)
		$average_3 = array_sum($result_3)/count($result_3)
		$average_4 = array_sum($result_4)/count($result_4)
		
		echo json_encode($json);
		echo json_encode($average_1);
		echo json_encode($average_2);
		echo json_encode($average_3);
		echo json_encode($average_4);

?>
