<?php $js = (!isset($_GET['nojs'])); ?>
<!DOCTYPE html>
<html>
<head>
  <title>Assignment 5 - Drag and Share</title>
  <meta charset="utf-8">
  
  <link rel="stylesheet" href="css/style.css" />
  
  <?php if($js): ?>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
  <script src="js/jquery-ui-1.8.2.custom.min.js"></script>
  <script src="js/main.js"></script>
  <!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
  <?php endif; ?>

</head>
<body>
  
  <a id="js" href="<?php echo ($js)?'?nojs':'.'; ?>">JScript is <?php echo ($js)?'ON':'OFF' ?></a>

  <?php $link = $_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']); ?>
  
  <div id="content">
    <img src="images/cat.jpg" alt="An angry cat" title="An angry cat" />
    <ul id="targets">
      <?php 
	 echo '<li id="twitter"><a title="Share this on Twitter" target="_blank" href="http://twitter.com/home?status=Cats+-+'.$link.'+">Twitter</a></li>';
	 echo '<li id="delicious"><a title="Share this on Delicious" href="http://del.icio.us/save?url='.$link.'&title=Cats">Delicious</a></li>';
	 echo '<li id="facebook"><a title="Share this on Facebook" href="http://www.facebook.com/sharer.php?u=http://'.$link.'&amp;t=A+Cat">Facebook</a></li>';
      ?>
    </ul>
  </div>

</body>
</html>
