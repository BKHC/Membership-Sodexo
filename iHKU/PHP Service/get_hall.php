<?php
	
	require_once("db_config.php");
	
		
		$query = "SELECT name FROM Hall"
		
		$result = mysqli_query($db, $query);
		
		$json = array();

		while($row = mysqli_fetch_array($result))
		{
			$json[]=array('Hall_Name'=>$row['name']);
		}
		
		echo json_encode($json);

?>
