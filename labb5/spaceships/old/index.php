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

<body>
	<?php if(!isset($_GET["view"])): ?>
		<div id="wrap">
			<h1>Spaceships</h1>
			<div id="img-wrap">
				<a href="?view=battlestar"><img src="./img/spaceships_thumbs/battlestar_thumb.jpg" alt="battlestar" title="battlestar"></a>
				<a href="?view=enterprise"><img src="./img/spaceships_thumbs/enterprise_thumb.jpg" alt="enterprise" title="enterprise"></a>
				<a href="?view=integrity"><img src="./img/spaceships_thumbs/integrity_thumb.jpg" alt="integrity" title="integrity"></a>
				<a href="?view=millenium"><img src="./img/spaceships_thumbs/millenium_thumb.jpg" alt="millenium" title="millenium"></a>
				<a href="?view=planetes"><img src="./img/spaceships_thumbs/planetes_thumb.jpg" alt="planetes" title="planetes"></a>
				<a href="?view=serenity"><img src="./img/spaceships_thumbs/serenity_thumb.jpg" alt="serenity" title="serenity"></a>
			</div>
		</div>
	<?php else:  
		$ship = $_GET["view"];
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
	<div id="viewer"> 
		<a class="arrow" href="?view=<?php echo $left ?>"><img src="./img/leftarrow.png"></a>
		<img src="./img/spaceships/<?php echo $ship ?>.jpg">
		<a class="arrow" href="?view=<?php echo $right ?>"><img src="./img/rightarrow.png"></a>
	</div>
	<?php endif; ?>
</body>
</html>