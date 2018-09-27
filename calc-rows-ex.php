<?php
// This script calculates number of rows in a result query
// It accepts tsble neme as a parameter ("table" through GET request)

$connection = mysqli_connect("localhost", "root", "", "aaa");

//$table = $_GET["table"];
$col = $_GET["col"];

$query = "SELECT * FROM pet Where breed = '" . $col. "'";
$result = mysqli_query($connection, $query);
$num_rows = mysqli_num_rows($result);

echo json_encode($num_rows);
?>