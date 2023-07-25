<!doctype html>
<html>
<head>
    <title>Unit 4 PS4 SESSION</title>
    <meta charset="utf-8">
</head>

<body>
    <?php 
        $n = $_GET["num"];
        
        function fibonacci($n) {
            $seq = array();
            if ($n == 0) {
                return $seq;
            } else if ($n == 1) {
                $seq[] = 0; 
            } else if ($n == 2) {
                array_push($seq, 0, 1);
            } else {
                array_push($seq, 0, 1);
                for ($i = 2; $i < $n; $i++) {
                    $f = (($seq[$i - 2]) + ($seq[$i - 1]));
                    $seq[] = $f;
                }
            }

            return $seq;
        }

        $seq = json_encode(fibonacci($n));

        //JSON response string initialization
        $res = array(
            'length'=>$n,
            'sequence'=>$seq
        );
        //echo encoded/'stringified' response 
        echo json_encode($res);
    ?>
	
</body>
</html>


