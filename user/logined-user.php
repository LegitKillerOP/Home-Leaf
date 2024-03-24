<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}

// Include config file
require_once "../config.php";

// Fetch avatar image from the database
$sql = "SELECT avatar FROM users WHERE id = ?";
if ($stmt = mysqli_prepare($link, $sql)) {
    mysqli_stmt_bind_param($stmt, "i", $_SESSION["id"]);
    if (mysqli_stmt_execute($stmt)) {
        mysqli_stmt_store_result($stmt);
        if (mysqli_stmt_num_rows($stmt) == 1) {
            mysqli_stmt_bind_result($stmt, $avatar_data);
            if (mysqli_stmt_fetch($stmt)) {
                // Output the avatar image data
                $avatar_image = $avatar_data;
            }
        }
    }
    mysqli_stmt_close($stmt);
}
mysqli_close($link);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Profile - Home Leaf</title>
    <link rel="stylesheet" href="user.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="icon" href="../images/Logo.png" type="image/x-icon">
</head>
<body>

    <div class="scroll-up-btn show">
        <i class='bx bx-chevron-up'></i>
    </div>

    <nav class="navbar">
        <div class="max-width">
            <div class="left">
                <div class="logo">
                    <a href="../index.php"><img src="../images/Logo.png" alt="Logo" draggable="false"></a>
                </div>
            </div>
            <div class="searchbox"> 
                <i class='bx bx-search' ></i>      
                <input placeholder="Search for groceries" class="desktop-searchBar" value=""
                data-reactid="904">
            </div>
            <div class="right">
                <div class="cart">
                    <a href="../cart/cart.html"><i class='bx bx-cart'></i></a>
                </div>
                <div class="user">
                    <a href="../user/user.html"><i class='bx bx-user-circle'></i></a>
                </div>
            </div>
        </div>
    </nav>

    <section class="profile">
        <div class="container">
            <div class="left">
                <div class="pfp">
                    <img src="<?php echo 'data:image/jpeg;base64,' . base64_encode($avatar_image); ?>" alt="" id="avatar-img" draggable=false>
                    <div class="details">
                        <div class="heading">
                            <h1>Details</h1>
                        </div>
                        <div class="content">
                            <div class="name">
                                <p>Name</p>   
                                <h3><?php echo htmlspecialchars($_SESSION["username"]); ?></h3>
                            </div>
                            <div class="email">
                                <p>Email</p>
                                <h4><?php echo htmlspecialchars($_SESSION["email"]); ?></h4>
                            </div>
                            <div class="phone">
                                <p>Phone Number</p>
                                <h4><?php echo htmlspecialchars($_SESSION["mobile_number"]); ?></h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="login-btns">
                    <a href="../logout.php"><button>Sign Out</button></a>
                </div>
            </div>
            <div class="right">
                <div class="heading">
                    <h1>Your Profile</h1>
                    <p>Your profile preferences help us personalise recommendations for you.</p>
                </div>
                <div class="about-you">
                    <a href="" style="color: black;">
                    <div class="card1" id="card1">
                        <div class="card-img">
                            <img src="https://png.pngtree.com/png-vector/20220606/ourmid/pngtree-box-parcel-icon-isometric-vector-png-image_4877724.png" alt="" draggable=false>
                        </div>
                        <div class="content">
                            <h3>Your Order</h3>
                            <p>Track, return or buy things again</p>
                        </div>
                    </div>
                    </a>
                    
                    <a href="../update-user/update-user.php" style="color: black;">
                    <div class="card2" id="card2">
                        <div class="card-img">
                            <img src="https://www.freeiconspng.com/thumbs/lock-icon/lock-icon-11.png" alt="" draggable=false>
                        </div>
                        <div class="content"><h3>Account Settings</h3>
                            <p>Update your account information</p>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
    
    <footer>
        <div class="footer">
            <div class="heading">
                <img src="../images/Logo.png" alt="Logo">
                <h1>Home Leaf</h1>
            </div>
            <div class="container">
                <div class="left">
                    <a href="../index.php">About Us</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms And Conditions</a>
                    <a href="../contact/contact.html">Contact Us</a>
                    <a href="../faqs/FAQ.html">FAQs</a>
                </div>
                <div class="right">
                    <a href="https://www.instagram.com/home._.leaf/" target="_blank"><i class="bx bxl-instagram"></i> Instagram</a>
                    <a href="#"><i class="bx bxl-whatsapp"></i> WhatsApp</a>
                </div>
            </div>
            <div class="copyright">
                <p>© 2024 Home Leaf - All rights reserved</p>
            </div>
        </div>
    </footer>

</body>
</html>
<script src="user.js"></script>
