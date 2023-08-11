<?php
    session_start();
    include "db_connection.php";

    $conn = OpenCon();

    //check
    if(!$conn) {
        echo 'Connection error: ' . mysqli_connect_error();
    }

    //write query for products
    $sql = "SELECT * FROM `products`";

    //exec query, get result
    $result = mysqli_query($conn, $sql);

    //error handling
    if (!$result) {
        echo "Query error. Result: " . $result . "Error: " . mysqli_error($conn);
    } elseif (mysqli_num_rows($result) > 0) {
        //echo "returned " . mysqli_num_rows($result) . " rows <br>";
        // while($row = mysqli_fetch_assoc($result)) {
            //     echo "on new row <br>";
            //     echo "id: " . $row["id"] . " - Name: " . $row["name"]. " price: $" . $row["price"] . " size: " . $row["size"] . "<br>";
            // }

    } else {
        echo "0 results";
    }

    //close connection
    mysqli_close($conn);

    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $jsonStr = json_encode($rows); //$rows array 'stringified'' as JSON string
    $shoes = json_decode($jsonStr, true); //JSON array
    ?> <!--END PHP-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eCommerce Cart Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="nav">
            <a href="https://jonathank1.sgedu.site/project3/index.php"><image src="images/logo.png" class="navIcon" id="logo"></a>
            <p class="headerText">eCommerce Site</p>
            <div id="cart" class="navIcon">
                <a href="https://jonathank1.sgedu.site/project3/cart.php"><image src="images/cart.png" class="navIcon" id="cartImg"></a>
            </div>
            <div id="orders" class="navIcon">
                <a href="https://jonathank1.sgedu.site/project3/orders.php"><image src="images/orders.png" class="navIcon"    id="orderImg"></a>
            </div>
        </div> <!--End Nav-->
    </header>

    <main>
        <h2>My Cart<h2>
        <?php 
        $items = $_SESSION['cart'];  
        ?>
         <div class="container">
            <?php foreach($items as $key=>$qty) { ?>
                <?php foreach($shoes as $shoe) { ?>
                    <?php if ($shoe['id'] == $key) { ?>
                        <?php echo $shoe['name'] ?>
                    <?php } ?>
                <?php } ?>
            <?php } ?>
         </div>
                
    </main>

    <footer>
        <p class="footerText">&copy 2023 All Rights Reserved.</p>
    </footer>
</body>
</html>


