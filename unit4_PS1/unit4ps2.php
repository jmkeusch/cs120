<!doctype html>
<html>
<head>
    <title>Unit 4 PS2</title>
    <meta charset="utf-8">
</head>

<body>
    <?php 
        $hours = array(
            'Monday'=>'8AM-10PM',
            'Tuesday'=>'9AM-10PM',
            'Wednesday'=>'8AM-10PM',
            'Thursday'=>'8AM-10:30PM',
            'Friday'=>'9AM-11PM',
            'Saturday'=>'8AM-11PM',
            'Sunday'=>'10AM-4PM'
        );

        function listHours($arr) {
            echo ("Our hours are: <br/>");
            foreach ($arr as $day=>$hours) {
                echo ("$day: $hours <br/>");
            }
        };

        $list = listHours($hours);
    ?>
	
</body>
</html>


