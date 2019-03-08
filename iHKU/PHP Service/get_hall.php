  <?php
	
require_once("db_config.php");
session_start();
  

  $hall_check_query = "SELECT name FROM Hall";
  $result = mysqli_query($db, $hall_check_query);
  $hall = mysqli_fetch_assoc($result);
  
 
  echo json_encode(array("state"=>"success", "hall"=>$hall));
  
  
}
?>
