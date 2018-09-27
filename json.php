<?php
    //open connection to mysql db
    $connection = mysqli_connect("localhost","root", "","aaa") or die("Error " . mysqli_error($connection));
    
    ////////////////////////////
    //--Process owner table--//
    ////////////////////////////
    
    //fetch table rows from mysql db 
    $ownerSql = "select * from owner";
    $ownerResult = mysqli_query($connection, $ownerSql) or die("Error in Selecting " . mysqli_error($connection));
    
    //create an array
    $ownerArray = array();
    while($row = mysqli_fetch_assoc($ownerResult))
    {
        $ownerArray[] = $row;
    }
    //echo json_encode($emparray);
    
    ////////////////////////////
    //--Process cat table--//
    ////////////////////////////
    
    //fetch table rows from mysql db 
    $catSql = "select * from cat";
    $catResult = mysqli_query($connection, $catSql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $catArray = array();
    while($row = mysqli_fetch_assoc($catResult))
    {
        $catArray[] = $row;
    }
    
    ////////////////////////////
    //--Process dog table--//
    ////////////////////////////
    
    //fetch table rows from mysql db 
    $dogSql = "select * from dog";
    $dogResult = mysqli_query($connection, $dogSql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $dogArray = array();
    while($row = mysqli_fetch_assoc($dogResult))
    {
        $dogArray[] = $row;
    }
    
    
    ////////////////////////////
    //--Process exotic table--//
    ////////////////////////////
    
    //fetch table rows from mysql db 
    $exoticSql = "select * from exotic";
    $exoticResult = mysqli_query($connection, $exoticSql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $exoticArray = array();
    while($row = mysqli_fetch_assoc($exoticResult))
    {
        $exoticArray[] = $row;
    }
    
    ////////////////////////////////
    //--Process owner_dog table--//
    ////////////////////////////////
    
    //fetch table rows from mysql db 
    $owner_dogSql = "select * from owner_dog";
    $owner_dogResult = mysqli_query($connection, $owner_dogSql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $owner_dogArray = array();
    while($row = mysqli_fetch_assoc($owner_dogResult))
    {
        $owner_dogArray[] = $row;
    }
    
    ////////////////////////////////
    //--Process owner_cat table--//
    ////////////////////////////////
    
    //fetch table rows from mysql db 
    $owner_catSql = "select * from owner_cat";
    $owner_catResult = mysqli_query($connection, $owner_catSql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $owner_catArray = array();
    while($row = mysqli_fetch_assoc($owner_catResult))
    {
        $owner_catArray[] = $row;
    }
    
    //////////////////////////////////
    //--Process owner_exotic table--//
    //////////////////////////////////
    
    //fetch table rows from mysql db 
    $owner_exoticSql = "select * from owner_exotic";
    $owner_exoticResult = mysqli_query($connection, $owner_exoticSql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $owner_exoticArray = array();
    while($row = mysqli_fetch_assoc($owner_exoticResult))
    {
        $owner_exoticArray[] = $row;
    }
    
    //debag
    //echo json_encode($owner_exoticArray);
    
    //////////////////////////////////////
    //--Create an array of all tables--//
    //////////////////////////////////////
         
    $data['owner'] = $ownerArray;
    $data['cat'] = $catArray;
    $data['dog'] = $dogArray;
    $data['exotic'] = $exoticArray;
    $data['owner_cat'] = $owner_catArray;
    $data['owner_dog'] = $owner_dogArray;
    $data['owner_exotic'] = $owner_exoticArray;
    
    //debag
    //echo json_encode($data);
    
    
    //write to json file
    $fp = fopen('db.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

    //close the db connection
    mysqli_close($connection);
?>