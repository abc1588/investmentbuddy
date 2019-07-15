<?php

$APIkey = "DA851C0JUW4Q00R0";

$ticker;

$callType = "TIME_SERIES_DAILY";

require_once("mysqlconnect.php");
require_once("functions.php");
set_exception_handler("handleError");

$companyQuery = "SELECT * FROM `company`";
$companyResult = mysqli_query($conn, $companyQuery);
if (!$companyResult){
    throw new Exception(mysqli_error($conn));
}

$stockList = [];
while($companyRow=mysqli_fetch_assoc($companyResult)){
    $stockList[] = $companyRow["symbol"];
}

$counter = 0;
for ($stockIndex=0; $stockIndex<count($stockList); $stockIndex++){
    if ($counter>2){
        break;
    }

$callStock = $stockList[$stockIndex];
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.alphavantage.co/query?function=$callType&symbol=$callStock&outputsize=full&apikey=$APIkey");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$output = curl_exec($ch);
curl_close($ch);

$array_output = json_decode($output, true);
$data = $array_output["Time Series (Daily)"];

$historyCounter = 0;
foreach ($data as $key=>$value) {
    if ($historyCounter >= 300){
        break;
    }

    $open = $data[$key]["1. open"];
    $high = $data[$key]["2. high"];
    $low = $data[$key]["3. low"];
    $close = $data[$key]["4. close"];
    $volume = $data[$key]["5. volume"];

    $query = "INSERT INTO `stock_history` (`symbol`, `date`, `open`, `high`, `low`, `close`, `volume`)
               VALUES ('$callStock', '$key', '$open', '$high', '$low', '$close', '$volume')"; 
    
    mysqli_query($conn, $query);
    $historyCounter++;
}

sleep(30);
$counter++;
}

// the $counter variable exists for testing purposes, so the program only takes a little bit of time to run 
?>


