<!doctype html>
<html>
<head>
    <title>Unit 4 PS3 Page 2</title>
    <meta charset="utf-8">
</head>

<body>
    <?php 
        session_start();
        include_once("util.php");
        
        $hrs = listHours($_SESSION['hours']); 
    ?>
	
</body>
</html>


