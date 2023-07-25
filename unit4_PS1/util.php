<!doctype html>
<html>
<head>
    <title>Unit 4 Util</title>
    <meta charset="utf-8">
</head>

<body>
    <?php 
        function listHours($arr) {
            echo ("Our hours are: <br/><br/>");
            foreach ($arr as $day=>$hours) {
                echo ("$day: $hours <br/>");
            }
        };
    ?>
	
</body>
</html>


