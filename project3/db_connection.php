<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

function OpenCon () {
    $dbhost = 'jonathank1.sgedu.site:3306'; 
    $dbuser = 'upqbzqdqcl4qj'; #connection user
    $dbpass = '#$1kgikjf#r+';
    $db     = 'dbods4dodkpapn'; #db ecom

    //$conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die ("Connection failed: $s\n". $conn -> error);

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);

    if($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    } 
    // else {
    //     echo "Connected to database " . $db . " successfully ";
    // }

    return $conn;
}

function CloseCon($conn) {
    mysqli_close($conn);
}

session_start();
$_SESSION['cart'] = array();
$cart = $_SESSION['cart'];

if (isset($_GET["id"])) {
    $prodID = $_GET["id"];
    //echo "Hello from the server! I have a prodID of $prodID";
    if (count($cart) >= 5) {
        echo "Your cart is full at 5 unique items! Click the cart icon to access and manage your cart.";
        return;
    } else if (in_array($prodID, $cart)) {
        //Increment qty
        $cart[$prodID] += 1;
    } else {
        //add id=>qty to $cart
        $cart[$prodID] = 1;
    }
}   
?>