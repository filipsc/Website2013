 <!DOCTYPE html>
<html lang="en">
<head>
 	<meta charset="utf-8">
 	<title>Spaceships</title>
 	<link rel="stylesheet" href="./reset.css" />
  	<link rel="stylesheet" href="./style.css" />
  <?php $nojs = (!isset($_GET['js']));  if(!$nojs): ?>
  	<!-- Load jQuery -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="main.js"></script>
    <!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
  <?php endif; ?>
</head>
<body>
	<div id="wrap">
		<h1>Spaceships</h1>
		<div id="img-wrap">
			<a href="space.php?view=battlestar"><img src="./img/spaceships_thumbs/battlestar_thumb.jpg" alt="battlestar" title="battlestar"></a>
			<a href="space.php?view=enterprise"><img src="./img/spaceships_thumbs/enterprise_thumb.jpg" alt="enterprise" title="enterprise"></a>
			<a href="space.php?view=integrity"><img src="./img/spaceships_thumbs/integrity_thumb.jpg" alt="integrity" title="integrity"></a>
			<a href="space.php?view=millenium"><img src="./img/spaceships_thumbs/millenium_thumb.jpg" alt="millenium" title="millenium"></a>
			<a href="space.php?view=planetes"><img src="./img/spaceships_thumbs/planetes_thumb.jpg" alt="planetes" title="planetes"></a>
			<a href="space.php?view=serenity"><img src="./img/spaceships_thumbs/serenity_thumb.jpg" alt="serenity" title="serenity"></a>
		</div>
	</div>
  <div>
  <a href="<?php echo ($nojs)?'?js':$_SERVER['PHP_SELF']; ?>">JScript is <?php echo ($nojs)?'OFF':'ON' ?></a>
  </div>
</body>
</html>
