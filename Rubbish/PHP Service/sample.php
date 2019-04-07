<?php
$servername = "35.241.79.107";
$username = "root";
$password = "insfood";
$dbname = "sodexo";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM account";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
// output data of each row
while($row = mysqli_fetch_assoc($result)) {
    echo "username: " . $row["username"]. " - password: " . $row["password"]. "<br>";
}
} else {
echo "0 results";
}

mysqli_close($conn);
?>
