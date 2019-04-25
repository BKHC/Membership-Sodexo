<?php

require_once("db_config.php");
session_start();

  $user_id = mysqli_real_escape_string($db, $_GET['userID']);
  $hist_query = "SELECT `keyword` FROM `User_search_hist` WHERE `UserID` = $user_id";
  $hist_result = mysqli_query($db, $hist_query);
  $count = mysqli_num_rows($hist_result);

  $json = array();
  $badjson = array();
  $i = 0;
  $b = 0;

  if($count == 0){
    $check_query = "SELECT * FROM `Hall Rate`";
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

    $check_query1 = "SELECT * FROM `Restaurant Rate`";
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

    $check_query2 = "SELECT * FROM `Course Rate`";
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

    shuffle($json);
  }

  else
  {
    $keyquery = "(";
    $bts = 1;

   while ($row = mysqli_fetch_array($hist_result)){
     $keyword = $row['keyword'];
     if ($bts == 1){
      $keyquery .= "UPPER(Topic) LIKE UPPER('%$keyword%') OR UPPER(Comment) LIKE UPPER('%$keyword%') ";
      $bts = 0;
    } else
      $keyquery .= "OR UPPER(Topic) LIKE UPPER('%$keyword%') OR UPPER(Comment) LIKE UPPER('%$keyword%') ";
   }
   $keyquery .= ")";

   $goodquery = "SELECT * FROM `Hall Rate` WHERE $keyquery";
   $goodresult = mysqli_query($db, $goodquery);

  while($row=mysqli_fetch_array($goodresult))
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

    $badquery = "SELECT * FROM `Hall Rate` WHERE !$keyquery";
    $badresult = mysqli_query($db, $badquery);
    while($row=mysqli_fetch_array($badresult))
   		{
        $id = (int)$row['UserID'];
        $user_check_query = "SELECT Alias FROM User WHERE UserID=$id LIMIT 1";
        $new_result = mysqli_query($db, $user_check_query);
        $user = mysqli_fetch_assoc($new_result);

   			$badjson[$b] = array(
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
               $b = $b + 1;
   		}

      $goodquery = "SELECT * FROM `Restaurant Rate` WHERE $keyquery";
      $goodresult = mysqli_query($db, $goodquery);

     while($row=mysqli_fetch_array($goodresult))
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

       $badquery = "SELECT * FROM `Restaurant Rate` WHERE !$keyquery";
       $badresult = mysqli_query($db, $badquery);
       while($row=mysqli_fetch_array($badresult))
      		{
           $id = (int)$row['UserID'];
           $user_check_query = "SELECT Alias FROM User WHERE UserID=$id LIMIT 1";
           $new_result = mysqli_query($db, $user_check_query);
           $user = mysqli_fetch_assoc($new_result);

      			$badjson[$b] = array(
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
                  $b = $b + 1;
      		}

          $goodquery = "SELECT * FROM `Course Rate` WHERE $keyquery";
          $goodresult = mysqli_query($db, $goodquery);

         while($row=mysqli_fetch_array($goodresult))
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

           $badquery = "SELECT * FROM `Course Rate` WHERE !$keyquery";
           $badresult = mysqli_query($db, $badquery);
           while($row=mysqli_fetch_array($badresult))
          		{
               $id = (int)$row['UserID'];
               $user_check_query = "SELECT Alias FROM User WHERE UserID=$id LIMIT 1";
               $new_result = mysqli_query($db, $user_check_query);
               $user = mysqli_fetch_assoc($new_result);

          			$badjson[$b] = array(
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
                      $b = $b + 1;
          		}




      shuffle($json);
      shuffle($badjson);
      $json = array_merge($json, $badjson);
  }


 		echo json_encode($json);
?>
