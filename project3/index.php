<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title style="top:5px">eCommerce Products Page</title>
    <script src='https://code.jquery.com/jquery-3.5.1.js'>
    </script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
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

    <header>
        <div class="nav">
            <a href="https://jonathank1.sgedu.site/project3/index.php"><image src="images/logo.png" class="navIcon" id="logo"></a>
            <p class="headerText">eCommerce Site</p>
            <div id="cart" class="navIcon">
                <a href="https://jonathank1.sgedu.site/project3/cart.php"><image src="images/cart.png" class="navIcon" id="cartImg"></a>
                <div class="nItems" id="nItems">0</div>
            </div>
            <div id="orders" class="navIcon">
                <a href="https://jonathank1.sgedu.site/project3/orders.php"><image src="images/orders.png" class="navIcon" id="orderImg"></a>
            </div>
        </div> <!--End Nav-->
    </header>

    <main>
        <h2>Products Page | Shoes<h2>
            <!--Populate Product Page-->
            <div class="container">
                <?php foreach($shoes as $shoe) { ?>
                    <div class="tile">
                        <img class="photo" src="<?php echo $shoe["imgPath"]; ?>" alt="product_image">
                        <div class="info">
                            <span class="name"><?php echo $shoe["name"];?></span>
                            <span class="price"><?php echo $shoe["price"];?></span>
                        </div> <!--End Info-->
                        <div class="buttons">
                            <button class="moreInfo" id="" data-id="<?php echo $shoe["id"];?>">More Info</button>
                            <button class="addCart" data-id="<?php echo $shoe["id"];?>">Add to Cart</button>
                            <p class="desc" style="display:none" id="<?php echo $shoe["id"];?>"><?php echo $shoe["description"];?></p>
                        </div> <!--End Buttons-->
                    </div> <!--End Tile-->
                <?php } ?>
            </div> <!--End Container-->
    </main>
    <footer>
        <p class="footerText">&copy 2023 All Rights Reserved.</p>
    </footer>
    <script>
        //Event Listener - More Info
        var moreId = document.getElementsByClassName("moreInfo");
        var descId = document.getElementsByClassName("desc");
        for (var i = 0; i < moreId.length; i++) {
            moreId[i].addEventListener("click", function(event) {
                var target = event.target;
                var id = target.getAttribute("data-id");
                var toggle = document.getElementById(id).style.display = "block";
            })
        }

        //Event Listener - Add to Cart
        var cartId = document.getElementsByClassName("addCart");
        for (var i = 0; i < cartId.length; i++) {
            cartId[i].addEventListener("click", function(event) {
                var target = event.target;
                var id = target.getAttribute("data-id");

                var xml = new XMLHttpRequest();
                xml.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        alert(this.responseText);
                    }
                }
                xml.open("GET", "db_connection.php?id=" + id, true);
                xml.send();
             })
         }
        
            
    </script>
</body>
</html>


