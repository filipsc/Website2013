 <!DOCTYPE html>
<html lang="en">

<head>
 	<meta charset="utf-8">
 	<title>Spaceships</title>
 	<link rel="stylesheet" href="./reset.css" />
  	<link rel="stylesheet" href="./style.css" />
  	
  	<!-- Load jQuery -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	
	<!-- Load your code -->
	<script src="main.js"></script>

    <!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>

<?php 
	if (isset($_GET["view"])) {
		$ship = $_GET["view"];
	}
	else {
		$ship = "enterprise";
	}

	$spaceships = glob('./img/spaceships/*.jpg');
	$spaceships = str_replace("./img/spaceships/", "", $spaceships);
	$spaceships = str_replace(".jpg", "", $spaceships);
	$arr = array();
	$i = 0;
	foreach ($spaceships as $value) {
		$arr[$value] = $i;
		$i++;
	}
	$currentIndex = $arr[$ship];
	if($currentIndex == 0){
		$left = $spaceships[count($spaceships) - 1];
		$right = $spaceships[$currentIndex + 1];
	}elseif($currentIndex == count($spaceships) - 1){
		$left = $spaceships[$currentIndex - 1];
		$right = $spaceships[0];
	}else{
		$left = $spaceships[$currentIndex - 1];
		$right = $spaceships[$currentIndex + 1];
	}
?>

<body>
	<div id="phpviewer"> 
		<a class="arrow" href="space.php?view=<?php echo $left ?>"><img src="./img/leftarrow.png"></a>
		<img src="./img/spaceships/<?php echo $ship ?>.jpg">
		<a class="arrow" href="space.php?view=<?php echo $right ?>"><img src="./img/rightarrow.png"></a>
	</div>
	<a id="exit" href=".">Exit</a>
</body>