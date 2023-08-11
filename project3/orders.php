<?php
    include "db_connection.php";

    //DB connection
    $conn = OpenCon();
    //check
    if(!$conn) {
        echo 'Connection error: ' . mysqli_connect_error();
    }

    $sql = "SELECT * FROM `orders` ORDER BY order_date DESC;";

    $result = mysqli_query($conn, $sql);

    //error handling
    if (!$result) {
        echo "Query error. Result: " . $result . "Error: " . mysqli_error($conn);
    // } elseif (mysqli_num_rows($result) > 0) {
    //     //echo "returned " . mysqli_num_rows($result) . " rows <br>";
    // } else {
    //     echo "0 results";
    }

    mysqli_close($conn);

    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $jsonStr = json_encode($rows);
    $orders = json_decode($jsonStr, true);

    //print_r($orders);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eCommerce Orders Page</title>
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
                <a href="https://jonathank1.sgedu.site/project3/orders.php"><image src="images/orders.png" class="navIcon" id="orderImg"></a>
            </div>
        </div> <!--End Nav-->
    </header>

    <main>
        <h2>Order History<h2>
        <div class="container">
            <?php foreach ($orders as $order) { ?>
            <div class="orders">
                <?php echo ("Order Date: ".$order['order_date']); ?>
                    <div class="overview">
                    <?php echo ("Order ID: ".$order['order_id']." ". 
                                "| Order Total: $".$order['order_total'])."<br>"; ?>
                    <span>Products:</span> <br>
                    </div>
                        <div class="orderItems" style="margin-left:30px; margin-bottom:5px;">
                            <?php if ($order['qty0'] != 0) {echo ("Product: ".$order['name0']." | Quantity: ".$order['qty0']." | Cost: $".$order['total0']."<br>"); }?>
                            <?php if ($order['qty1'] != 0) {echo ("Product: ".$order['name1']." | Quantity: ".$order['qty1']." | Cost: $".$order['total1']."<br>"); }?>
                            <?php if ($order['qty2'] != 0) {echo ("Product: ".$order['name2']." | Quantity: ".$order['qty2']." | Cost: $".$order['total2']."<br>"); }?>
                            <?php if ($order['qty3'] != 0) {echo ("Product: ".$order['name3']." | Quantity: ".$order['qty3']." | Cost: $".$order['total3']."<br>"); }?>
                            <?php if ($order['qty4'] != 0) {echo ("Product: ".$order['name4']." | Quantity: ".$order['qty4']." | Cost: $".$order['total4']."<br>"); }?>
                        </div>
                    <?php } ?>  <!--End orderItems-->
            </div> <!--End Orders-->
        </div> <!--End Container-->             
    </main>

    <footer>
        <p class="footerText">&copy 2023 All Rights Reserved.</p>
    </footer>
</body>
</html>


