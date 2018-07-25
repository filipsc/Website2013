<?php $js = (!isset($_GET['nojs'])); ?>
<!DOCTYPE html>
<html>
<head>
  <title>Horizontal multi-level drop-down menu | Website Construction | Summer 2010</title>
  <meta charset="utf-8" />

  <link rel="stylesheet" href="./css/style.css" />

  <?php if($js): ?>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script src="js/main.js"></script>
  <!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
  <?php endif; ?>

  <!-- for the font -->
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Reenie+Beanie" />
</head>
<body>

  <ul>
    <li><a href="<?php echo ($js)?'?nojs':$_SERVER['PHP_SELF']; ?>">JScript is <?php echo ($js)?'ON':'OFF' ?></a></li>
    <li><a href="http://www.w3schools.com/html/">HTML</a></li>
    <li><a href="http://www.w3schools.com/css/">CSS</a>
      <ul>
        <li><a href="http://www.w3schools.com/css/css_boxmodel.asp">Box Model</a></li>
        <li><a href="http://www.w3schools.com/css/css_pseudo_classes.asp">Pseudo-classes</a></li>
      </ul>
    </li>
    <li><a href="http://www.w3schools.com/js/">JavaScript</a>
      <ul>
        <li><a href="http://www.jquery.com">jQuery</a>
          <ul>
            <li><a href="http://docs.jquery.com/">Documentation</a></li>
            <li><a href="http://plugins.jquery.com/">Plugins</a></li>
            <li><a href="http://docs.jquery.com/Tutorials">Tutorials</a></li>
          </ul>
        </li>
        <li><a href="http://mootools.net/">MooTools</a></li>
      </ul>
    </li>
  </ul>

</body>
</html>
