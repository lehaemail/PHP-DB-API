<?php 
// heder("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1
// header("Pragma: no-cache"); // HTTP 1.0
// header("Expires: 0"); // Proxies

$limit = $_GET["limit"]; // Get limit for query
$offset = $_GET["offset"]; // Get offset for query
$sortBy = $_GET["sortBy"]; // Sort by this particular colomn
$order = $_GET["order"]; // Ascending or descending order for sort

// $limit = 10; // For debaging only
// $offset = 0; // For debaging only

//open connection to mysql db
$connection = mysqli_connect("localhost","root", "","aaa") or die("Error " . mysqli_error($connection));

////////////////////////////
//--Process cat table--//
////////////////////////////
    //ORDER BY name ASC
//fetch table rows from mysql db 
$catSql = "SELECT * FROM pet where breed='exotics' ORDER BY " . $sortBy . " " . $order . " LIMIT ".$limit." OFFSET ".$offset;
$catResult = mysqli_query($connection, $catSql) or die("Error in Selecting " . mysqli_error($connection));

//create an array
$catArray = array();
while($row = mysqli_fetch_assoc($catResult))
{
    $catArray[] = $row;
}

// return the result of the query
echo json_encode($catArray);

//write to json file (optional)
//$fp = fopen('cat.json', 'w');
//fwrite($fp, json_encode($catArray));
//fclose($fp);


?>
