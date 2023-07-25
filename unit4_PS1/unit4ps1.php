<!doctype html>
<html>
<head>
    <title>Unit 4 PS1</title>
    <meta charset="utf-8">
</head>

<body>
    <form>
        <label>
            <input type="text" id="num" name="num" placeholder="Enter a number; press enter to submit" style="width:15rem">
        </label>
    </form>
    
    <?php 
        $n = $_GET["num"];
        if ($n != null) {
            echo ("<br>");
            for ($x = 1; $x <= 12; $x++) {
                echo ("$x x $n = " . $x*$n . "<br>");
            }
        }
    ?>
	
</body>
</html>


