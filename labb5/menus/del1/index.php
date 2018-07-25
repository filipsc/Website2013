<!DOCTYPE html>
<html>
<head>
  <title>Assignment 5 - Menus</title>
  <meta charset="utf-8">

  <link rel="stylesheet" href="css/style.css">

  <?php if(!isset($_GET['nojs'])): ?>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="js/modernizr-1.5.min.js"></script>
  <script src="js/main.js"></script>
  <?php endif; ?>

</head>
<body>

  <div id="stack">
    <img src="images/stack.png" alt="stack" />
    <ul class="css">
      <li id="acrobat"><a href="."><span>Acrobat</span></a></li>
      <li id="aperture"><a href="."><span>Aperture</span></a></li>
      <li id="coda"><a href="."><span>Coda</span></a></li>
      <li id="finder"><a href="."><span>Finder</span></a></li>			
      <li id="photoshop"><a href="."><span>Photoshop</span></a></li>
      <li id="safari"><a href="."><span>Safari</span></a></li>
    </ul>
  </div><!-- /#stack -->
	
</body>
</html>
